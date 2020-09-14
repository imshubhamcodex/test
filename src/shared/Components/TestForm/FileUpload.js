import React,{Component} from 'react';
import { connect } from 'react-redux';
import {uploadFileAction} from '../../actions/fileAction';

class FileUpload extends Component {

    constructor(props){
        super(props);
        this.state= {
            loaded : 0
        }
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    componentDidUpdate(prevProps,prevState){
        if(prevState.selectedFile !== this.state.selectedFile){
            this.setState({loaded : 0})
        }
    }

    handleFileChange(event){
        this.setState({selectedFile : event.target.files[0]});
    }    

    handleFileUpload(event){
        event.preventDefault();
        const {selectedFile} = this.state;
        if(selectedFile.type != "application/pdf"){
            alert("Please attach PDF file")
        }
        else{
            let formData = new FormData();
            formData.append('avatar',selectedFile,selectedFile.name);
            this.props.uploadFileAction(formData);
        }
    }

    render(){
        return (
            <React.Fragment>
                <h1> Upload pdf to server</h1>
                    <br/>
                    <form encType="multipart/form-data" onSubmit={this.handleFileUpload}>
                        <input 
                            type="file" 
                            onChange={this.handleFileChange}
                        />
                        <br/>
                        <br/>
                    {this.state.selectedFile  || this.props.fileUploadPending ? 
                            <button 
                                type = "submit"
                                value = "Upload"
                                style = {{height:"28px",marginRight:"30px"}}
                                > Upload </button>
                        : <button
                            type="submit"
                            value ="Upload"
                            disabled> Upload </button>
                    }
                    </form>
            </React.Fragment>
        );
    }
}


const mapStateToProps = ({fileReducer}) => ({
    fileUploadPending : fileReducer.fileUploadPending,
    fileUploadSuccess : fileReducer.fileUploadSuccess,
    fileUploadError : fileReducer.fileUploadError,  
})

const mapDispatchToProps = {
    uploadFileAction,
  };

export default connect(mapStateToProps,mapDispatchToProps)(FileUpload);