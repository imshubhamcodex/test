import React,{Component} from 'react';
import { connect } from 'react-redux';
import {getCategoryList} from  '../../actions/categoryAction';
import {submitFormDetailsAction} from '../../actions/fileAction';
import {addFlashMessage} from '../../actions/flashMessages';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaGroup from '../common/TextAreaGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';


class FileDetials extends Component{

    constructor(props){
        super(props);
        this.state = {
            formData : {
                quizType : 'Olddumps'
            },
            categoryList:[],
            loading:true,
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount(){
        this.props.getCategoryList().then(
            (results) =>   {
                const list = results.data.list;
              this.setState({
                categoryList : list,
                loading:false,
                formData : {...this.state.formData, category : list[0].id}
            })
            });
          }

    handleInputChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.value;
        const updatedFormData = {...this.state.formData,[name] : value };
        this.setState({
            formData  : updatedFormData
        })
    }

    handleFormSubmit(event){
        event.preventDefault();
        const {formData} = this.state;
        if(!this.props.fileName){
            alert('Please Upload File');
        }
        else{
            if((Object.keys(formData).filter(ele => formData[ele] && formData[ele].length>0).length < 3) ){
                alert("Place All Values");
            }
            else{
                const formDataWithFileName = {...formData,
                    pdfName : this.props.fileName}
                this.props.submitFormDetailsAction(formDataWithFileName);
            }
        }
    }

    render(){
        const {categoryList,loading} = this.state;
        const {formSubmissionPending,formSubmissionSuccess,formSubmissionError} = this.props;
        return (
            <React.Fragment>
                <h2 style={{fontFamily:"Lucida Sans"}}> Put your pdf information to database</h2>
                {
                    this.props.fileUploadPending ||formSubmissionPending || loading ? 
                    null :
                    <form onSubmit={this.handleFormSubmit}>
                    <TextFieldGroup
                        field="pdfName"
                        label="PDF"
                        disabled
                        onChange={this.handleInputChange}
                        value = {this.props.fileName ? this.props.fileName :  '-'}
                    />
                    <TextFieldGroup
                        field="title"
                        label="Title"
                        value = {this.state.formData["title"]||''}
                        onChange={this.handleInputChange}
                    />

                    <TextFieldGroup
                        field="header"
                        label="Header"
                        value = {this.state.formData["header"] || ''}
                        onChange={this.handleInputChange}
                    />
                    
                    <TextAreaGroup 
                        field="description"
                        label="description"
                        value={this.state.formData["description"]||''}
                        onChange={this.handleInputChange}
                    />

                    <h5>Category</h5>
                    <select                  
                        value= {this.state.formData["category"] ? this.state.formData["category"]  : 
                            this.state.categoryList[0].id  }
                        name="category"
                        onChange={this.handleInputChange} >
                        {categoryList.map(ele =>  
                            <option value={ele.id}> {ele.category} </option> )}
                    </select>

                    <h5>Quiz Type</h5>
                        <select name="quizType" onChange={this.handleInputChange}>
                            <option value="Olddumps">OldDumps</option>
                            <option value="PrepAway">PrepAway</option>
                        </select>
                    <div>
                    </div>

                    <input  className="btn btn-primary" type="submit" value="Submit"/>
                </form>
                }
                {/* { !formSubmissionPending && formSubmissionSuccess && 
                    this.props.addFlashMessage({
                    type: 'success',
                    text: 'Quiz Sucessfully added!'
                })}
                { !formSubmissionPending && formSubmissionError &&  this.props.addFlashMessage({
                    type: 'error',
                    text: 'Err !! we got some issues'
                })} */}

            </React.Fragment>
        );
    }
}

const mapStateToProps = ({fileReducer = {}}) => ({
    fileUploadPending : fileReducer.fileUploadPending,
    fileUploadSuccess : fileReducer.fileUploadSuccess,
    fileUploadError : fileReducer.fileUploadError,  
    fileName : fileReducer.fileName,
    formSubmissionSuccess : fileReducer.formSubmissionSuccess,
    formSubmissionError : fileReducer.formSubmissionError,
    formSubmissionPending : fileReducer.formSubmissionPending
})

const mapDispatchToProps = {
    getCategoryList,
    submitFormDetailsAction,
    addFlashMessage
}


export default connect(mapStateToProps,mapDispatchToProps)(FileDetials);