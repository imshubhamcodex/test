import React,{Component} from 'react';

class TestSubmitModal extends Component{

    constructor(props){
        super(props);
        this.timeUpModal = this.timeUpModal.bind(this);
        this.submitModal = this.submitModal.bind(this);
    }

    timeUpModal(){
        const {showTimeUpModal} = this.props;

        return(
            <div style={{display : showTimeUpModal ? "block" : "none"}}>
                <div className={"modal ".concat( showTimeUpModal ? 'show' : '')}>
                    <div className="modal-dialog" style={{transform:"translate(0%, 50%)"}}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" onClick={this.props.handleClose}
                                >&times;</button>
                                <h4 className="modal-title">{"Time's Up"}</h4>
                            </div>
                            <div className="modal-body">
                                <p> {"You have Exhausted your time Limit"} </p>
                            </div>
                            <div className="modal-footer">
                            <button type="button" className="btn btn-default" 
                                onClick={this.props.handleSubmit}>Submit</button>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>

        )
    }

    submitModal(){
        const {wantToSubmit} = this.props;
        return (
            <div style={{display : wantToSubmit ? "block" : "none"}}>
                <div className={"modal ".concat( wantToSubmit ? 'show' : '') } >
                    <div className="modal-dialog" style={{transform:"translate(0%, 50%)"}}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close"  
                                    data-dismiss="modal"
                                    onClick={this.props.handleClose}
                                >&times;</button>
                                <h4 className="modal-title">{"Done Already ???"}</h4>
                            </div>
                            <div className="modal-body">
                                <p> {"Are you Sure !! you want to Submit the test ?"} </p>
                            </div>
                            <div className="modal-footer">
                            <button type="button" className="btn btn-default" 
                                onClick={this.props.handleSubmit}>Submit</button>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>

        )
    }


    render(){
        return this.props.testTimeOut ? this.timeUpModal() : this.submitModal();
    }
}
export default TestSubmitModal;