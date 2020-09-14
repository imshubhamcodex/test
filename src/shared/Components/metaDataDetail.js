import React,{Component} from 'react';
import  TextFieldGroup  from './common/TextFieldGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


class MetaDataComponent extends Component {
    
    constructor(props){
        super(props);
    }

    render(){
        const { index , itemKey , itemValue } = this.props;
        return (    
        <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <button onClick={(event) =>{ event.preventDefault() ; this.props.handleDelete(index) }}> <FontAwesomeIcon icon={faTimesCircle} /> </button>
                <TextFieldGroup 
                    style={{width:"45%"}}
                    field={``}
                    label={"key"}
                    onChange={ (event) => this.props.handleInsert({index,key:event.target.value})}
                    value = {itemKey || ''}  
                />
                <TextFieldGroup 
                    style={{width:"45%"}}
                    field={``}
                    label={"value"}
                    onChange={ (event) => this.props.handleInsert({index,value:event.target.value})}
                    value = {itemValue} 
                />
            </div>
        </div>)
    }
}

export default MetaDataComponent;