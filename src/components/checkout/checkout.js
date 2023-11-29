import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { notification } from 'antd';

import {
  RemoveFromCart,
  ClearCart,
  AddDeliveryInfo,
  AddBillingInfo,
  PlaceOrder,
  AddPaymentCard
  // ClearError
} from '../../reducers/cart';
import {
  AddUserAddress,
  GetUserAddresses
  // SetDefaultAddress
} from '../../reducers/user';
import CustomModal from '../SubComponents/CustomModal/CustomModal';
import AddressCanvas from '../SubComponents/CustomCanvas/address-canvas/address-canvas';
import MultipleAddressesCanvas from '../SubComponents/CustomCanvas/multiple-address-canvas/multiple-addresses-canvas';
import AddressCard from '../SubComponents/AddressCard/address-card';
import CardDetailsCanvas from '../SubComponents/CustomCanvas/card-details/card-details';
import CheckoutHelper from '../SubComponents/checkout-helper/checkout-helper';
import successIcon from '../../assets/success.svg';
import masterCardLogo from '../../assets/master-card-logo.svg';
import addCircle from '../../assets/add-circle.svg';
import backBtn from '../../assets/arrow_left.svg';
import editCardImg from '../../assets/editCard.svg';

import Layout from '../Layout/Layout';

import './checkout.css';

const Checkout = () => {
  const order = useSelector(state=>state.cart);  
  const [selectedItems, setSelectedItems] = useState([]);
  const [showAddressCanvas, setShowAddressCanvas] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [showCardCanvas, setShowCardCanvas] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [name, setName] = useState('');
  const [mob, setMob] = useState('');
  const [country, setCountry] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState(order?.billingInfo?.cardNum ? order?.billingInfo?.cardNum : '' );
  const [expiry, setExpiry] = useState(order?.billingInfo?.cardExp ? order?.billingInfo?.cardExp : '' );
  const [cvc, setCvc] = useState(order?.billingInfo?.cardCvc ? order?.billingInfo?.cardCvc : '' );
  const [cardCountry, setCardCountry] = useState('');
  const [displayAddress, setDisplayAddress] = useState(false);
  const [multipleAddresses, setMultipleAddresses] = useState(false);
  const [cardPlaceholder, setCardPlaceholder] = useState(null);
  const [disablePayment, setDisablePayment] = useState(true);
  const [hidePalceOrder, setHidePalceOrder] = useState(true);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [addCard, setAddCard] = useState(false);
  const [renderError, setRenderError] = useState(false);
  const user = useSelector(state=>state.user);  

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const TaxPercentage = 0.02;
  const deliveryCharges = 10;

  useEffect(() => {
    // dispatch(ClearError());
    dispatch(GetUserAddresses({id: user.id}));
    setSelectedItems(order.cartItems.filter((item) => item.isSelected === true));

    // return ( () => {
    //   dispatch(ClearError());
    // });
  },[]);

  useEffect(() => {
    if (firstRender && user?.addresses?.length) {
      const userAddress = user.addresses[0];
      setCity(userAddress.city);
      setCountry(userAddress.country);
      setMob(userAddress.contact);
      setProvince(userAddress.province);
      setName(userAddress.name);
      setAddress(userAddress.location);
      setDisplayAddress(true);
      setDisablePayment(false);
      setFirstRender(false);
    }
  },[user.addresses]);

  useEffect(() => {
    setSelectedItems(order.cartItems.filter((item) => item.isSelected === true));
  },[order]);

  useEffect(() => {
    if(cardNumber && cvc &&  expiry && cardCountry) {
      console.log('Logs: ', cardNumber,cvc, expiry, cardCountry);
      const cardData  = {
        userId: user.id,
        cvc,
        num: cardNumber,
        exp: expiry
      };
      setRenderError(true);
      dispatch(AddPaymentCard({cardData}));
    }
  },[addCard]);

  useEffect( ()=> {
    console.log('Condition: ', order.billingInfo.cardId, order.error);
    if(!order.error && order.billingInfo.cardId ){
      console.log('Success: ', order.billingInfo.cardId);
      dispatch(AddBillingInfo({
        cardNum: cardNumber,
        cardExp: expiry,
        cardCvc: cvc
      }));
      handleCardSave();
    } else if(order.error && renderError) {
      notification.error({
        message: 'Cannot Add Card',
        description: 'Please Provide Valid Card Details',
        duration: 2
      });
    }
  },[order.billingInfo.cardId, order.error]);
  
  const handleAddressHide = () => {
    setShowAddressCanvas(false);
  };

  const handleAddressSave = async () => {
    setShowAddressCanvas(false);
    setDisplayAddress(true);
    setDisablePayment(false);
    const newAddress = {
      userId: user.id,
      name,
      contact: mob,
      city,
      province,
      country,
      location: address
    };
    await dispatch(AddUserAddress({address: newAddress})).then( () => 
      dispatch(GetUserAddresses({id: user.id}))
    );
  };

  const handleCardSave = () => {
    setAddCard(true);
    setShowCard(true);
    setShowCardCanvas(false);
    setHidePalceOrder(false);
  };

  const calculateSubTotal = () => {
    let subTotal = 0;
    selectedItems.map((item) => {
      subTotal += item.prod.price * item.qty;
    });

    return subTotal;
  };

  const handleAddAddress = () => {
    setShowAddressCanvas(true);
  };

  const setSelectedAddress = (address) => {
    setCity(address.city);
    setCountry(address.country);
    setMob(address.contact);
    setProvince(address.province);
    setName(address.name);
    setAddress(address.location);
  };

  const handleAddCard = () => {
    setShowCardCanvas(true);
  };

  const calculateTax = () => {
    const subTotal = calculateSubTotal();
    let taxAmm = subTotal * TaxPercentage;
    taxAmm = taxAmm.toFixed(2);
    taxAmm = Number(taxAmm);

    return taxAmm;
  };

  const calculateTotal = () => {
    return calculateSubTotal() + calculateTax() + deliveryCharges; 
  };

  const handleCheckoutBack = () => {
    navigate('/');
  };

  const handleItemRemove = (_id) => {
    dispatch(RemoveFromCart({_id}));
  };

  const handleCanvasAddBtn = () => {
    setMultipleAddresses(false);
    setShowAddressCanvas(true);
  };
  
  const handlePlaceOrder = () => {
    const location = `${address} - ${city} - ${province} - ${country}`;
    dispatch(AddDeliveryInfo({
      name,
      location,
      phoneNum: mob
    }));
    // dispatch(AddBillingInfo({
    //   cardNum: cardNumber,
    //   cardExp: expiry,
    //   cardCvc: cvc
    // }));
    const orderItems = [];
    for (const item of order.cartItems) {
      if (item.isSelected) {
        const orderItemObj = {
          prodId: item.prod._id,
          price: item.prod.price,
          qty: item.qty
        };
        orderItems.push(orderItemObj);
      }
    }
    const data = {
      orderData: {
        userId: order.userId,
        subTotal: calculateSubTotal(),
        total: calculateTotal(),
        taxPrcnt: TaxPercentage * 100,
        taxAmount: calculateTax(),
        isPaid: false,
        isDelivered: false,
        cartItems: orderItems,
        deliveryInfo: {
          name,
          location,
          phoneNum: mob,
          deliveryCharges: deliveryCharges
        },
        billingInfo: {
          cardNum: cardNumber,
          cardExp: expiry,
          cardCvc: cvc,
          cardId: order.billingInfo.cardId
        }
      }
    };
    dispatch(PlaceOrder(data));
    dispatch(ClearCart());
    setShowSuccessMsg(true);
  };

  const handleModalClose = () => {
    setShowSuccessMsg(false);
  };

  return (
    <Layout isAdmin={false} >

      <CustomModal 
        show = { showSuccessMsg }
        handleHide = { handleModalClose }
        title = { 'Successfull' }
        modalIcon = { successIcon }
        message = { 'Awesome, Your order has been placed successfully' }
        oneBtn = {true}
      />

      <MultipleAddressesCanvas
        show = { multipleAddresses }
        handleHide = { () => setMultipleAddresses(false) }
        title = { 'Multiple Addresses' }
        btnText = { 'Confirm' }
        action = { () => setMultipleAddresses(false) }
        addBtnAction = {handleCanvasAddBtn}
        addressArr = {user?.addresses}
        handleSelect = {setSelectedAddress}
      />  

      <AddressCanvas
        show = { showAddressCanvas }
        handleHide = { handleAddressHide }
        title = { 'Add Delivery Address' }
        btnText = { 'Save' }
        action = { handleAddressSave }
        setName = { setName }
        setMob = { setMob }
        setCountry = { setCountry }
        setProvince = { setProvince }
        setCity = { setCity }
        setAddress = { setAddress }
      />

      <CardDetailsCanvas
        show = { showCardCanvas }
        handleHide = { () => setShowCardCanvas(false) }
        title = { 'Add Payment Method' }
        btnText = { 'Save' }
        action = { () => setAddCard(!addCard) }
        setCardNumber = { setCardNumber }
        setExpiry = { setExpiry }
        setCvc = { setCvc }
        setCardCountry = { setCardCountry }
        placeholders ={ cardPlaceholder }
      />

      <div className='CartDetailHeader'>
        <img src={backBtn} onClick={handleCheckoutBack} className='cartDetailBackBtn'/>
        <h4 className='CartDetailHeading'>Checkout</h4>
      </div>
      {selectedItems?.length ? 
        <>
          <div className='cartPageWrapper'>
            <div className='cartDetailwrapper'>

              { user.addresses && displayAddress ? 
                <AddressCard 
                  name={name}
                  mob={mob}
                  address={address}
                  city={city}
                  province={province}
                  country={country}
                  btnText={'Change'}
                  action={() => setMultipleAddresses(true)}
                />
                : <div className='AddBtnWrapper' >
                  <Button onClick={handleAddAddress}>Add Delivery Address</Button>
                </div> }

              {selectedItems.map((item, index) => 
                <CheckoutHelper 
                  key = { index }
                  prodId = { item.prod._id }
                  prodImage = { item.prod.thumbnail }
                  prodTitle = { item.prod.title }
                  prodColorCode = { item.color.code }
                  prodColorName = { item.color.name }
                  prodSize = { item.size }
                  prodQty = { item.qty }
                  prodPrice = { item.prod.price }
                  removeHandler = { handleItemRemove }
                />
              )}

            </div>
            <div className='cartPageSummaryWrapper'>
              <h5 className='cartPageSummaryHeading mb-4'>Order Summary</h5>
              <div className='CartSummaryContainer'>
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
                  <span className='CartSummaryTitle'>Delivery Fee</span>
                  <div className='CartSummaryResult'> $10 </div>
                </div>
                <div className='CartSummary'>
                  <span className='CartSummaryTitle'>Tax: (2%)</span>
                  <div className='CartSummaryResult'> ${calculateTax() > 0 ? 
                    calculateTax()
                    : '00.00'
                  }
                  </div>
                </div>
                <div className='CartSummary' >
                  <span className='CartSummaryTitle'>Total</span>
                  <div className='CartSummaryResult' style={{marginBottom:'16px'}}> ${calculateTotal() > 0 ? 
                    calculateTotal()
                    : '00.00'
                  }
                  </div>
                </div>
                <div className='VATmsg CartSummary'>VAT included where applicable</div>
                 
              </div>
                
              <div className='SelectPaymentWrapper'>
                <h5 className='cartPageSummaryHeading mt-4 mb-4'>Select Payment Method</h5>
                <div className='PaymentCardDiv' >
                  { showCard ?
                    <div className='sectionCard'>
                      <div className='PaymentCardWrapper'>
                        <div className='cardHeader'>
                          <img src={masterCardLogo} className='cardLogo'/>
                          <div>Master Card</div>
                        </div>
                        <div className='cardNum'>
                          <div>{'****'}</div>
                          <div>{'****'}</div>
                          <div>{'****'}</div>
                          <div>{cardNumber.slice(-4)}</div>
                        </div>
                        <div className='cardExpiry'>{expiry}</div>
                        <div className='cardOwnerName'>{name}</div>
                      </div>
                      <img src={editCardImg} className='editCard' onClick={()=>{
                        setCardPlaceholder({
                          cardNum: cardNumber,
                          expNum: expiry,
                          cvcNum: cvc,
                          country
                        });
                        setShowCardCanvas(true);
                      }} />
                    </div>
                    : <Button
                      variant={disablePayment ? 'outline-secondary' : 'outline-primary'}
                      className='PaymentBtn'
                      disabled={disablePayment}
                      onClick={handleAddCard}
                    >
                      <img src={addCircle} className='PaymentBtnICon' />
                      <div className='PaymentBtnText'>Add New</div>
                    </Button>}
                </div>
              </div>

              { !hidePalceOrder && 
              <>
                <Button
                  variant='primary'
                  className='w-100 mt-4'
                  onClick={handlePlaceOrder}
                >
                Place Order
                </Button>
              </>}
              
            </div>
          </div>
        </>
        : <div className='emptyBagMsgWrapper'>
          <h5 className='emptyBagMsg'>Your Shopping Basket is empty</h5>
          <Button variant='primary' onClick={handleCheckoutBack} className='emptyBagBtn'>Add Product</Button>
        </div>
      } 
    </Layout>
  );
};

export default Checkout;