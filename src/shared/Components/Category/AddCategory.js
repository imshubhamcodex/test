import React, { Component } from 'react';

import { connect } from 'react-redux';
import CategoryForm from './CategoryForm'; 
import { addFlashMessage } from '../../actions/flashMessages';
import { category } from '../../actions/categoryAction';
import PropTypes from 'prop-types';

class AddCategory extends Component {
  render() {
    const { category, addFlashMessage } = this.props;
    return (
      <div className="container">
        <div className="col-md-4 col-md-offset-4">
          <CategoryForm category={category} addFlashMessage={addFlashMessage}/>
        </div>
      </div>
    )
  }
}

CategoryForm.propTypes = {
    category: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
}

export default connect(null, { category, addFlashMessage }) (AddCategory);
