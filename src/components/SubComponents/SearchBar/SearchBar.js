import React from 'react';
import {Form} from 'react-bootstrap';
import PropTypes from 'prop-types';
import './SearchBar.css';

const SearchBar = (props) => {
  const {width, placeholder, onSearchChange} = props;

  const handleSearchChange = (e) => {
    const searchQuery = e.target.value;
    onSearchChange(searchQuery);
  };

  return (
  
    <div className='searchBarWrapper'>
      <span className='SearchHeading'>Search:</span>
      <Form.Control
        type='text'
        placeholder = { placeholder }
        className = 'small-placeholder'
        style = {{ width:width }}
        onChange = { handleSearchChange }
      />
    
    </div>
    
  );
};

SearchBar.propTypes = {
  width: PropTypes.string,
  placeholder: PropTypes.string,
  onSearchChange: PropTypes.func
};

export default SearchBar;