import express from 'express';
import multer from 'multer';
import {File} from '../../models/file'; 
import {Quiz} from '../../models/quiz';
import {Category}  from '../../models/category';
import {Question,Answer} from '../../models/qna';
import authenticate from '../../middlewares/authenticate';
import * as fs from 'fs';
import pdf from 'pdf-parse';

import {OlddumpsParser , prepAwayParser} from './fileControllers';

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'./uploads');
    },
    filename : (req,file,cb) => {
        cb(null,`${file.fieldname}-${Date.now()}.pdf`);      
    }
})

const upload = multer({storage:storage});

let routers = express.Router();

routers.post('/upload',authenticate('admin'),upload.single('avatar'),(req,res) => {
    const file = req.file;
    if(!file){
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return res.send(error)
    }    
    const uid = req.currentUser.attributes.uid;
    const filename = file.filename;
    const filepath = file.path;
    const filesize = file.size;
    const filemime = file.mimetype;
    const originalname = file.originalname;
    // inserting the file metadata in db

    File.forge({
        uid,filename,filepath,filemime,filesize,originalname},{ hasTimestamp : true}).save()
        .then(response => {res.send(file)})
        .catch(err => {
        res.status(500).send(err);
    })

} )

routers.post('/submit',authenticate('admin'),(req,res) => {
    const formData = req.body;
    const quizType = formData.quizType;
    const title = formData.title;
    const header = formData.header;
    const pdfName = formData.pdfName;
    const category = formData.category;
    const description = formData.description;
    // const metadata = formData.metaData;
    const getFid =  File.where({'filename':pdfName}).fetch({require:true}).then(
        data => { return  {id : data.id , 
            filepath : data.attributes.filepath,
            originalname : data.attributes.originalname } }
    ).catch(err => res.status(500).send(err) );

    Promise.all([category,getFid]).then(
        data => {
            const cat_id = data[0];
            const fid = data[1].id;
            const filePath = data[1].filepath;
            const originalname = data[1].originalname;
            Quiz.forge({title,header,fid,cat_id,description},{hasTimestamp:true}).save().then(
                (quizresponse) => {
                    const qid = quizresponse.id;
                    // metadata.forEach( ele => Metadata.forge({key:ele.key,value:ele.value,quiz:qid}).save().then(res => console.log(res)) )
                    let databuffer =  fs.readFileSync('./'+filePath);
                    if(quizType === 'Olddumps'){
                        OlddumpsParser(title,header,databuffer,qid,res);
                    }else{
                        prepAwayParser(title,header,databuffer,qid,res);
                    }
                } 
            ).catch(err => res.send(err) );
        }
    ).catch(err => res.status(500).send(err) );

})

export default routers;
