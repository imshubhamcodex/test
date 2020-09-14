import {Quiz} from '../../models/quiz';
import { Question, Answer } from '../../models/qna';
import {Category} from '../../models/category';

export function deleteCategory(req,res){
    const {catId} = req.params;

    Quiz.where({'cat_id':catId}).fetchAll({require:true}).then(data => { 
    const qids =  data.map(ele => ele.attributes.qid);
    // const qids = quizData.map(ele => ele.qid);
    const QuestionInAllQuizes =  qids.map(item  => Question.where({quiz:item})
        .fetchAll({require:true})
        .then(qList => qList )
        .catch(err => {} ));
    
    Promise.all(QuestionInAllQuizes).then( values => {
        const questionSet = values.map(ele =>
            ele && ele.models ? ele.models.map(ele => 
                ele.attributes.qsid) : null).filter(qele => qele!==null);
        let qsids = [];
        questionSet.forEach(ele => qsids = [...qsids,...ele]);
        const destroyedAnswers = qsids.map(question =>
                Answer.where({question})
                    .destroy()
                    .then(deleteAns => 
                        Question.where({qsid:question})
                            .destroy()
                            .then(deleteQues => deleteQues )
                            .catch(err => {})
                        ).catch(err => {})
                    .catch(err => {})
            );
        Promise.all(destroyedAnswers).then(destroyedAnswers => {
            const deletedQuiz = qids.map( quiz => 
                Quiz.where({qid:quiz})
                    .destroy()
                    .then(deleteQuiz => deleteQuiz )
                    .catch(err => {}) 
                );
            Promise.all(deletedQuiz).then(
                quizes => 
                    Category.where({id:catId})
                    .destroy()
                    .then(delCaltegory => res.send({    
                        status: "success"
                    }))
                    .catch(err => res.send(err))
                )
            });
        });
    }).catch(err => {
        //emptyresponse 
        Category.where({id:catId}).destroy().then(delCat => res.send({status:"success"}))
    });
}
