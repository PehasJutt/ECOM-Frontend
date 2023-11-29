import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ModalHeader } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { addBulkProducts } from '../../../reducers/product';
import uploadIcon from '../../../assets/upload.svg';

import './BulkImportModel.css';

function BulkImportModel(props) {
  const {show, handleHide, action, setFileName} = props;
  const [bulkProducts, setBulkProducts] = useState([]);
  const fileReader = new FileReader();
  const dispatch = useDispatch();

  const handleImportBodyClick = () => {
    document.getElementById('bulkImportInput').click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const newBulkProducts = [];
      fileReader.onload = function (event) {
        const text = event.target.result;
        const rows = text.split('\n');
        if (rows.length > 0) {
          for (let i = 0; i < rows.length - 1; i++) {
            if (i > 0) {
              const newData = rows[i].split(',');
              newBulkProducts.push(newData);
            }
          }
          setBulkProducts(newBulkProducts);
        }
      };
      fileReader.readAsText(file);
    }
  };


  const handleSave = () => {
    //flag here
    action();
    dispatch(addBulkProducts(bulkProducts));
    
  };

  return (
    <Modal
      show={show}
      onHide={handleHide}
      backdrop='static'
      // animation={false}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      dialogClassName='ImportModalWrapper'
    >
      <ModalHeader closeButton>
        <Modal.Title className='Importtitle'>Import Products</Modal.Title>

      </ModalHeader>
      <Modal.Body style={{padding:'25px', paddingTop:'0px'}}>
        <div className={'bulkImportInputWrapper'}> 
          <input type='file' accept='.csv'id='bulkImportInput' onChange={handleFileInputChange}/>
        </div>
        <div className='ImportModalBody' onClick={handleImportBodyClick}>

          <img src={uploadIcon} className='ImportModalIcon'/>
          <div className='ImportMessgae'>
            <span>Drag & drop files or <span className='coloredText'>Browse</span></span>
            <br/>
            <span className='coloredText'>Support Format CSV File</span>
          </div>
        </div>
          
        
        <Button onClick={handleSave}  className='ImportModalBtn'>
          <span className='ImportModalBtnText'>Save</span>
        </Button>
      </Modal.Body>
    </Modal>
  );
}

BulkImportModel.propTypes = {
  show: PropTypes.bool.isRequired,
  handleHide: PropTypes.func.isRequired,
  action: PropTypes.func
};

export default BulkImportModel;