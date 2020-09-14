import React, { Component } from 'react';
import { connect } from 'react-redux';
import FileUpload from './FileUpload';
import FileDetails from './FileDetails';


class TestForm extends Component {

  constructor(props){
    super(props);
    this.state = {}
  }


  render() {
    const {fileUploadPending,fileUploadError} = this.props;
    return (
      <React.Fragment>
        <div style={{textAlign: "center",background: "#3e3e3e",
          cursor: "pointer",transition: ".5s"}}>
          <h1 style={{padding: "100px",color: "#fff",fontFamily:"Lucida sans-serif"}}>
            Insert Form
          </h1>
        </div>
        <div className="container" style={{background:"#efefef"}}>
            <FileUpload />
            <FileDetails />
        </div>
      </React.Fragment>
    )
  }
}



const mapStateToProps = ({fileReducer={}}) => ({
  fileUploadPending : fileReducer.fileUploadPending,
  fileUploadSuccess : fileReducer.fileUploadSuccess,
  fileUploadError : fileReducer.fileUploadError,
})
 
const mapDispatchToProps = {};



export default connect(mapStateToProps,mapDispatchToProps) (TestForm);
