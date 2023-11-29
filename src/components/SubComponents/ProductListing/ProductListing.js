import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './ProductListing.css';

const ProductListing = ({prodData, prodSelector,id}) => {

  return (
    
    <div className='ProdCardWrapper' id={id}>
      <div>
        <img src={prodData.thumbnail} className='ProdCardImage'/>
        <h6 className='ProdCardDesc'>{prodData.description}</h6>
      </div>
      <div className='ProdCardBottom'>
        <div className='ProdPrice'>
          <span className='ProdCardPriceHeading'>Price:</span> 
          <span className='ProdCardPrice'>${prodData.price}</span>
        </div>
        {prodData.stock > 0 ? 
          <Button className='ProdCardDetailBtn' variant='primary' onClick={()=>prodSelector(prodData)}>Details</Button> :
          <Button className='ProdCardDetailBtn' variant='outline-danger' onClick={()=>prodSelector(prodData)}>Out of Stock</Button>

        }
      </div>
    </div>
  );
};

ProductListing.propTypes = {
  prodData: PropTypes.object.isRequired,
  prodSelector: PropTypes.func
};

export default ProductListing;