import React, {useState} from 'react';
import PropTypes from 'prop-types';

import AddEditProdCanvas from '../../CustomCanvas/add-edit-prod/add-edit-prod';
import CustomModal from '../../CustomModal/CustomModal';
import warning from '../../../../assets/warning.svg';
import './custom-table-row.css';

function TableRow (props){

  const [showCanvas, setShowCanvas] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {id, image, title, desc, size, color, price, stock, edit, remove, editAction, removeAction, imageArray} = props;
  const dispPrice = parseFloat(price) === 0 ? '00.00' : parseFloat(price);
  
  const handleCanvasHide = ()=>{
    setShowCanvas(false);
  };

  const handleClick = () => {
    setShowCanvas(true);
  };

  const updateprod = ({name, desc, price, qty, selectedImages}) => {
    const formData = new FormData();
    formData.append('prodId', id);
    if (selectedImages) {
      for (let i = 0; i < selectedImages.length; i++) {
        console.log('image found', selectedImages[i]);
        formData.append('images', selectedImages[i]);
      }
    }
   
    console.log(name, desc, price, qty);
    formData.append('title', name);
    formData.append('description', desc);
    formData.append('price', price);
    formData.append('stock', qty);

    console.log('updateProduct called', formData);
    editAction(formData);
    setShowCanvas(false);
  };

  const deleteProd = () => {
    const prod = {id};
    removeAction(prod);
  };

  const handleDelete = () =>{
    setShowModal(true);
  };

  const handleModalHide = () => {
    setShowModal(false);
  };

  return (
    <>
      {showCanvas && <AddEditProdCanvas 
        show={showCanvas} 
        handleHide={handleCanvasHide}
        title={'Edit Product'}
        btnText={'Update'}
        action={updateprod}
        placeholder={
          { Name: title,
            Desc: desc,
            Price:`$${price}`,
            Qty:stock,
            imgArray: imageArray
          }
        }
      />}

      {<CustomModal
        show={showModal} 
        handleHide={handleModalHide} 
        title={'Remove Product'} 
        modalIcon={warning} 
        message={'Are you sure you want to remove this product?'} 
        oneBtn={false}
        action={deleteProd}/>}
    
      <tr>
        <td>
          <img src={image} className='TitleImage' />
        </td>
        <td>{`${title} - ${desc}`}</td>
        <td>{size}</td>
        <td>{color}</td>
        <td>${dispPrice}</td>
        <td>{stock}</td>
        <td>
          <img src={edit} className='icon' onClick={handleClick}/>
        </td>
        <td>
          <img src={remove} className='icon' onClick={handleDelete}/>
        </td>
      </tr>
    </>
  );
}

TableRow.propTypes = {
  id: PropTypes.any,
  image: PropTypes.any,
  title: PropTypes.string,
  desc: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  price: PropTypes.any,
  stock: PropTypes.any,
  edit: PropTypes.any,
  remove: PropTypes.any,
  removeAction: PropTypes.func,
  editAction: PropTypes.func,
  imageArray: PropTypes.array

};

export default TableRow;