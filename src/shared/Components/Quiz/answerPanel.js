import React,{Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle,faCheckCircle } from '@fortawesome/free-solid-svg-icons'

class AnswerPanel extends Component{

    constructor(props){
        super(props);
    }

    render(){      
        const tempAns = this.props.yourAns ?  this.props.yourAns.reduce( (acc,item) => {
            acc += item + ',';return acc},''
            ) : '' ;
        const yourAns = tempAns.substring(0,tempAns.length-1);
        return(
            <div style={{marginTop:"10px"}}>
                <div className="panel panel-default">  
                    <div className="panel-heading">
                        <button 
                            className="close" 
                            type="button" 
                            onClick={this.props.hideAnswerPanel} >&times;</button>
                        <h4>{"Status"} {this.props.isCorrect ? (
                            <FontAwesomeIcon style={{color:"green"}} icon={faCheckCircle}/>)
                           : (<FontAwesomeIcon style={{color:"red"}} icon={faTimesCircle}/>) } </h4>
                    </div>
                    <div className="panel-body">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <h5><b>{"Your Answer"}</b> : {yourAns}</h5> 
                            </li>
                            <li className="list-group-item">
                                <h5><b>{"Correct Answer"}</b> : {this.props.correctAns}</h5> 
                            </li>
                            <li className="list-group-item">
                                <h5><b>{"Explanation"}</b>: </h5>
                                <p>{this.props.explanation}</p> 
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }


}

export default AnswerPanel