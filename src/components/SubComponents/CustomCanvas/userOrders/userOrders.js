import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Offcanvas} from 'react-bootstrap';
import PropTypes from 'prop-types';

import {userOrdersTableHeader, ObjectToRow} from './helper';
import OrderDetailCanvas from '../order-detail/order-detail';
import { GetUserOrders, GetOrderById, ClearUserOrder } from '../../../../reducers/orders';
import GenericTable from '../../../SubComponents/Table/gerneric-table/gerneric-table'; 
import backBtn from '../../../../assets/arrow_left.svg';


const UserOrdersCanvas = (props) => {
  const { show, handleHide }  = props;
  const [ showDetails, setShowDetails ] = useState(false);
  const user = useSelector( state => state.user);
  const orders = useSelector( state => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetUserOrders({id: user.id}));
  }, []);

  useEffect(() => {
    if (orders.userOrder) setShowDetails(true);
  }, [orders.userOrder]);

  const orderClick = (data) => {
    dispatch(GetOrderById({orderId: data[0]}));
  };

  return (
    <>
      {(showDetails && orders.userOrder) && 
      <OrderDetailCanvas
        show={showDetails}
        handleHide = {() => {
          setShowDetails(false);
          dispatch(ClearUserOrder());
        }}
        order = {orders.userOrder}
        viewOnly = {true}/>}
      <Offcanvas show={show} onHide={handleHide} backdrop='static' placement='end' className='Canvas w-75' >

        <Offcanvas.Header className='canvasHeader'>
          <img src={backBtn} className='backBtn' onClick={handleHide}/>
          <Offcanvas.Title className='canvasTitle'><h4>{'My Orders'}</h4></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='canvasBody'>
          <hr/>

          {orders.userOrders && orders.userOrders.length ?
            <GenericTable 
              header={userOrdersTableHeader} 
              rowsData={ObjectToRow(orders.userOrders)} 
              rowDataColor={'#495057'}
              handleRowClick={orderClick}/>

            : <span>You Dont Have Placed Any Orders Yet</span> }
        </Offcanvas.Body>

      </Offcanvas>
        
      
    </>
  );
};

UserOrdersCanvas.propTypes = {
  show: PropTypes.bool,
  handleHide: PropTypes.func
};

export default UserOrdersCanvas;
