import React from 'react';
import PropTypes from 'prop-types';
import { Button, Offcanvas } from 'react-bootstrap';

import AddressCard from '../../AddressCard/address-card';
import backBtn from '../../../../assets/arrow_left.svg';

const MultipleAddressesCanvas = (props) => {
  const { 
    show,
    handleHide,
    title,
    btnText,
    action,
    addBtnAction,
    addressArr,
    handleSelect
  }  = props;


  return (
    <>
      <Offcanvas show={show} onHide={handleHide} backdrop='static' placement='end' className='Canvas w-50' >

        <Offcanvas.Header className='canvasHeader'>
          <img src={backBtn} className='backBtn' onClick={handleHide}/>
          <Offcanvas.Title className='canvasTitle'><h4>{title}</h4></Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className='canvasBody'>
          <hr/>
          <Button className='px-5 addAddressBtn' onClick={addBtnAction}>{'Add New'}</Button>
          { addressArr?.length && addressArr.map((address, index) => 
            <div
              key={index}
              style={{marginTop: '1rem'}}>
              <AddressCard 
                name={address.name}
                mob={address.contact}
                address={address.location}
                city={address.city}
                province={address.province}
                country={address.country}
                btnText={'Select'}
                action={() => {
                  handleSelect(address);
                  handleHide();
                }}
              />
            </div>) }
          <Button className='px-5 actionBtn' onClick={() => action()}>{btnText}</Button>
        </Offcanvas.Body>

      </Offcanvas>
    </>
  );
};

MultipleAddressesCanvas.propTypes = {
  show: PropTypes.bool,
  handleHide: PropTypes.func,
  title: PropTypes.string,
  btnText: PropTypes.string,
  action: PropTypes.func,
  handleSelect: PropTypes.func.isRequired
  
};

export default MultipleAddressesCanvas;
