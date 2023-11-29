import React from 'react';
import PropTypes from 'prop-types';

import cart from '../../../assets/cart.svg';
import './DashboardSummary.css';

const DashboardSummary = (props) => {
  const {title, prods, orders, units, sale} = props;

  return (
    <div className='DashboardSummaryCard'>
      <div className='DashSummaryHeader'>
        <img src={cart} className='SummaryCartIcon' />
        <h5>{title}</h5>
      </div>
      
      <div className='DashboardSummary'>
        <span>Total Products <b>{prods}</b></span>
        <span>Total Orders <b>{orders}</b></span>
      </div>
 
      <div className='DashboardSummary'>
        <span>Total Units <b>{units}</b></span>
        <span>Total Sale <b>{sale}</b></span>
      </div>

    </div>
  );
};

DashboardSummary.propTypes = {
  title: PropTypes.string,
  prods: PropTypes.number,
  orders: PropTypes.number,
  units: PropTypes.number,
  sale: PropTypes.string
};

export default DashboardSummary;