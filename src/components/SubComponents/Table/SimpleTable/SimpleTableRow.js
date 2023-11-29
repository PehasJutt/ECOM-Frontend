import React from 'react';
import PropTypes from 'prop-types';
import './SimpleTableRow.css';

function SimpleTableRow (props){
  const {rowData} = props;

  return (
    <tr>
      <td className='rowID'>{rowData[0]}</td>
      <td className='msg'>{rowData[1]}</td>
    </tr>

  );
}

SimpleTableRow.propTypes = {
  rowData: PropTypes.any
};

export default SimpleTableRow;