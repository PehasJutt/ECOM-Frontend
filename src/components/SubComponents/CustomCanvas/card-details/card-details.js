import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import {Form, Button, Offcanvas} from 'react-bootstrap';
import { notification } from 'antd';

import backBtn from '../../../../assets/arrow_left.svg';

const CardDetailsCanvas = (props) => {

  const { 
    show,
    handleHide,
    title,
    btnText,
    action,
    setCardNumber,
    setExpiry,
    setCvc,
    setCardCountry,
    placeholders
  }  = props;
  
  const [cardNum, setCardNum] = useState(placeholders?.cardNum ? placeholders.cardNum : '');
  const [expNum, setExpNum] = useState(placeholders?.expNum ? placeholders.expNum : '');
  const [cvcNum, setCvcNum] = useState(placeholders?.cvcNum ? placeholders.cvcNum : '');
  const [country, setCountry] = useState(placeholders?.country ? placeholders.country : '');
  const loading = useSelector( state => state.cart.loading);
  
  const isExpiryInvalid = (expiry) => {
    if(expiry.length === 5) {
      const [month, year] = expiry.split('/');
      const expiryDate = dayjs().set('month', parseInt(month) - 1).set('year', 2000 + parseInt(year));
      return !(expiryDate.isAfter(dayjs(), 'month'));
    }
    return true;
  };
  

  const handleNumberChange = (e) => {
    let num = e.target.value;
    if(num.length < 20 ){
      if (num > cardNum) {
        if (num.length == 4) num += ' ';
        if (num.length == 9) num += ' ';
        if (num.length == 14) num += ' ';
      }
      setCardNum(num);
    }
  };

  const handleExpiryChange = (e) => {
    let expStr = e.target.value;
    if(expStr.length == 1 && expStr > '1' && expStr <= '9') expStr = '0' + expStr;
    if(expStr.length < 6 ){
      if (expStr > expNum && expStr.length == 2) expStr += '/';
      
      setExpNum(expStr);
    }
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setCountry(country);
  };

  const handleCvcChange = (e) => {
    const cvc = e.target.value;
    if(cvc.length < 4) setCvcNum(cvc);
  };
  const handleCardDetailSubmit = (e) => {
    e.preventDefault();
    const cardNumber = cardNum.replace(/ /g, '');
    if(cardNum && expNum && cvcNum && country) {
      setCardNumber(cardNumber);
      setExpiry(expNum);
      setCvc(cvcNum);
      setCardCountry(country);
      action();
    } else {
      notification.warning({
        message: 'Cannot Save',
        description: 'Please Fill All The Feilds',
        duration: 2
      });
    }
    
  };

  return (
    <>
      <Offcanvas show={show} onHide={handleHide} backdrop='static' placement='end' className='Canvas w-50' >

        <Offcanvas.Header className='canvasHeader'>
          <img src={backBtn} className='backBtn' onClick={handleHide}/>
          <Offcanvas.Title className='canvasTitle'><h4>{title}</h4></Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className='canvasBody'>
          <hr/>
          <Form onSubmit={handleCardDetailSubmit}>
            <Form.Group className='mb-4' controlId='creditCardForm'>
              <Form.Label className='canvasHeading'>Card Number</Form.Label>
              <Form.Control
                as='input'
                placeholder='Card Number'
                className='textArea'
                onChange={handleNumberChange}
                required={true}
                value = {cardNum}
                isInvalid = {cardNum.length > 0 && cardNum.length !== 19}
              />
              <Form.Control.Feedback type='invalid'>
                Enter a valid Card Number.
              </Form.Control.Feedback>
            </Form.Group>

            <div className='AddressFomGroup'>
              <div className='AddressSection'>
                <Form.Group className='mb-4' controlId='creditCardForm'>
                  <Form.Label className='canvasHeading'>Expiry Date</Form.Label>
                  <Form.Control
                    as='input'
                    placeholder='MM/YY'
                    className='textArea'
                    onChange={handleExpiryChange}
                    required={true}
                    value={expNum}
                    isInvalid ={expNum.length && isExpiryInvalid(expNum)}
                  />
                  <Form.Control.Feedback type='invalid'>
                Enter valid Expiry.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className='AddressSection'>
                <Form.Group className='mb-4' controlId='creditCardForm'>
                  <Form.Label className='canvasHeading'>CVC</Form.Label>
                  <Form.Control
                    as='input'
                    placeholder='CVC'
                    className='textArea'
                    onChange={handleCvcChange}
                    required={true}
                    value={cvcNum}
                    isInvalid={cvcNum.length > 0 && cvcNum.length != 3}
                  />
                  <Form.Control.Feedback type='invalid'>
                Enter valid CVC.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>

            <Form.Group className='mb-4' controlId='creditCardForm'>
              <Form.Label className='canvasHeading'>Country</Form.Label>
              <Form.Control
                as='input'
                placeholder='Country'
                className='textArea'
                onChange={handleCountryChange}
                required={true}
                value={country}
                isInvalid = {country.length > 0 && country.length < 3}
              />
              <Form.Control.Feedback type='invalid'>
                Enter valid Country Name.
              </Form.Control.Feedback>
            </Form.Group>
            <Button className='px-5 actionBtn' type='submit' disabled={loading}>{btnText}</Button>
          </Form>
        </Offcanvas.Body>

      </Offcanvas>
    </>
  );
};

CardDetailsCanvas.propTypes = {
  show: PropTypes.bool,
  handleHide: PropTypes.func,
  title: PropTypes.string,
  btnText: PropTypes.string,
  action: PropTypes.func,
  setCardNumber: PropTypes.func,
  setMob: PropTypes.func,
  setExpiry: PropTypes.func,
  setCvc: PropTypes.func,
  setCardCountry: PropTypes.func
};

export default CardDetailsCanvas;
