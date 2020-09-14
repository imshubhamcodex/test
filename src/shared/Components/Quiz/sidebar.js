import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock as farClock } from '@fortawesome/free-regular-svg-icons';


class Sidebar extends Component{
    constructor(props){
        super(props);
        this.state={}
    }

    componentDidMount(){
        const hours = Math.floor(this.props.testTime/60);
        const mins = Math.floor(this.props.testTime - hours*60)
        const secs = 0;
        this.setState({
            secs,
            mins,
            hours,
        });
        const timerInterval = setInterval( () => {
           let newSecs = this.state.secs;
           let newMins = this.state.mins;
           let newHours = this.state.hours; 
           if(this.state.secs === 0){
               if(this.state.mins === 0){
                    if(this.state.hours === 0){
                        clearInterval(timerInterval);
                        this.props.timeUp();
                    }else{
                        newHours = this.state.hours-1;
                        newMins = 59;
                        newSecs = 59;
                    }
               }else{
                   newMins = this.state.mins - 1;
                   newSecs = 59;
               }
           }else{
                newSecs = this.state.secs -1;
           }
           this.setState({secs:newSecs,hours:newHours,mins:newMins})            
        } , 1000 )
    }
    
    render(){
        return(
            <div className="col-lg-2" style={{display:"flex",flexDirection:"column",textAlign:"center"}}>
                { this.props.showTimer && (<div style={{margin:"10px"}}>
                    <FontAwesomeIcon style={{color:"blue"}} 
                        icon={farClock} size="4x" />
                    <p style={{padding:"10px"}}> {`${this.state.hours}:${this.state.mins}:${this.state.secs}`} </p>
                </div>)}
                <div className="panel panel-default">
                    <div className="panel-heading">{"Marked Questions"}</div>
                    <div className="panel-body">
                        { this.props.markedQuestions.length > 0 ? this.props.markedQuestions.map(ele => {
                            return(
                                <button 
                                    key={ele+'marked_Question'}
                                    className={ele == this.props.currentQuestionIndex ? 'btn btn-primary' : 'btn btn-default'  }  
                                    style={{borderRadius:"50%"}}
                                    onClick={ (event) => {this.props.gotoMarked(ele)}}
                                >
                                    {ele+1}
                                </button>
                        )}) : 'No marked Questions Yet' }
                    </div>
                </div>
            </div>
        )
    
    }
}

export default Sidebar;

