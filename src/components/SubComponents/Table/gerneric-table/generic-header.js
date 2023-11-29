import React from 'react';
import PropTypes from 'prop-types';
import './gerneric-table.css';

const GenericHeader = (props) => {
  const header = props.header;

  return (
    <thead>
      <tr>
        {header.map((heading, index) => {
          // {console.log(heading);}
          
          return ( <th key={index} colSpan={heading.colSpan || 1}>
            <span className={heading?.className || ''}>
              {heading.title}
            </span> 
            {heading.icon && <img src={heading.icon} className='headerIcon' /> }
          </th>);
          
        })}
      </tr>
    </thead>
  );
};

GenericHeader.propTypes = {
  header: PropTypes.array
};

export default GenericHeader;