import React,{Component} from 'react';
import {stringifyQueryParams} from '../../utlis/utilFunctions';
import { Link } from 'react-router-dom';

class QuizDescription extends Component{
    constructor(props){
        super(props);
        this.state={}
    }

    render(){
        const {description,infoInNextUrl,showDescriptionModal} = this.props;
        return (
               <div className={"modal ".concat(showDescriptionModal ? 'show' : 'fade') }>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick = {this.props.handleModal} >&times;</button>
                            <h4 className="modal-title"> {"Description"} </h4>
                        </div>
                        <div className="modal-body">
                            <div style={{height:"250px",overflow:"auto"}}>
                                {description}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <Link to={`/quiz?` + stringifyQueryParams(infoInNextUrl) }>
                                    <button 
                                        className="btn btn-primary"
                                        onClick={()=>{}}
                                >Start Test</button></Link>
                            </div>
                    </div>
                </div>
            </div>)        
    }
}

export default QuizDescription;