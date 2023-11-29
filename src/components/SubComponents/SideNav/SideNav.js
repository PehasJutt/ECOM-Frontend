import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import arrowRight from '../../../assets/arrow_right.svg';
import './SideNav.css';

const SideNav = ({children}) => {
  return (


    <div className='AdminPageWrapper'>
      <div className='sideNavWrapper'>
        <ul className='sideNavCustomList'>

          <li className='sideNavItem'>
            <div className='sideNavListWrapper'>
              <img src={arrowRight} className='sideNavBullets'/>
              <Link to='/admindashboard' className='sideNavListData'>
                    Dashboard
              </Link>
              <hr className='sideNavLine' />
            </div>
          </li>

          <li className='sideNavItem'>
            <div className='sideNavListWrapper'>
              <img src={arrowRight} className='sideNavBullets'/>
              <Link to='/adminproducts' className='sideNavListData'>
                    Products
              </Link>
              <hr className='sideNavLine' />
            </div>
          </li>

          <li className='sideNavItem'>
            <div className='sideNavListWrapper'>
              <img src={arrowRight} className='sideNavBullets'/>
              <Link to='/adminorders' className='sideNavListData'>
                    Orders
              </Link>
              <hr className='sideNavLine' />
            </div>
          </li>

        </ul>
      </div>
      <div className='sideNavMainSection'>
        {children}
      </div>
    </div>


    
  );
};

SideNav.propTypes = {
  children: PropTypes.element.isRequired
};

export default SideNav;