
import express from 'express';
import authenticate from '../../middlewares/authenticate';

import {Metadata,PathData} from '../../models/metadata';

let router = express.Router();

const insertMetaInDb = (pathId,metaDataList,res) =>{
    const promiseHell =  metaDataList.map(ele =>
        Metadata.forge({pathId,key:ele.key,value:ele.value}).save().then(saved =>{})
    )   
    Promise.all(promiseHell).then(successRes => {
        res.send({success : true});
    }).catch(err => res.status(500).send(err))
}

router.post('/get', authenticate('admin'), (req, res) => {
    const givenPath = req.body;

    PathData.where({path:givenPath.pathName}).fetch().then(pathMetaRes => {
        const pid = pathMetaRes.attributes.pid;
        Metadata.where({pathId:pid}).fetchAll({require:true}).then(metaRes => {
            res.send({pathDetails:pathMetaRes,metaData:metaRes});
        }).catch(err => {
            res.send({metaData:[],pathDetails:pathMetaRes})
        })
    }).catch(err => {
        PathData.forge({path:givenPath.pathName},{hasTimestamp:true}).save()
        .then(createdPath => {
            res.send({metaData : [],pathDetails:createdPath});
        })
    })

    // Metadata.where({ quiz: qid }).fetchAll({ require: true })
    //     .then(data => res.send(data))
    //     .catch(err => err['message'] == 'EmptyResponse' ?
    //         res.send([]) : res.status(500).send(err))

});

router.post('/set', authenticate('admin'), (req, res) => {
    const {metaDataList , pageId } = req.body;
    Metadata.where({pathId:pageId}).destroy()
        .then(destroyed => insertMetaInDb(pageId,metaDataList,res))
        .catch(err => insertMetaInDb(pageId,metaDataList,res))
    })
    // const { qid , metaDataList } = req.body;
    // Metadata.where({quiz:qid}).fetchAll({require:true}).then(
    //     metaRes => {
    //         const midList  = metaRes.models.map(ele => ele.attributes.mid);
    //         midList.map( mid => Metadata.where({mid})
    //                             .destroy()
    //                             .then( delRes => delRes )
    //         );
    //         Promise.all(midList).then(values => {
    //             const promisehell =  metaDataList.map(ele => {
    //                 Metadata.forge({key:ele.key,value:ele.value,quiz:qid})
    //                         .save()
    //                         .then( forgeRes => forgeRes )
    //                         .catch(err => err)
    //             })
    //             Promise.all(promisehell).then(values => {
    //                 res.send({status:"success"})
    //             } 
    //             ).catch(err => {
    //                 res.status(500).send(err);
    //             })
    //         }).catch( err => err
    //             //empty response so we just have to add
    //             ).catch(err => {
    //                 res.status(500).send(err);
    //             })
    //         } ).catch(err => {
    //             const promisehell =  metaDataList.map(ele => {
    //                 Metadata.forge({key:ele.key,value:ele.value,quiz:qid})
    //                         .save()
    //                         .then( forgeRes => forgeRes )
    //             })
    //             Promise.all(promisehell).then(values => {
    //                 res.send({status:"success"})
    //             }).catch(err => res.sendStatus(500).send(err) )
    //         });
        // })

export default router;