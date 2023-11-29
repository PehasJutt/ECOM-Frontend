import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import PropTypes from 'prop-types';
import './FilterDropdown.css';

function FilterDropdown(props) {
  const {titleMargin, menuWidth, title, dropdownOptions, lineSeparated} = props;
  
  const firstEl = dropdownOptions[0];
  const copiedArray = dropdownOptions.filter((_, index) => index !== 0);
  
  

  return (
    <DropdownButton
      size='md'
      variant='outline'
      title={ <span style={{ marginRight: titleMargin}}>{title}</span> }
      className='dropBoundaryLine'
      style={{height:'50px'}}
    >
        
      {lineSeparated ? 
        <>
          <Dropdown.Item style={{width:menuWidth}} onClick={firstEl.onClick}>{firstEl.data}</Dropdown.Item>
          {copiedArray.map((opt, index) => 
            <div key={index}>
              <Dropdown.Divider/>
              <Dropdown.Item style={{width:menuWidth}} onClick={opt.onClick}>{opt.data}</Dropdown.Item>
            </div>
          )}
        </> :
        <>
          {dropdownOptions.map((opt, index) => 
            <Dropdown.Item key={`${index}-${opt.data}`} style={{width:menuWidth}} onClick={opt.onClick}>{opt.data}</Dropdown.Item>
          )}
        </>
      }
     
    </DropdownButton>
  );
}

FilterDropdown.propTypes = {
  titleMargin: PropTypes.string,
  title: PropTypes.string.isRequired,
  menuWidth: PropTypes.string,
  dropdownOptions: PropTypes.array,
  lineSeparated: PropTypes.bool.isRequired
};

export default FilterDropdown;