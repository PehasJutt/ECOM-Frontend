import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import './address-card.css';

const AddressCard = (props) => {
  const {
    name,
    mob,
    address,
    city,
    province,
    country,
    btnText,
    action
  }  = props;

  return (
    <div className='AddressWrapper'>
      <div className='AddressFieldWrapper'>
        <div> {'Deliver to: '}<b>{name}</b> </div>
        <div> {` Mobile #: ${mob}`} </div>
        <div> {` Address: ${address} - ${city} - ${province} - ${country}`} </div>
      </div>
      <Button
        variant='outline-primary'
        onClick={action}
        className='addressChangeBtn'>
        {btnText}
      </Button>
    </div>
  );
};

AddressCard.propTypes = {
  name: PropTypes.string,
  mob: PropTypes.string,
  address: PropTypes.string,
  city: PropTypes.string,
  province: PropTypes.string,
  country: PropTypes.string,
  btnText: PropTypes.string,
  action: PropTypes.func
  
};

export default AddressCard;
