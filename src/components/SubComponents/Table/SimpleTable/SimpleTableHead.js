import React from 'react';
import PropTypes from 'prop-types';
import './SimpleTableHead.css';

function SimpleTableHead (props){
  const {headers} = props;

  return (
    <thead>
      <tr>
        {console.log('Rcvd Headers',headers)}
        {headers.map(header => 
          <th key={header}className='customTh'>{header}</th>
        )}

      </tr>
    </thead>

  );
}

SimpleTableHead.propTypes = {
  headers: PropTypes.any
};

export default SimpleTableHead;