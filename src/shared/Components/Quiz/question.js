import React from 'react';

const Question = (props) => {
    return (
        <div 
            className={"panel panel-default ".concat( 
                props.testSubmitted ? 'col-lg-12' : 'col-lg-9 ' )  } 
            style={{height:"65vh"}}>
            <div >
                <div className="panel-heading"> 
                   <h3> { `Question ${props.questionIndex+1}/${props.totalQuestions}` } </h3> 
                   <p> {  props.isMulti ?  '(Select Multiple)' : '' } </p>
                </div>
                <div className="panel-body">
                    {props.question}
                </div>
            </div>
        </div>)
} 

export default Question;
