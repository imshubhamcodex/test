import React,{Component,Fragment} from 'react';
import QuestionForm from './QuestionForm';
import TestStartModal from './TestStartModal';
import TestSubmitModal from './TestSubmitModal';
import AnswerPanel from './answerPanel';
import ResultPanel from  './resultPanel';
import Nav from './nav';
import Sidebar from './sidebar';
import { fetchQuestions , fetchAnswers} from '../../actions/quizAction';
import { connect } from 'react-redux';
import {Helmet} from 'react-helmet';
import { areEquivalent, checkEquivalence } from '../../utlis/utilFunctions';

class Quiz extends Component{

    constructor(props){
        super(props);
        this.state = {
            showModal:true,
            selectedAnswer : {},
            currentQuestionIndex : 0,
            markedQuestions : [],
            wantToSubmit : false,
            showResultPanel:false,
            showAnswerPanel:false,
            showTimer : true,
            testTimeOut : false,
            showTimeUpModal : false,
            testSubmitted : false,
            searchParams:{},
        }
        this.handleTestSubmit = this.handleTestSubmit.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.handleMark = this.handleMark.bind(this);
        this.updateCount = this.updateCount.bind(this);
        this.gotoMarked = this.gotoMarked.bind(this);
        this.checkAnswers = this.checkAnswers.bind(this);
        this.indentifyCorrect = this.indentifyCorrect.bind(this);
    }


    handleInputChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({[name]:value});
    }

    handleSelection(qsid,index,selectedOpts){
        this.setState({selectedAnswer : { ...this.state.selectedAnswer, [qsid] : {
            selectedOpts,
            index 
        } } })
    }

    handleModal(event){
        this.setState({showModal : ! this.state.showModal});
    }

    updateCount(count){
        this.setState({currentQuestionIndex:count});
    }

    gotoMarked(questionIndex){
        this.setState({currentQuestionIndex:questionIndex});
    }

    handleMark(event){
        const {currentQuestionIndex} = this.state;
        const newMarked =  
            this.state.markedQuestions.indexOf(currentQuestionIndex) > -1 ? 
                this.state.markedQuestions.filter( ele => ele!=currentQuestionIndex) 
            : [...this.state.markedQuestions].concat(currentQuestionIndex);  
        this.setState({markedQuestions: newMarked});
    }

    handleSubmit(event){
        const searchParams = window.location.search.split('?')[1]
            .split('&')
            .reduce( (acc,item) => {
                const param = item.split('=');
                const key = param[0];
                let val;
                if(key == "created"){
                    const d = new Date(param[1]);
                    val = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
                }else{
                    val = param[1].replace(/\%20/gm,'');
                }
                acc[key] = val;
                return acc;
            },{});
        this.setState({showModal: false,searchParams});
        this.state.testQuestions ? 
            this.props.fetchQuestions(searchParams.qid,this.state.testQuestions) 
        :  this.props.fetchQuestions(searchParams.qid); 
    }

    handleTestSubmit(event){
        this.setState({
            wantToSubmit : false,
            showTimeUpModal:false,
            showTimer:false,
            testSubmitted:true,
            showAnswerPanel : true,
            showResultPanel : true
        })
        const { selectedAnswer } = this.state;
        const answeredQuestions = this.props.quizData.filter(item => 
            selectedAnswer[item.qsid] ).map(ele => ele.qsid);
        this.props.fetchAnswers(answeredQuestions);
    }

    checkAnswers(){
        const {selectedAnswer} = this.state;
        const {quizAnswers} = this.props;
        const totalCorrect =  Object.keys(selectedAnswer).filter(ele =>{
            if(quizAnswers.find(item => item.qsid == ele) === undefined){
                return false;
            }
            const correctAns  = quizAnswers.find(item => item.qsid == ele).answer.split(',');
            return areEquivalent(correctAns,selectedAnswer[ele].selectedOpts);
        }).length;
        return totalCorrect;
    }

    indentifyCorrect(){
        const {selectedAnswer} = this.state;
        const {quizAnswers} = this.props;
        const correct = Object.keys(selectedAnswer).filter(ele =>{
            if(quizAnswers.find(item => item.qsid == ele) === undefined){
                return false;
            }
            const correctAns  = quizAnswers.find(item => item.qsid == ele).answer.split(',');
            return areEquivalent(correctAns,selectedAnswer[ele].selectedOpts);
        }).map(item => selectedAnswer[item].index);
        const incorrect = this.props.quizData.map( (item,index) => 
            correct.indexOf(index) > -1 ? null : index
        ).filter(item => item != null)
        return {correct,incorrect};
    }

    render(){
        const {quizLoading,quizSuccess,quizError,quizData,quizCount,user} = this.props;
        const {fetchAnswerError,fetchAnswerLoading,fetchAnswerSuccess,quizAnswers} = this.props;
        const {currentQuestionIndex,selectedAnswer,searchParams} = this.state;
        return(
            <div>
            <br/>
                <TestStartModal
                    user = {user}
                    showModal={this.state.showModal}
                    header="Please insert following information for simulating Quiz Enviroment"
                    handleInputChange={this.handleInputChange}
                    testQuestions={this.state.testQuestions || ''}
                    testTime={this.state.testTime || ''}
                    handleSubmit={this.handleSubmit}
            />
            
            { !this.state.showModal && quizLoading &&
                (<Fragment>
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </Fragment>)
            }
            { !this.state.showModal && !quizLoading && quizSuccess &&(
                <div className="container" style={{backgroundColor:"#ebebeb",display:"block",}}>  
                    {
                    this.state.showTimeUpModal ? (
                        <TestSubmitModal 
                            testTimeOut={this.state.testTimeOut}
                            showTimeUpModal={this.state.showTimeUpModal}
                            handleSubmit={this.handleTestSubmit}
                            handleClose={(event) => this.setState({showTimeUpModal : !this.state.showTimeUpModal })}
                        />)
                    : this.state.wantToSubmit ?
                        (<TestSubmitModal 
                            testTimeOut={this.state.testTimeOut}
                            wantToSubmit={this.state.wantToSubmit}
                            handleSubmit={this.handleTestSubmit}
                            handleClose={(event) => this.setState({wantToSubmit : !this.state.wantToSubmit })}
                        />)
                        : (<div>
                            <div className="col-lg-12" style={{display:"flex",
                                lineBreak:"anywhere",
                                flexDirection: window.innerWidth >= 700 ? 'row' : 'column' ,justifyContent:"space-between"}}>
                                    <h4> <b>TITLE:</b> {searchParams.title} </h4>
                                    <h4> <b>CREATED:</b> {searchParams.created}</h4>
                                    <h4> <b>Questions:</b> {quizCount} </h4>
                            </div>
                            <br/>
                            <div>
                                <Sidebar 
                                    timeUp = {() => {this.setState({testTimeOut : true,showTimeUpModal:true,testSubmitted:true})} }
                                    showTimer = {this.state.showTimer}
                                    testTime = {this.state.testTime || 60 }
                                    currentQuestionIndex={currentQuestionIndex}
                                    markedQuestions={this.state.markedQuestions}
                                    gotoMarked={this.gotoMarked}
                                />
                                <div className="col-lg-10">
                                    <Nav 
                                        testSubmitted={this.state.testSubmitted}
                                        handleSubmitModal = { (event) => {this.setState({wantToSubmit:true})} }
                                        totalLength = {quizData.length}
                                        markedQuestions={this.state.markedQuestions}    
                                        currentQuestionIndex={currentQuestionIndex}
                                        handleMark={this.handleMark}
                                        updateCount={this.updateCount}
                                    />
                                    <div style={{display:"flex",flexDirection:"column"}}>
                                        { !fetchAnswerLoading && fetchAnswerSuccess && 
                                            this.state.showResultPanel && (
                                            <ResultPanel 
                                                correctAnsCount={this.checkAnswers()}
                                                ansObj={this.indentifyCorrect()}
                                                hideResultPanel={(event) => {this.setState({showResultPanel : false})} }
                                                totalQuestions={quizData.length}
                                            />)
                                        }
                                        <QuestionForm 
                                            testSubmitted = {this.state.testSubmitted}
                                            selectedAnswer={selectedAnswer[quizData[currentQuestionIndex].qsid] ? 
                                                selectedAnswer[quizData[currentQuestionIndex].qsid].selectedOpts : []}
                                            totalQuestions={quizData.length}
                                            questionIndex={currentQuestionIndex}
                                            question={quizData[currentQuestionIndex]}
                                            handleSelection={this.handleSelection}
                                        />
                                        {!fetchAnswerLoading && fetchAnswerSuccess && 
                                            this.state.showAnswerPanel && (
                                                <AnswerPanel 
                                                    isCorrect = {
                                                        quizAnswers.find(ele => 
                                                            ele.qsid == quizData[currentQuestionIndex].qsid) ?
                                                        areEquivalent(quizAnswers.find(ele => 
                                                        ele.qsid == quizData[currentQuestionIndex].qsid)
                                                        .answer.split(','),
                                                        selectedAnswer[quizData[currentQuestionIndex].qsid] ?
                                                            selectedAnswer[quizData[currentQuestionIndex].qsid].selectedOpts 
                                                        : []) : false
                                                    }
                                                    correctAns={ 
                                                        quizAnswers.find(ele => 
                                                            ele.qsid == quizData[currentQuestionIndex].qsid) ? quizAnswers.find(ele => 
                                                        ele.qsid == quizData[currentQuestionIndex].qsid)
                                                        .answer : '  '
                                                    }
                                                    yourAns = { quizData && this.state.selectedAnswer[
                                                        quizData[currentQuestionIndex].qsid] ? 
                                                        this.state.selectedAnswer[quizData[
                                                            currentQuestionIndex].qsid].selectedOpts : []}
                                                    explanation = {
                                                        quizAnswers.find(ele => 
                                                            ele.qsid == quizData[currentQuestionIndex].qsid) ? 
                                                        quizAnswers.find(ele => 
                                                            ele.qsid == quizData[currentQuestionIndex].qsid)
                                                            .explanation : ' You have not answered this question '
                                                    }
                                                    hideAnswerPanel={ (event) => {this.setState({showAnswerPanel:false})} }
                                                />
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>)}
                </div>
                )
            }
            {
                !quizLoading && quizError && (<Fragment></Fragment>)
            }    
        </div>);
    }
}

const mapStateToProps = ({quizReducer = {}, auth={}}) => ({
    quizLoading: quizReducer.fetchQuizLoading,
    quizSuccess: quizReducer.fetchQuizSuccess,
    quizError: quizReducer.fetchQuizError,
    quizData: quizReducer.quizData,
    quizCount:quizReducer.quizCount,
    fetchAnswerLoading : quizReducer.fetchAnswerLoading,
    fetchAnswerSuccess : quizReducer.fetchAnswerSuccess,
    fetchAnswerError : quizReducer.fetchAnswerError,
    quizAnswers : quizReducer.fetchedAnswers,
    user : auth.user
})


const mapDispatchToProps = {
    fetchQuestions,
    fetchAnswers
}


export default connect(mapStateToProps,mapDispatchToProps)(Quiz);