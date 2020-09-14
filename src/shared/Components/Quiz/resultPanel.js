import React,{Component} from 'react';

class ResultPanel extends Component{

    constructor(props){
        super(props);
    }

    render(){
        const {ansObj,correctAnsCount,totalQuestions} = this.props;
        return(
            <div className="panel panel-default">  
                <div className="panel-heading">
                    <button 
                        className="close" 
                        type="button" 
                        onClick={this.props.hideResultPanel} >&times;</button>
                    <h4>{"Results"}</h4>
                </div>
                <div className="panel-body">
                    <h5> {`You have answered correctly to ${correctAnsCount} question(s) over ${totalQuestions}.`} </h5>
                    {/* <ul className="list-group">
                        <li className="list-group-item">
                            <h5> {"Correct Answers"} : </h5> {ansObj.correct}
                        </li>
                        <li className="list-group-item">
                            <h5> {"InCorrect Answers"} : </h5> {ansObj.incorrect}
                        </li>
                    </ul> */}
                </div>
            </div>
            
        )
    }
}

export default ResultPanel;