import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import OrderDetailCanvas from '../../CustomCanvas/order-detail/order-detail';
import './OrderTableRow.css';

const OrderTableRow = (props) => {
  const {order, actionIcon, reRenderFunc } = props;
  const [showOrderCanvas, setShowOrderCanvas] = useState(false);

  const handleCanvasHide = () => {
    setShowOrderCanvas(false);
  };

  const handleClick = () => {
    setShowOrderCanvas(true);
  };

  const date = dayjs(order.createdOn).format('DD MMMM YY');

  return (
    <>
      <OrderDetailCanvas 
        viewOnly={false}
        show={showOrderCanvas}
        handleHide={handleCanvasHide}
        order={order}
        reRenderFunc={reRenderFunc}
      />
      <tr onClick={handleClick} style={{cursor: 'pointer'}}>
        <td><span className='orderDateFont'>{date}</span></td>
        <td><span className='orderFontBold'>{order._id}</span></td>
        <td><span className='orderFontThin'>{order.deliveryInfo.name}</span></td>
        <td><span className='orderFontThin'>{order.cartItems.length}</span></td>
        <td><span className='orderFontBold'>{`$${order.total}`}</span></td>
        <td>
          {order.isPaid === true ? 
            <div className='orderStatus'>Paid</div> :
            <div>Not Paid</div>
          }
        </td>
        <td><img src={actionIcon} className='icon'/></td>
        {
          order.isDelivered ? 
            <td><Button variant='outline-primary' disabled className='markDeliveryBtn'>Delivered</Button></td>
            : <td><Button variant='outline-danger' disabled className='markDeliveryBtn'>Pending</Button></td>

        }

      </tr>
    </>
  );
};

OrderTableRow.propTypes = {
  order : PropTypes.any,
  actionIcon : PropTypes.any,
  reRenderFunc: PropTypes.func
};

export default OrderTableRow;