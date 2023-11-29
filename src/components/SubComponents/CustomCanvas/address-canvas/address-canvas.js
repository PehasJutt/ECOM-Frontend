import React from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Offcanvas} from 'react-bootstrap';

import backBtn from '../../../../assets/arrow_left.svg';
import './address-canvas.css';

const AddressCanvas = (props) => {
  const { 
    show,
    handleHide,
    title,
    btnText,
    action,
    setName,
    setMob,
    setCountry,
    setProvince,
    setCity,
    setAddress
  }  = props;
  // const [defaultAdd, setDefaultAdd] = useState(false);
  const handleNameChange = (e) => {
    const name = e.target.value;
    setName(name);
  };

  // const handleCheckboxChange = (e) => {
  //   const isChecked = e.target.checked;
  //   setDefaultAdd(isChecked);
  // };

  const handleMobChange = (e) => {
    const mob = e.target.value;
    setMob(mob);
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setCountry(country);
  };

  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setProvince(province);
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setCity(city);
  };

  const handleAddressChange = (e) => {
    const address = e.target.value;
    setAddress(address);
  };

  const handleBtnClick = () => {
    action();
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
          <div className='canvasHeading'>
            <span>Full name</span>
          </div>
          <Form.Control
            as='input'
            placeholder='Full name'
            className='textArea'
            onChange={handleNameChange}
            required={true}
          />

          <div className='AddressFomGroup'>

            <div className='AddressSection'>
              <div className='canvasHeading'>
                <span>Mobile #</span>
              </div>
              <Form.Control
                as='input'
                placeholder='Mobile #'
                className='textArea'
                onChange={handleMobChange}
                required={true}
              />
            </div>

            <div className='AddressSection'>
              <div className='canvasHeading'>
                <span>Country</span>
              </div>
              <Form.Control
                as='input'
                placeholder='Country'
                className='textArea'
                onChange={handleCountryChange}
                required={true}
              />
            </div>

          </div>

          <div className='AddressFomGroup'>

            <div className='AddressSection'>
              <div className='canvasHeading'>
                <span>Province</span>
              </div>
              <Form.Control
                as='input'
                placeholder='Province'
                className='textArea'
                onChange={handleProvinceChange}
                required={true}
              />
            </div>

            <div className='AddressSection'>
              <div className='canvasHeading'>
                <span>City</span>
              </div>
              <Form.Control
                as='input'
                placeholder='City'
                className='textArea'
                onChange={handleCityChange}
                required={true}
              />
            </div>

          </div>

          <div className='canvasHeading'>
            <span>Address</span>
          </div>
          <Form.Control
            as='textArea'
            rows={3}
            placeholder='Address'
            className='textArea'
            onChange={handleAddressChange}
            required={true}
          />
          
          {/* <Form.Group className='mb-4' controlId='formBasicCheckbox'>
            <Form.Check
              type='checkbox'
              label='Set as Default'
              checked={defaultAdd}
              onChange={handleCheckboxChange}
            />
          </Form.Group> */}

          <Button className='px-5 actionBtn' onClick={handleBtnClick}>{btnText}</Button>
        </Offcanvas.Body>

      </Offcanvas>
    </>
  );
};

AddressCanvas.propTypes = {
  show: PropTypes.bool,
  handleHide: PropTypes.func,
  title: PropTypes.string,
  btnText: PropTypes.string,
  action: PropTypes.func,
  setName: PropTypes.func,
  setMob: PropTypes.func,
  setCountry: PropTypes.func,
  setProvince: PropTypes.func,
  setCity: PropTypes.func,
  setAddress: PropTypes.func
};

export default AddressCanvas;
