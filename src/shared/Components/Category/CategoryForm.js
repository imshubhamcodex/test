import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup'; 
import validateInput from '../../../shared/validations/category';
import {
    withRouter
  } from 'react-router-dom'
  

class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading : false,
        category : '',
        status : true,
        id: '',
        errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }
  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors : {}, isLoading: true});
      this.props.category(this.state).then(
      () =>   {
        this.props.addFlashMessage({
            type: 'success',
            text: 'Category saved.'
          });  
        this.props.history.push('/categories');
        
      }).catch(error => {
       this.setState({isLoading : false, errors : error.response.data.errors});
      });
    }
  }

  isValid () {
    const {errors , isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({errors});
    }
    return isValid;
  }

  onChange(e){
    this.setState({ [e.target.name] : e.target.value});
  }


  render() {
    const { errors , isLoading} = this.state;
    return (
        <form onSubmit={this.onSubmit}>
          <h1>Create Category </h1> 
          <TextFieldGroup
            error={errors.category}
            label='Category Name'
            type="text"
            value={this.state.category}
            onChange={this.onChange}
            field="category"
          />
           <button disabled={isLoading} className="btn btn-primary btn-lg">
                Save
          </button>
          </form>
     
        )
    
      }
}



export default (withRouter(CategoryForm));