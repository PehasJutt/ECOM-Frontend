import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

import Navbar from '../SubComponents/Navbar/Navbar';
import SideNav from '../SubComponents/SideNav/SideNav';

import './Layout.css';


const Layout = (props) => {
  const {children, isAdmin} = props;

  return (
    
    
    <div className='bodyWrapper'>
      <Navbar isAdmin={isAdmin}/>
      {isAdmin ? 
        <SideNav> {children}</SideNav> :
     
        <div className='userMainSection'>
          <Container>
            {children}
          </Container>
        </div>
      }
      
    </div>

  );
};

Layout.propTypes = {
  children: PropTypes.any.isRequired,
  isAdmin: PropTypes.bool.isRequired
};

export default Layout;

