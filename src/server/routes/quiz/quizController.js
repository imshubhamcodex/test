import {Quiz} from '../../models/quiz';
import { Question, Answer } from '../../models/qna';


function deleteQuestion(qsid){
   return Question.where({qsid}).destroy();
}

function deleteAnswer(question){
    return Answer.where({question}).destroy() ;
}

export function deleteQuiz(req,res){

    const qid = req.params.quizId;
    const QuestionsInQuiz = Question.where({quiz:qid})
        .fetchAll({require:true})
        .then(qList => {
            const questionIds  = qList.map(ques => ques.attributes.qsid);
            const destroyedAnswers = questionIds.map(question =>
                deleteAnswer(question)
                .then(deleteAns => {
                    deleteQuestion(question).then(delQRes => delQRes).catch(err => console.log(err))
                }).catch(err => console.log(err) )
            )
           Promise.all(destroyedAnswers).then(danswers => {
                Quiz.where({qid}).destroy().then(data => 
                    res.send({status:"success"})
                ).catch(err => res.status(500).send(err))
                }).catch(err => res.status(500).send(err))
        }).catch(err => Quiz.where({qid}).destroy().then(data => 
            res.send({status:"success"})
        ).catch(err => res.status(500).send(err))
)
}
