import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {Form, Button, Offcanvas} from 'react-bootstrap';

import backBtn from '../../../../assets/arrow_left.svg';
import upload from '../../../../assets/upload.svg';
import { delPrevProdImgs } from '../../../../reducers/product';
import './add-edit-prod.css';

const AddEditProdCanvas = (props) => {

  const dispatch = useDispatch();
  const { show, handleHide,title, btnText, action, placeholder }  = props;
  const [name, setName] = useState(placeholder ? placeholder.Name : '');
  const [desc, setDesc] = useState(placeholder ? placeholder.Desc : '');
  const [Price,setPrice] = useState(placeholder ? placeholder.Price : '');
  const [qty, setQty] = useState(placeholder ? placeholder.Qty : '');
  const [color, setColor] = useState(placeholder ? placeholder.color : '');
  const [size, setSize] = useState(placeholder ? placeholder.size : '');
  const [isDisable, setIsDisable] = useState(name=='' || desc=='' || Price=='' || qty=='' || color=='' || size=='');
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImages64, setSelectedImages64] = useState(placeholder?.imgArray ? placeholder.imgArray : []);
  const [filesToDelete, setFilesToDelete] = useState(null);

  useEffect(() => {
    for(const image of selectedImages) {
      imageToBase64(image, function (error, base64String) {
        if (error) {
          console.error('Error converting image to Base64:', error);
        } else {
          setSelectedImages64([...selectedImages64, base64String]);
        }
      });
    }
  },[selectedImages]);

  useEffect(() => {
    const condition  = name=='' || desc=='' || Price=='' || qty=='' || color=='' || size=='';
    console.log('Set Condition: ', condition);
    setIsDisable(condition);
    
  },[name, desc, Price, qty]);

  const handleBtnClick = async () => {
    const formData = new FormData();
    for (let i = 0; i < selectedImages.length; i++) {
      formData.append('images', selectedImages[i]);
    }
    const price = Price.length > 1 ? Price.slice(1) : '0';

    if (placeholder) {
      if (filesToDelete) {
        dispatch(delPrevProdImgs({filesToDelete}));
      }
      if (selectedImages.length) {
        action({
          name,
          desc,
          price,
          qty,
          color,
          size,
          selectedImages
        });
      } else {
        action({
          name,
          desc,
          price,
          qty,
          color,
          size
        });
      }
    } else if (placeholder === null) {
      formData.append('title', name);
      formData.append('description', desc);
      formData.append('price', price);
      formData.append('stock', qty);
      formData.append('color', color);
      formData.append('size', size);
      formData.append('thumbnail', null);
      action( formData );
    }
  };

  const imageToBase64 = (inputFile, callback) => {
    if (!inputFile) {
      return callback('No input file provided', null);
    }
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      const base64String = e.target.result;
      callback(null, base64String);
    };
    fileReader.onerror = function (error) {
      callback(error, null);
    };
    fileReader.readAsDataURL(inputFile);
  };
  

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (selectedImages.length === 0) {
      const files = selectedImages64.map(imgPath => 
        imgPath.split('/').pop()
      );
      setFilesToDelete(files);
      setSelectedImages64([]);
    }
    setSelectedImages([...selectedImages,...files]);
  };

  const handleNameChange = (e) => {
    const inputName = e.target.value;
    setName(inputName);
  };

  const handleDescChange = (e) => {
    const inputDesc = e.target.value;
    setDesc(inputDesc);
  };

  const handlePriceChange = (e) => {
    const inputPrice = e.target.value;
    if(inputPrice.length) {
      const Char = inputPrice[inputPrice.length - 1];
      if ((Char >= '0' && Char <= '9') || Char == '$') {
        if (inputPrice.length === 1  && inputPrice !== '$')
          setPrice(`$${inputPrice}`);
        else 
          setPrice(inputPrice);
      }
    }
  };

  const handleQtyChange = (e) => {
    const inputQty = e.target.value;
    if(inputQty >= 0)
      setQty(inputQty);
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
          <div className='canvasBodyWrapper'>
            <div className='section_lt'>
              <div className='browse_section'>
                <img src={upload} className='upload_icon' />
                <span>Drag & drop file here</span>
                <span>or</span>
                <Form.Group controlId='formFileMultiple' className='browseBtn'>
                  <Form.Control type='file' multiple onChange={handleFileSelect}/>
                </Form.Group>
              </div>
              <span className='d-flex justify-content-center text'>(multiple Images can be upload)</span>

              <div className='prodImagesSection'>
                {selectedImages64.length > 0 && selectedImages64.map((image64, index) => {
                  return <img key={index} src={image64} className='prodImage' />;
                })
                }
              </div>
            </div>
            <div className='section_rt'>

              <div className='canvasHeading'>
                <span>Product Name</span>
              </div>
              <Form.Control as='textarea' rows={2} value={name} placeholder='Product Name' className='textArea' onChange={handleNameChange}/>

              <div className='canvasHeading'>
                <span>Product Discription</span>
              </div>
              <Form.Control as='textarea' rows={2} value={desc} placeholder='Product Description' className='textArea' onChange={handleDescChange}/>
              <div className='canvasHeading'>
                <span>Size</span>
              </div>
              <div className='sizes'>
                <div className={size == 'XS' ? 'selectedItem size' : 'size'} onClick={()=>setSize('XS')}>XS</div>
                <div className={size == 'M' ? 'selectedItem size' : 'size'} onClick={()=>setSize('M')}>M</div>
                <div className={size == 'L' ? 'selectedItem size' : 'size'} onClick={()=>setSize('L')}>L</div>
                <div className={size == 'XL' ? 'selectedItem size' : 'size'} onClick={()=>setSize('XL')}>XL</div>
                <div className={size == '2XL' ? 'selectedItem size' : 'size'} onClick={()=>setSize('2XL')}>2XL</div>
                <div className={size == '3XL' ? 'selectedItem size' : 'size'} onClick={()=>setSize('3XL')}>3XL</div>
              </div>

              <div className='canvasHeading'>
                <span>Color</span>
              </div>
              <div className='colors'>
                <div className={color == 'green' ? 'selectedItem colorWrapper' : 'colorWrapper'} onClick={()=>setColor('green')}>
                  <div className='color' style={{background:'#155724'}} />
                </div>
                <div className={color == 'grey' ? 'selectedItem colorWrapper' : 'colorWrapper'} onClick={()=>setColor('grey')}>
                  <div className='color' style={{background:'#AAA'}} />
                </div>
                <div className={color == 'black' ? 'selectedItem colorWrapper' : 'colorWrapper'} onClick={()=>setColor('black')}>
                  <div className='color' style={{background:'#1B1E21'}} />
                </div>
                <div className={color == 'purple' ? 'selectedItem colorWrapper' : 'colorWrapper'} onClick={()=>setColor('purple')}>
                  <div className='color' style={{background:'#231579'}} />
                </div>
                <div className={color == 'red' ? 'selectedItem colorWrapper' : 'colorWrapper'} onClick={()=>setColor('red')}>
                  <div className='color' style={{background:'#740F0F'}} />
                </div>
              </div>

              <div className='canvasHeading'>
                <span>Price</span>
              </div>
              <Form.Control as='input' value={Price} placeholder='$00.00' className='textArea' onChange={handlePriceChange}/>

              <div className='canvasHeading'>
                <span>Quantity</span>
              </div>
              <Form.Control as='input' type='number' min={0} value={qty} placeholder='Quantity' className='textArea' onChange={handleQtyChange}/>

              <Button className='px-5 actionBtn' onClick={handleBtnClick} disabled={isDisable}>{btnText}</Button>


            </div>
          </div>
        </Offcanvas.Body>

      </Offcanvas>
    </>
  );
};

AddEditProdCanvas.propTypes = {
  show: PropTypes.bool,
  handleHide: PropTypes.func,
  title: PropTypes.string,
  btnText: PropTypes.string,
  action: PropTypes.func,
  placeholder: PropTypes.any
};






export default AddEditProdCanvas;
