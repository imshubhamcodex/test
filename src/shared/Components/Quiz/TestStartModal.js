import React,{Component} from 'react';
import TextFieldGroup from '../common/TextFieldGroup';

class TestStartModal extends Component{

    constructor(props){
        super(props);
    }

    render(){
        const {header,testTime,testQuestions,showModal,user} = this.props;
        return (
          <div className={"modal".concat(showModal ? ' show' : '') } tabIndex="-1"  >
              <div className="modal-dialog" style={{transform:"translate(0%, 50%)"}}>
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" data-dismiss="modal"
                      className="close" onClick={this.props.handleSubmit}
                    >&times;</button>
                    <h4 className="modal-title">{header}</h4>
                  </div>
                  <div className="modal-body">
                    { user.id ? <TextFieldGroup
                      field="testQuestions"
                      label="Number of Questions For Test"
                      onChange={this.props.handleInputChange}
                      value={testQuestions}
                      /> : <p>
                        {"Since you are a Non-Logged In user You'll only be able to access" 
                        + " 10 questions . Please login In to explore more such questions and exciting "
                        +" features to  prepare  in much better way for you test "}
                      </p>}
                    <TextFieldGroup
                      field="testTime"
                      label="Time For Test (in minutes)"
                      onChange={this.props.handleInputChange}
                      value={testTime}
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary" 
                      onClick={this.props.handleSubmit}>Submit</button>
                  </div>
                </div>
                
              </div>
            </div>
          )
        }
}

export default TestStartModal;


