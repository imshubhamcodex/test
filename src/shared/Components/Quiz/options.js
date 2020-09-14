import React,{Component} from 'react';
import {areEquivalent} from '../../utlis/utilFunctions';
class Options extends Component{
    constructor(props){
        super(props);
        this.optionHeaders=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O'
    ,'P','Q','R','S','T','U','V','W','X','Y','Z'];
        this.state = {
            options : [],
            checkedOpts : []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        const modifiedOpts =  this.props.options.map((ele,index) => {
            return{
                data : ele,
                header : this.optionHeaders[index],
                checked: false
            }
        })
        this.setState({options : modifiedOpts});
    }

    componentDidUpdate(prevProps,prevState){
        if(!areEquivalent(prevProps.options,this.props.options) ){
            const modifiedOpts =  this.props.options.map((ele,index) => {
                return{
                    data : ele,
                    header : this.optionHeaders[index],
                    checked: false
                }
            })
            this.setState({options : modifiedOpts});    
        }
        if(this.state.options.filter(ele => ele.checked).length === 0 && 
            this.props.selectedAnswer.length > 0 ){
            const newOptions = this.state.options.map(ele => {
                return this.props.selectedAnswer.indexOf(ele.header) > -1 ? {
                    ...ele,
                    checked : true
                } : ele
            }  )
            this.setState({options : newOptions});
        }
        
    }

    handleChange(event){
        const name = event.target.name;
        const modifiedOpts = this.props.isMulti ?  
            this.state.options.map(ele => ele.header === name ? { 
                data : ele.data , 
                header : ele.header,
                checked : !ele.checked}  : ele )
            : this.state.options.map(ele => ele.header === name ?
                {
                    data : ele.data,
                    header : ele.header,
                    checked : !ele.checked
                } : {
                    data : ele.data,
                    header : ele.header,
                    checked : false
                });
        const newSelected = modifiedOpts.filter(ele => ele.checked)
        this.setState({options : modifiedOpts},
            this.props.handleSelection(this.props.qsid,this.props.questionIndex,newSelected.map(ele => ele.header))
            );
    }
    render(){
        const {qsid} = this.props;
        return (
            <div className="col-lg-3" style={{
                display:"flex",flexDirection:"column",height:"65vh",overflowY:"auto"}}>
                {this.state.options.map((item,index) =>
                    <div 
                        className="panel panel-default" 
                        key={`${qsid}+${index}`} 
                        >
                        <div className="panel-heading"
                            style={{alignContent:"center"}}>
                            <input 
                                style={{margin:"7px"}}
                                type="checkbox" 
                                id={item.header} 
                                name={item.header}
                                value={item.header}
                                onChange={this.handleChange}
                                checked={item.checked}
                            /> 
                            <label style={{fontSize:"18px"}}>
                                {item.header}
                            </label>
                            <div className="panel-body" style={{lineBreak:'anywhere'}}>
                                {item.data}
                            </div>
                        </div>                    
                     </div>
                )}
            </div>
            )
    }

}

export default Options;

