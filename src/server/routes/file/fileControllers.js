import {Question,Answer} from '../../models/qna';
import pdf from 'pdf-parse';


export function OlddumpsParser(title,header,databuffer,qid,res){
    pdf(databuffer).then( (pdfParserObj) => {
        const data = pdfParserObj.text;
        const questionList = data.split('QUESTION NO:');
        const introduction = questionList.shift(); // removes the test introduction;
        const getTestMetaDataArray = introduction.replace(/\n/g,'\t').split('\t');
        let flag = false;
        let testName = '';
        getTestMetaDataArray.every(ele => {
            if (!flag && ele === "") {
              return true;
            } else {
              if (flag && (ele === "" || ele === " ")) {
                return false;
              } else {
                testName += ` ${ele}`;
                flag = true;
                return true;
              }
            }
          });
          testName = testName.trim();
        const questionArray = [];
        const answerArray = [];
        const explainArray = [];
        const filteredQuestionList = questionList.filter( (qna) => {
            const data = qna.replace(/(\r\n|\n|\r\t)/g,'');
            const separatedQ = data.split("Answer:");
            return !((separatedQ[0].indexOf("DRAG DROP") > -1) || 
                (separatedQ[0].indexOf("CORRECT TEXT") > -1) || (separatedQ[0].indexOf('Refer to the image.') > -1)  ) 
        });
        filteredQuestionList.map(  (qandA,index) => {
           const data = qandA
                        .replace(/(\r\n|\n|\r\t)/gm,' ')
                        .replace(/Click and drag/g,'')
                        .replace(/www.actualtests.com/g,'')
                        .replace(/Practice Exam/g,'')
                        .replace(/"Pass Any Exam. Any Time."/g,'')
                        .replace(/See explanation below./,'')
                        .replace( new RegExp(` ${testName} Exam`,'g'),'')
                        .replace(/- [0-9]*[0-9]/g,'') // replacing question Number 
                        .replace(/ +(?= )/g,' ')
                        .replace(/ +^Topic.*$/g,'')
                        .replace(new RegExp(header,"g"),'')
                        .replace(new RegExp(title,"g"),'');
            const separatedQ = data.split("  Answer:");
            const temp = separatedQ[0].replace( new RegExp(` ${testName} Exam`,'g'),'').replace(/ [0-9]*[0-9] /,'');
            questionArray.push(temp);
            const hasRefOrExplanation = separatedQ[1].replace(/\n/g,' ')
            const separateAnsAndExplain = 
                hasRefOrExplanation.indexOf('Explanation:') > -1 ?
                hasRefOrExplanation.split('Explanation:') : hasRefOrExplanation.split('Reference:')
            answerArray.push(separateAnsAndExplain[0]);
            explainArray.push(
                (separateAnsAndExplain[1].indexOf('Topic') > -1) ? '' : separateAnsAndExplain[1]
                );
            })
        const PromiseHell = questionArray.map( (ele,index) => {
            const quesData = {
                "Question" : ele,
                "quiz" : qid,
            }  
            return Question.forge(quesData,{hasTimestamp:true}).save().then(
                (questionResponse) => {
                    const qsid = questionResponse.id;
                    const ansData = {
                        question : qsid,
                        answer : answerArray[index],
                        explanation : explainArray[index]
                    }
                    Answer.forge(ansData).save().catch(
                        err => res.status(500).send(err)
                    );
                }
            ).catch(err => res.status(500).send(err))
         })
        
         Promise.all(PromiseHell).then(
             res.send({success:true})
        ).catch(err => res.send(err) );

    }).catch(err => res.send(err) );
} 


export function prepAwayParser(title,header,databuffer,qid,res){
    pdf(databuffer).then(pdfParserObj => {
        const data = pdfParserObj.text;
        const questionList = data.split(/QUESTION [0-9]*/);
        const introduction = questionList.shift();
        let questionArray = [];
        let answerArray = [];
        let explainArray = [];
        questionList.forEach(qna => { 
            qna.replace( new RegExp('https://vceoreteconvert.com/','g'),'')
            const seperateQ = qna.split('Correct Answer:');
            const question = seperateQ[0];
            const answer = seperateQ[1];
            // remove questions with images
            if(!(question.indexOf('DRAG DROP') > -1 || 
                question.indexOf('Refer to the exhibit') > -1 || question.indexOf('HOTSPOT') > -1) ){
                    questionArray.push(question);
                    const ansNExpl = answer.split('Explanation/Reference:');
                    const explanation = ansNExpl.length > 2 && ansNExpl[1]==='\n' ? ansNExpl[2] : ansNExpl[1];
                    const ansList = ansNExpl[0].split('\n')[0].trim().split('').reduce( 
                        (acc,item) => { acc += item + ','; return acc} , '' ).slice(0,-1);
                    answerArray.push(ansList);
                    explainArray.push(explanation);
                }   
        });
        const PromiseHell = questionArray.map((ele,index) => {
            const quesData = {
                "Question" : ele,
                "quiz" : qid,
            }
            return Question.forge(quesData,{hasTimestamp:true}).save().then(
                (questionResponse) => {
                    const qsid = questionResponse.id;
                    const ansData = {
                        question : qsid,
                        answer : answerArray[index],
                        explanation : explainArray[index]
                    }
                    Answer.forge(ansData).save().catch(
                        err => {
                            console.log(err , 'PPPPPPPPPPP');
                            res.status(500).send(err)
                        });
                }
            ).catch(err => {
                console.log(err);
                res.status(500).send(err)
            })
        })
        Promise.all(PromiseHell).then(
            res.send({success:true})
       ).catch(err => res.status(500).send(err) );
    } ).catch(err => res.status(500).send(err));
}
