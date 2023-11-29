import React from 'react';
import PropTypes from 'prop-types';
import './custom-table-head.css';

function TableHead (props){
  const {icon, title, size, color, price, stock, actions} = props;

  return (
    <thead>
      <tr>

        <th colSpan={2}>
          <span>{title}</span> 
          <img src={icon} className='headerIcon' />
        </th>

        <th >{size}</th>

        <th>{color}</th>

        <th>
          <span>{price}</span> 
          <img src={icon} className='headerIcon' />
        </th>

        <th>
          <span>{stock}</span> 
          <img src={icon} className='headerIcon' />
        </th>

        <th colSpan={2}>{actions}</th>

      </tr>
    </thead>

  );
}

TableHead.propTypes = {
  icon: PropTypes.any,
  title: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  price: PropTypes.string,
  stock: PropTypes.string,
  actions: PropTypes.string
};

export default TableHead;