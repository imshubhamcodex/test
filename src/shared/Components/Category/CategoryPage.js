import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategoryList } from '../../actions/categoryAction';
import { deleteCategory } from '../../api';
import PropTypes from 'prop-types';
import ListElementPage from '../common/ListElementPage';

class CategoryPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datalist: [],
      offset: 0,
      loading: false,
    };

    this.deleteCategory = this.deleteCategory.bind(this);
  }
  componentDidMount() {
    this.setState({loading : true});
    setTimeout(() => {
      this.props.getCategoryList().then(
        (results) =>   {
          this.setState({datalist : results.data.list, loading:false})
        });
    }, 1000);
  } 

  deleteCategory(catId){
    const newDataList = this.state.datalist.filter(ele => ele.id !== catId)
    this.setState({datalist : newDataList})
    deleteCategory(catId).then(res => {
      const newDataList = this.state.datalist.filter(ele => ele.id !== catId)
        this.setState({datalist : newDataList})
    }).catch(err => alert('Unable to delete') );
  }


  render() {
    const headers = ['id', 'category', 'operation'];
    const { datalist, loading } = this.state;
    const {user} = this.props;
    return (
      <div className="container">
        <div className="col-md-4 col-md-offset-4">
          { user.role === 'admin' &&
            <Link to="/add-category" className="btn btn-primary" >Add Category</Link>}
            {
            (loading) ? 'Loading Data' : <ListElementPage 
              headers={ user.role==='admin' ? headers : headers.filter(ele => ele!='operation')} 
              datalist={datalist} 
              deleteOp={true} 
              userRole={user.role}
              deleteCategory={this.deleteCategory}
              />    
            }
        </div>    
      </div>
    )

  }
}

const mapStateToProps = ({auth={}}) => ({
  user : auth.user
})

CategoryPage.propTypes = {
  getCategoryList: PropTypes.func.isRequired,
}


export default connect(mapStateToProps, { getCategoryList }) (CategoryPage);
