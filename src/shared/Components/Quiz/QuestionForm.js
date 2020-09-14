import React,{Component} from 'react';
import Question from './question';
import Options from './options';


class QuestionForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedAnswer : {},
        };
    }

    render(){
        const q = this.props.question;
        const qObj = q.Question.split('?').length == 2 ? 
            q.Question.split('?') : q.Question.split(':').length == 2 ? q.Question.split(':') : 
            q.Question.split(/\nA./).length==2 ? q.Question.split(/\nA./) : q.Question.split('  A.') ;
        const question = qObj[0];
        const options = qObj[1].split(/\n[A-Z]\./).length > 1 ?  qObj[1].split(/\n[A-Z]\./) :  qObj[1].split(/  [A-Z]\./) ; 
        const isMulti = (options[0].indexOf("Choose") > -1) || (options[0].indexOf(" Select") > -1);
        if(options[0].trim().length === 0 || isMulti){
            options.shift();
        }
        return(
            <div>
                <Question
                    testSubmitted={this.props.testSubmitted}
                    isMulti={isMulti}
                    questionIndex={this.props.questionIndex}
                    totalQuestions={this.props.totalQuestions}
                    qsid={q.qsid}
                    question={question}
                    />                                                                    
                { !this.props.testSubmitted && (<Options 
                    qsid={q.qsid}
                    isMulti={isMulti}
                    options={options}
                    selectedAnswer={this.props.selectedAnswer}
                    questionIndex={this.props.questionIndex}
                    handleSelection={this.props.handleSelection}
                />)}
            </div>
        )
    }
}



export default QuestionForm;