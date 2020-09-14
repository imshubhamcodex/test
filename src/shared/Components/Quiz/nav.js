import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft,faChevronRight,faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const Nav = (props) => {

    return(
        <div style={{
            display:"flex",
            justifyContent:"space-between",
            padding:"10px",
            margin:"10px 0px"
            }}>
            <button 
                type="button" 
                className={ 
                    props.markedQuestions.indexOf(props.currentQuestionIndex) > -1 ? 
                    "btn btn-success ".concat(props.testTimeOut ||
                        props.testSubmitted ? 'disabled' : '') : 'btn btn-primary '.concat(props.testTimeOut ||
                        props.testSubmitted ? 'disabled' : '')}
                    onClick={ props.testSubmitted ? () => {} : props.handleMark  }
                > 
                { 
                    props.markedQuestions.indexOf(props.currentQuestionIndex) > -1 ? 
                    <div> 
                    Marked  <FontAwesomeIcon icon={faCheckCircle}/> 
                    </div> : "Mark"
                } 
                </button>

            <div>
                <button
                    className={"btn btn-primary " +
                    (props.currentQuestionIndex === 0  ? " disabled" : "")  }  
                    style={{borderRadius:"50%",border:"0px",marginRight:"1.5px"}}
                    onClick={(event) => {  
                        props.currentQuestionIndex > 0 ?
                        props.updateCount(props.currentQuestionIndex -1) : '' } }>
                    <FontAwesomeIcon icon={faChevronLeft}/>
                </button>

                <button
                    className={"btn btn-primary " +
                    (props.currentQuestionIndex - props.totalLength >= -1 ? " disabled" : "")  }  
                    style={{borderRadius:"50%",border:"0px",marginLeft:"1.5px"}}
                    onClick={(event) => {
                        (props.currentQuestionIndex - props.totalLength) < -1 ? 
                        props.updateCount(props.currentQuestionIndex + 1): ''} }>
                    <FontAwesomeIcon icon={faChevronRight}/>
                </button>

            </div>

            <button 
                type="button" 
                className={"btn btn-danger ".concat(props.testTimeOut || props.testSubmitted ? 'disabled' : '')}
                onClick={props.testSubmitted ? ()=>{} : props.handleSubmitModal}>
                Submit Test 
            </button>
    </div>
    )
}

export default Nav;

