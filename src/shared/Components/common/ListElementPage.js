import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NoData from './noData';

class ListElementPage extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {datalist , deleteOp, headers , userRole} = this.props;
    if(datalist.length > 0) {
      let tbody = [];
     if(userRole === 'admin'){
      datalist.map((data) => {
        return data.operation = (<button onClick={ (event) => { this.props.deleteCategory(data.id) }} >delete</button>);
      });
     }  
       
      
      let tableHeaders, tableBody;
      if (headers) {
          let thead = [];
          headers.forEach(header => {
            thead.push(<th scope="col" key={header}>{header}</th>)
          });
         tableHeaders =  (<thead><tr>{thead}</tr></thead>);
      }
      let tBodyTr = [];
      datalist.map(elements => {
        let tBodyTd = [];
        headers.forEach((data, i) => {
          tBodyTd.push(<td key={i}>{ data === 'category' ?
          <Link to={`/category_details/${elements[data]}==${elements["id"]}`}>{elements[data]}</Link> : elements[data]}</td>)
        });
        tBodyTr.push(<tr key={elements.id}>{tBodyTd}</tr>);
      });
       
    tableBody=(<tbody>{tBodyTr}</tbody>)
    
      return (
        <div>
          <table className="table">
            {tableHeaders}
            {tableBody}
          </table>
        </div>
      );
    }
    else{
      return ( userRole ==="admin" ?  <NoData message="Please add few categories to start" />  
        :<NoData message="No Categories Yet !!, please Contact Admin or add" />)
    }
  }
}
export default ListElementPage;