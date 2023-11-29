import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import './CustomModal.css';



function CustomModal(props) {

  const {
    show,
    handleHide,
    title,
    modalIcon,
    message,
    oneBtn,
    action
  } = props;

  return (
    
    <Modal
      show={show}
      onHide={handleHide}
      backdrop='static'
      // animation={false}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      dialogClassName='ModalWrapper'
    >
      <Modal.Body>
        <div className='ModalBody'>
          <div className='title'> <h4>{title}</h4> </div>
          <img src={modalIcon} className='modalIcon'/>
          <div className='messgae'>
            <span>{message}</span>
          </div>
          {oneBtn ?
            <Button variant='outline-primary' onClick={handleHide}>
              <span className='modalBtn'>Close</span>
            </Button> : 
            <div className='btnWrapper'>
              <Button variant='outline-primary' onClick={handleHide}>
                <span className='modalBtn'>No</span>
              </Button> 
              <Button  onClick={action}>
                <span className='modalBtn'>Yes</span>
              </Button> 
            </div>
          }
        </div>
      </Modal.Body>
    </Modal>
  );
}

CustomModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleHide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  modalIcon: PropTypes.any.isRequired,
  message: PropTypes.string.isRequired,
  oneBtn: PropTypes.bool.isRequired,
  action: PropTypes.func
};

export default CustomModal;