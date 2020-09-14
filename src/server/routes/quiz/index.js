import express from 'express';
import { Question, Answer } from '../../models/qna';
import { deleteQuiz } from './quizController';
import authenticate from '../../middlewares/authenticate';

let router = express.Router();

// get limited set of questions for non loged in users

router.post(`/quizid/:quizId`, (req, res) => {
    const { quizId } = req.params;
    const { limit } = req.body;
    const { uid, email } = req.headers;
    let count;
    Question.where({ quiz: quizId }).count().then(response => count = response);
    if (uid === undefined) {
        Question.where({ quiz: quizId })
            .query(qb => qb.limit(10))
            .fetchAll({ require: true }).then(data => {
                res.json({ data, count });
            }
            )
    } else {
        if (limit === undefined) {
            Question.where({ quiz: quizId })
                .fetchAll()
                .then(
                    data => {
                        res.json({ data, count });
                    }
                ).catch(err => { res.send(err) })
        }
        else {
            Question.where({ quiz: quizId })
                .query(qb => qb.limit(limit))
                .fetchAll({ require: true }).then(
                    data => {
                        res.send({ data, count });
                    }
                ).catch(err => res.send(err))
        }
    }
});

router.post('/answers', (req, res) => {

    const { qsidList } = req.body;
    const promiseList = qsidList.map(ele =>
        Answer.where({ question: ele }).fetch()
            // .then(res => { return res} )
            .catch(err => res.send(err))
    )

    Promise.all(promiseList).then(responseList => {
        const answerObj = responseList.map(ele => {
            return {
                qsid: ele.attributes.question,
                answer: ele.attributes.answer,
                explanation: ele.attributes.explanation
            }
        })
        res.send(answerObj)
    }).catch(err => res.send(err))

});


router.get('/delete/:quizId', authenticate('admin'), deleteQuiz);



export default router;
