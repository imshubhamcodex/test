import React,{Component} from 'react';
// import {connect} from 'react-redux';

import MetaDataComponent from '../metaDataDetail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import TextFieldGroup from '../common/TextFieldGroup';
import {fetchMetaData,submitMeta} from '../../api';

class ModifyMetaData extends Component{

    constructor(props){
        super(props);
        this.state={
            // metaDataList: []
        };
        this.handlePathSubmit = this.handlePathSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        // const qid = window.location.search.split('?id=')[1];
        // this.setState({qid});
        // fetchMetaData(qid).then( res => {
        //     this.setState({metaDataList : res.data.map(item => {return {key:item.key , value: item.value } } )});
        // } );

    }

    handlePathSubmit(event){
        event.preventDefault();
        this.setState({disabled:true});
        fetchMetaData(this.state.pathName).then(res => {
            this.setState({
                pageId : res.data.pathDetails.pid,
                metaDataList:res.data.metaData.map(item => {
                    return {key:item.key,value:item.value}
                } ),
                pathdisabled : true
            })
        }).catch(err => console.log(err));
    }

    handleInsert(payload){
        let newMetaDataList = [...this.state.metaDataList];
        Object.keys(payload).indexOf("key") > -1 ? newMetaDataList[payload.index].key = payload.key : 
            newMetaDataList[payload.index].value = payload.value;
        this.setState({metaDataList : newMetaDataList})
    }

    handleDelete(index){
        const newMetaDataList = this.state.metaDataList.filter((ele,ind) => ind != index);
        this.setState({metaDataList : newMetaDataList})
    }

    handleSubmit(event){
        const {metaDataList,pageId} =  this.state;
        const isAllFilled =  metaDataList.filter(ele => 
            ele.key.length > 0 && ele.value.length>0).length === metaDataList.length ;
            
        if(isAllFilled){
            submitMeta({pageId,metaDataList}).then(res => {
                alert("success");
            }).catch(err => alert('An Issue occured'));
        }else{
            alert("place all values")
        }
        
    }

    render(){
        return(
            <div>
                <div style={{marginTop:"7%"}}>
                <h2  style={{fontFamily:"Lucida Sans"}}>  Modify/Add metadata for a page  </h2>
               <form onSubmit={this.handlePathSubmit}>
                    <TextFieldGroup 
                        field="url"
                        label="Insert URL of the Page"
                        disabled={this.state.disabled}
                        value = { this.state.pathName || ''}
                        disabled={this.state.pathdisabled}
                        onChange={(event) => {event.preventDefault();this.setState({pathName:event.target.value})}}
                    />
                    <button disabled={this.state.pathdisabled} className="btn btn-primary" type="submit"> Submit </button>
                </form>
                {this.state.metaDataList && (
                    <div>
                        <div style={{display:"flex",justifyContent:'space-between'}}>
                        <h3> MetaData List </h3>
                        <button className="btn"
                            onClick={ () => { 
                            event.preventDefault(); 
                            const newMetaDataList = [...this.state.metaDataList];
                            newMetaDataList.push({key:'',value:''})    
                            this.setState({metaDataList:newMetaDataList})
                            }} >  <FontAwesomeIcon icon={faPlusCircle} /> 
                        </button>
                        </div>
                        <div>
                        {this.state.metaDataList.map((ele,index) => 
                            <MetaDataComponent 
                                handleInsert = {this.handleInsert}
                                handleDelete = {this.handleDelete}
                                index={index}
                                itemKey={ele.key}
                                itemValue={ele.value}
                            />
                        )}
                        {this.state.metaDataList && (
                            <button className="btn btn-primary" onClick={this.handleSubmit}> Add MetaData </button>
                        )}
                        </div>
                    </div>
                )}
            </div>
        </div>)
    }
}

// const mapStateToProps = () => ({

// })

// const dispatchToProps = {

// }

// export default connect(mapStateToProps,dispatchToProps)(ModifyQuiz);

export default ModifyMetaData;