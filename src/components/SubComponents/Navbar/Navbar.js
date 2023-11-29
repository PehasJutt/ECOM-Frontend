import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Dropdown, Badge, Container} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';

import UserOrdersCanvas from '../CustomCanvas/userOrders/userOrders';
import { logout } from '../../../reducers/user';
import { GetNotification, ReadNotification } from '../../../reducers/notifications';
import bell from '../../../assets/bell.svg';
import arrowDown from '../../../assets/arrow_down.svg';
import bag from '../../../assets/bag.svg';
import './Navbar.css';

function Navbar(props) {
  const {isAdmin} = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [render, setRender] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const cart = useSelector(state => state.cart);  
  const user = useSelector(state => state.user);  
  const notifications = useSelector(state => state.notifications.notifications);


  useEffect(()=>{
    dispatch(GetNotification({id: user.id}));
  },[]);

  const handleNavLogin = () => {
    navigate('/login');
  };

  const handleBagClick  = () => {
    if (localStorage.getItem('token')) {
      if (cart.cartItems.length > 0) {
        navigate('/ordersummary');
      } 
    } else {
      navigate('/login');
    }
     
  };

  const handleLogout = () => {
    setShowOrders(false);
    dispatch(logout());
    setRender(!render);
    if (user.type === 'admin') {
      navigate('/login');
    } else navigate('/home');

  };

  const handleNotificationClick = (data) => {
    dispatch(ReadNotification({id: data}));
    dispatch(GetNotification({id: user.id}));
    notification.success({
      message: 'Successfull',
      description: 'Successfully marked notification as read',
      duration: 2
    });
  };

  const handleOrders = () => {
    setShowOrders(true);
  };

  const handleWebNameClick = () => {
    navigate('/');
  };

  return (
    <>
      {(!isAdmin && showOrders) && <UserOrdersCanvas show={showOrders} handleHide={()=> setShowOrders(false)} />}
      <Container className='NavWrapper'>
      
        <div onClick={handleWebNameClick} style={{cursor: 'pointer'}}>
          <h4>E-Commerce</h4>
        </div>

        <div className='nav_rt'>

          <div className='bag'>
            <img src={bag} className='bell_icon' onClick={handleBagClick}/>
            { (user || render) && localStorage.getItem('token') && cart.cartItems.length > 0 &&
                <Badge pill className='notification-badge'>
                  {cart.cartItems.length}
                </Badge>
            }
          </div>
        
          {notifications && <div className='bell'>
            <Dropdown>
              <Dropdown.Toggle variant='text' id='dropdown-basic'>
                <img src={bell} className='bell_icon' />
                <Badge pill className='notification-badge'>
                  {notifications.length}
                </Badge>

              </Dropdown.Toggle>

              <Dropdown.Menu className='notifications'>
                {notifications?.length && notifications.map((notification, index) => <Dropdown.Item key={index} onClick={()=>handleNotificationClick(notification._id)}>{notification.body}</Dropdown.Item>)}
              </Dropdown.Menu>
            </Dropdown>

          </div>}

          {(user || render) && localStorage.getItem('token') && localStorage.getItem('userName') ? 
            <>
              <div className='dropdown'>
                <Dropdown>
                  <Dropdown.Toggle variant='text' id='dropdown-basic'>
                    <span className='dropdown_text'>{localStorage.getItem('userName')} </span>
                    <img src={arrowDown} className='arrow_down'/>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {!isAdmin && <Dropdown.Item onClick={handleOrders}>Orders</Dropdown.Item>}
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              {localStorage.getItem('userImage') && <img src={localStorage.getItem('userImage')} className='avatar'/>}
            </>
            : <span className='navLoginBtn dropdown_text' onClick={handleNavLogin}>Login</span>
          }
        </div>
      </Container>
    </>
  );
}

export default Navbar;