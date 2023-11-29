import React from 'react';
import PropTypes from 'prop-types';

import trashIcon from '../../../assets/trash.svg';

import './checkout-helper.css';

const CheckoutHelper = (props) => {
  const {
    prodId,
    prodImage,
    prodTitle,
    prodColorCode,
    prodColorName,
    prodSize,
    prodQty,
    removeHandler,
    prodPrice
  } = props;

  

  return (
    <div className='cartItemWrapper'>
      <div className='itemDetailSection_lt'>
        <img src={prodImage} className='cartItemtemDetailImage' alt='some Image'/>
        <div className='itemDetailWrapper'>
          <div className='cartItemDetailTitle'>{prodTitle}</div>
          <div className='cartItemSpecs'>
            <div className='itemColorSpecWrapper cartItemSpec'>
              <div className='cartItemColor' style={{backgroundColor: prodColorCode}} />
              <div className='cartItemSpecTitle'>{prodColorName}</div>
            </div>
            <div className='cartItemSpecTitle cartItemSpec'>Size: {prodSize}</div>
            <div className='cartItemSpecTitle cartItemSpec'><b>Qty: {prodQty}</b></div>
            <div className='cartItemSpecTitle cartItemSpec'>{'Unit Ptice: '}<b>{`$${prodPrice}`}</b></div>
          </div>
        </div>
      </div>
      <div className='itemDetailSection_rt'>
        <img src={trashIcon} className='cartItemRemoveBtn' onClick={ () => removeHandler(prodId)} />    
      </div>
    </div>    
  );

};

CheckoutHelper.propTypes = {
  prodId: PropTypes.any.isRequired,
  prodImage: PropTypes.any.isRequired,
  prodTitle: PropTypes.string.isRequired,
  prodColorCode: PropTypes.string.isRequired,
  prodColorName: PropTypes.string.isRequired,
  prodSize: PropTypes.string.isRequired,
  prodQty: PropTypes.number.isRequired,
  removeHandler: PropTypes.func.isRequired
};

export default CheckoutHelper;