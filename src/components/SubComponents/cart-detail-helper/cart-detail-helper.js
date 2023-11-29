import React from 'react';
import { Form } from 'react-bootstrap';
import { notification } from 'antd';
import PropTypes from 'prop-types';

import trashIcon from '../../../assets/trash.svg';

import './cart-detail-helper.css';

const CartDetailHelper = (props) => {
  const {
    prodId,
    prodImage,
    prodTitle,
    prodColorCode,
    prodColorName,
    prodSize,
    prodQty,
    isSelected,
    selectHandler,
    removeHandler,
    qtyHandler,
    prodPrice,
    prodStock
  } = props;

  const handleProdInc = () => {
    if(prodQty < prodStock) qtyHandler(prodId, prodQty + 1);
    else {
      notification.warning({
        message: 'Cannot Add More',
        description: 'Sorry, We have limited stock for this Product',
        duration: 2
      });
    }
    
  };

  const handleProdDec = () => {
    if ( prodQty > 0)
      qtyHandler(prodId, prodQty - 1);
  };

  return (
    <div className='cartItemWrapper'>
      <Form.Check
        inline
        label=''
        name='cart'
        type={'checkbox'}
        checked={isSelected} 
        onClick={ () => selectHandler(prodId, isSelected) }
      />
      <div className='itemDetailSection'>
        <div className='itemDetailSection_lt'>
          <img src={prodImage} className='cartItemtemDetailImage' alt='some Image'/>
          <div className='itemDetailWrapper'>
            <div className='cartItemDetailTitle'>{prodTitle}</div>
            <div className='cartItemSpecs'>
              <div className='itemColorSpecWrapper'>
                <div className='cartItemColor' style={{backgroundColor: prodColorCode}} />
                <div className='cartItemSpecTitle'>{prodColorName}</div>
              </div>
              <div className='cartItemSpecTitle'>Size: {prodSize}</div>
              <div className='itemPriceSpecWrapper'>
                <span className='cartItemSpecTitle'>{'Unit Price: '}</span>
                <span className='cartItemSpecTitle'><b>{'$'+prodPrice}</b></span>
              </div>
            </div>
          </div>

        </div>
        <div className='itemDetailSection_rt'>
          <img src={trashIcon} className='cartItemRemoveBtn' onClick={ () => removeHandler(prodId)} />
          <div className='CartItemQtyWrapper' >
            <div className='ProdQtyWrapper'>
              <div className='ProdQtyMark'onClick={handleProdDec}>-</div>
              <div className='ProdQty'>{prodQty}</div>
              <div className='ProdQtyMark' onClick={handleProdInc}>+</div>
            </div>
          </div>
                    
        </div>
      </div>
    </div> 

   
  );

};

CartDetailHelper.propTypes = {
  prodId: PropTypes.any.isRequired,
  prodImage: PropTypes.any.isRequired,
  prodTitle: PropTypes.string.isRequired,
  prodColorCode: PropTypes.string.isRequired,
  prodColorName: PropTypes.string.isRequired,
  prodSize: PropTypes.string.isRequired,
  prodQty: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  selectHandler: PropTypes.func.isRequired,
  removeHandler: PropTypes.func.isRequired,
  qtyHandler: PropTypes.func.isRequired
};

export default CartDetailHelper;