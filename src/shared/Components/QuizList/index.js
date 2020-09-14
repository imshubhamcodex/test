import React,{Component} from 'react';
import NoData from '../common/noData';
import {fetchQuizList} from '../../actions/categoryAction';
import {stringifyQueryParams} from '../../utlis/utilFunctions';
import QuizDescription from '../Quiz/quizDescription';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import {deleteQuiz} from '../../api';

class QuizList extends Component{
    
    constructor(props){
        super(props);
        this.state={
            loading : true,
            showDescriptionModal : false,
            selectedQuizDetails : {},
            deletedQuizes: []
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
        const catDetails = window.location.pathname.split('/')[2].split('==');
        const catName = catDetails[0];
        const catId = catDetails[1];
        this.setState({loading:true});
        this.props.fetchQuizList(catId);
    }   

    handleClick(qid){
        const {quizList = []} = this.props;
        const quizDetails = quizList.filter(ele => ele.qid == qid);
        const description = quizDetails[0].description;
        const infoInNextUrl = Object.keys(quizDetails[0] || {} ).reduce( (acc,item) => {
            if(item != "description"){
                acc[item] = typeof quizDetails[0][item] == "string" ? 
                    quizDetails[0][item].replace(/ /g,'')  : quizDetails[0][item] ;
            }
            return acc;
        },{}); 
        this.setState({ showDescriptionModal : !this.state.showDescriptionModal ,
            selectedQuizDetails : { description,infoInNextUrl }})
    }

    handleDelete(qid){
        deleteQuiz(qid).then(res => {
            const newDelQuiz = this.state.deletedQuizes;
            newDelQuiz.push(qid);
            this.setState({deletedQuizes : newDelQuiz})
        } ).catch(err => {
            alert("Unable To delete");
        });
    }

    render(){
        const {quizLoading,quizLoaded,quizError,quizList,user} = this.props;
        const {selectedQuizDetails = {},deletedQuizes} = this.state;
        const quizesToBeDisplayed = quizList && Array.isArray(quizList) ? quizList.filter(ele => 
                deletedQuizes.indexOf(ele.qid) === -1 ) : quizList;
        return(
            <div>
                <br/>
                { user.role === 'admin' ?  <Link to="/admin/add-quiz">
                    <button className="btn btn-primary"> Add Quiz </button>
                </Link> : null}
                <div className="container" style={{marginTop:"5%"}}>
                    {quizLoading && (
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>) 
                    }
                    {!quizLoading && quizLoaded && 
                        Array.isArray(quizList) && quizesToBeDisplayed 
                        && quizesToBeDisplayed.length > 0 ? (
                        <div style={{gridTemplateColumns:"50% 50%",
                            gridColumnGap:"10px",display:"grid",marginTop:"7%"}}>
                            {quizesToBeDisplayed.map(ele => 
                                deletedQuizes.indexOf(ele.qid) === -1
                                 && (<div style={{marginBottom:"10px"}}>
                                    <div onClick={ (event) => this.handleClick(ele.qid) } 
                                        style={{textDecoration:"none",cursor:"pointer"}}>
                                        <div className="panel panel-default" style={{
                                            padding:"10px",background:"#efefef"}}>
                                            <div className="panel-body" 
                                                style={{padding:"15px",background:"#efefef"}}>
                                                <h2>{ele.title}</h2>
                                            </div>
                                        </div>
                                    </div>
                                    { user.role === 'admin' && 
                                        (<div style={{display:"flex",
                                            justifyContent:"space-between"}}>
                                            <button onClick={event => 
                                                this.handleDelete(ele.qid) } > Delete </button>
                                        </div>)
                                    }
                                </div>
                                )
                            )}
                        </div>
                    ) : <NoData message={"This category contains No quiz , Contact Admin "} /> }
                    { this.state.showDescriptionModal && (<QuizDescription 
                        showDescriptionModal = {this.state.showDescriptionModal}
                        handleModal = { (event) => {this.setState({showDescriptionModal : 
                            !this.state.showDescriptionModal})} }
                        description = {selectedQuizDetails.description}
                        infoInNextUrl = {selectedQuizDetails.infoInNextUrl || {}}
                    />)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({categoryReducer = {},auth={}}) => ({
    quizLoading : categoryReducer.quizListLoading,
    quizLoaded : categoryReducer.quizListSuccess,
    quizError : categoryReducer.quizListError,
    quizList : categoryReducer.quizList,
    user : auth.user
})

const mapDispatchToProps = {
    fetchQuizList
}


export default connect(mapStateToProps,mapDispatchToProps)(QuizList);