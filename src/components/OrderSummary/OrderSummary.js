import {React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

import { 
  SelectItem,
  UnSelectItem,
  SelectAllItems,
  UpdateItemQty,
  RemoveFromCart,
  ClearCart
} from '../../reducers/cart';
import CartDetailHelper from '../SubComponents/cart-detail-helper/cart-detail-helper';
import trashIcon from '../../assets/trash.svg';
import disbaledTrashIcon from '../../assets/trash_disabled.svg';
import backBtn from '../../assets/arrow_left.svg';
import Layout from '../Layout/Layout';

import './OrderSummary.css';

const OrderSummary = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAllState, setSelectAllState] = useState(false);
  const cart = useSelector(state=>state.cart);  
  const TaxPercentage = 0.02;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedItems(cart.cartItems.filter((item) => item.isSelected === true));
  },[cart]);

  const calculateSubTotal = () => {
    let subTotal = 0;
    selectedItems.map((item) => {
      subTotal += item.prod.price * item.qty;
    });

    return subTotal;
  };

  const calculateTax = () => {
    const subTotal = calculateSubTotal();
    let taxAmm = subTotal * TaxPercentage;
    taxAmm = taxAmm.toFixed(2);
    taxAmm = Number(taxAmm);

    return taxAmm;
  };

  const calculateTotal = () => {
    return calculateSubTotal() + calculateTax(); 
  };

  const handleShoppingBack = () => {
    navigate('/');
  };

  const AnyItemSelected = () => {
    return cart.cartItems.some((item) => item.isSelected === true);
  };

  const handleSelectAll = () => {
    if (selectAllState === false)
      dispatch(SelectAllItems());

    setSelectAllState(!selectAllState);
  };

  const handleItemSelect = (id, isSelected) => {
    if (isSelected) {
      dispatch(UnSelectItem({_id: id}));
    } else {
      dispatch(SelectItem({_id: id}));
    }
  };

  const handleItemRemove = (_id) => {
    dispatch(RemoveFromCart({_id}));
  };

  const handleItemQty = (_id, qty) => {
    if (qty === 0) {
      dispatch(RemoveFromCart({_id}));
    } else {
      dispatch(UpdateItemQty({_id, qty}));
    }
  };  
  
  const handleClearCart = () => {
    dispatch(ClearCart());
  };

  const handleProceed = () => {
    navigate('/checkout');
  };

  return (
    <Layout isAdmin={false} >
      <div className='CartDetailHeader'>
        <img src={backBtn} onClick={handleShoppingBack} className='cartDetailBackBtn'/>
        <h4 className='CartDetailHeading'>Shopping Bag</h4>
      </div>
      {cart?.cartItems?.length ? 
        <>
          <div className='cartPageWrapper'>
            <div className='cartDetailwrapper'>
              <div className='CartSelectAll'>
                <div className='CartSelectAll_lt'>
                  <Form.Check
                    inline
                    label='Select All'
                    name='cart'
                    type={'checkbox'}
                    checked={selectAllState}
                    onClick={handleSelectAll}
                  />
                </div>
                <div className='CartSelectAll_rt'>
                  { (AnyItemSelected()) ?
                    <img src={trashIcon} onClick={handleClearCart} style={{cursor: 'pointer'}}/>
                    : <img src={disbaledTrashIcon} />
                  }
                </div>
              </div>

              {cart.cartItems.map((item, index) => 
                <CartDetailHelper 
                  key = { index }
                  prodId = { item.prod._id }
                  prodImage = { item.prod.thumbnail }
                  prodTitle = { item.prod.title }
                  prodColorCode = { item.color.code }
                  prodColorName = { item.color.name }
                  prodSize = { item.size }
                  prodQty = { item.qty }
                  prodStock = { item.prod.stock}
                  prodPrice = {item.prod.price}
                  isSelected = { item.isSelected }
                  selectHandler = { handleItemSelect }
                  removeHandler = { handleItemRemove }
                  qtyHandler = { handleItemQty }
                />
              )}

            </div>
            <div className='cartPageSummaryWrapper'>
              <h5 className='cartPageSummaryHeading mb-4'>Order Summary</h5>
              <div className='CartSummaryContainer'>
                { (AnyItemSelected()) ?
                  <>
                    <div className='CartSummary'>
                      <span className='CartSummaryTitle'>
                        {'Sub Total: '}
                        <span>{selectedItems.length} items</span>
                      </span>
                      <div className='CartSummaryResult'>
                        ${calculateSubTotal() > 0 ? 
                          calculateSubTotal()
                          : '00.00'
                        }
                      </div>
                    </div>
                    <div className='CartSummary'>
                      <span className='CartSummaryTitle'>Tax: (2%)</span>
                      <div className='CartSummaryResult'> ${calculateTax() > 0 ? 
                        calculateTax()
                        : '00.00'
                      }
                      </div>
                    </div>
                    <div className='CartSummary'>
                      <span className='CartSummaryTitle'>Total</span>
                      <div className='CartSummaryResult'> ${calculateTotal() > 0 ? 
                        calculateTotal()
                        : '00.00'
                      }
                      </div>
                    </div>
                    <Button variant='primary' className='CartProceedBtn' onClick={handleProceed}>Proceed to Checkout</Button>
                  </> 
                  : <div className='CartNoSelectionMsg'>
                    <h6>Please Select an Item</h6>
                  </div> 
                }
              </div>
                
              
            </div>
          </div>
        </>
        : <div className='emptyBagMsgWrapper'>
          <h5 className='emptyBagMsg'>Nothing in your Cart. Add something to checkout.</h5>
          <Button variant='primary' onClick={handleShoppingBack} className='emptyBagBtn'>Continue Shopping</Button>
        </div>
      }
    </Layout>
  );
};

export default OrderSummary;