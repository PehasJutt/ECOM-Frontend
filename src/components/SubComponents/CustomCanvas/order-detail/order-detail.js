import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Offcanvas, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

import {MarkAsDelivered} from '../../../../reducers/orders';
import {adminOrderDetailTableHeader, ObjectToRow} from './helper';
import GenericTable from '../../../SubComponents/Table/gerneric-table/gerneric-table'; 
import backBtn from '../../../../assets/arrow_left.svg';
import './order-detail.css';

const OrderDetailCanvas = (props) => {
  const { show, handleHide, order, viewOnly, reRenderFunc }  = props;
  const userToken = useSelector( state => state.user.token);
  const dispatch = useDispatch();

  const handleMarkDelivered = () => {
    const data = {
      token: userToken ? userToken : localStorage.getItem('token'),
      id: order._id
    };
    dispatch(MarkAsDelivered(data));
    reRenderFunc();
  };
  
  return (
    <>
      <Offcanvas show={show} onHide={handleHide} backdrop='static' placement='end' className='Canvas w-75' >

        <Offcanvas.Header className='canvasHeader'>
          <img src={backBtn} className='backBtn' onClick={handleHide}/>
          <Offcanvas.Title className='canvasTitle'><h4>{`Order #${order._id}`}</h4></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='canvasBody'>
          <hr/>
          <div className='adminOrderSummaryWrapper'>
            <div className='adminOrderSummary'>
              <div className='adminOrderSummary_title'>Sub Total</div>
              <div className='adminOrderSummary_stat'>${order.subTotal}</div>
            </div>
            <div className='adminOrderSummary'>
              <div className='adminOrderSummary_title'>Tax</div>
              <div className='adminOrderSummary_stat'>{order.taxPrcnt}%</div>
            </div>
            <div className='adminOrderSummary'>
              <div className='adminOrderSummary_title'>Tax Amount</div>
              <div className='adminOrderSummary_stat'>${order.taxAmount}</div>
            </div>
            <div className='adminOrderSummary'>
              <div className='adminOrderSummary_title'>Delivery Fee</div>
              <div className='adminOrderSummary_stat'>${order.deliveryInfo.deliveryCharges}</div>
            </div>
            <div className='adminOrderSummary'>
              <div className='adminOrderSummary_title'>Total</div>
              <div className='adminOrderSummary_stat'>${order.total}</div>
            </div>
            <div className='adminOrderSummary'>
              <div className='adminOrderSummary_title'>Payment</div>
              <div className='adminOrderSummary_stat' style={order.isPaid ? {color:'green'} : {color:'red'}}>{order.isPaid ? 'Paid' : 'Pending'}</div>
            </div>
            <div className='adminOrderSummary'>
              <div className='adminOrderSummary_title'>Delivery</div>
              <div className='adminOrderSummary_stat' style={order.isDelivered ? {color:'green'} : {color:'red'}}>{order.isDelivered ? 'Delivered' : 'Pending'}</div>
            </div>
          </div>


          
          <div className='adminOrderDeliveryDetails'>
            <div className='orderDeliverySection'>
              <div className='OrderDeliveryDetails'>
                <span className='adminOrderSummary_stat'><b>{'Deliver To: '}</b></span>
                <span className='adminOrderSummary_stat'>{order.deliveryInfo.name}</span> 
              </div>
              <div className='OrderDeliveryDetails'>
                <span className='adminOrderSummary_stat'><b>{'Location: '}</b></span>
                <span className='adminOrderSummary_stat'>{order.deliveryInfo.location}</span> 
              </div>
              <div className='OrderDeliveryDetails'>
                <span className='adminOrderSummary_stat'><b>{'Contact: '}</b></span>
                <span className='adminOrderSummary_stat'>{order.deliveryInfo.phoneNum}</span> 
              </div>
            </div>
            { !viewOnly ? order.isDelivered ? 
              <Button variant='outline-primary' disabled className='markDeliveryBtn'>Delivered</Button>
              : <Button
                variant='outline-primary'
                className='markDeliveryBtn'
                onClick={handleMarkDelivered}>
                    Mark as Delivered
              </Button>
              : null
            }
          </div>
            
          

          <GenericTable 
            header={adminOrderDetailTableHeader} 
            rowsData={ObjectToRow(order)} 
            rowDataColor={'#495057'}/>
        </Offcanvas.Body>

      </Offcanvas>
    </>
  );
};

OrderDetailCanvas.propTypes = {
  show: PropTypes.bool,
  handleHide: PropTypes.func,
  order: PropTypes.any,
  viewOnly: PropTypes.bool,
  reRenderFunc: PropTypes.func
};

export default OrderDetailCanvas;
