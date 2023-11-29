import React, { useEffect, useState } from 'react';
import {  Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import {
  GetOrderStats,
  GetOrders,
  GetOrdersById
} from '../../reducers/orders';
import Layout from '../Layout/Layout';
import OrderTableRow from '../SubComponents/Table/OrderTable/OrderTableRow';
import SearchBar from '../SubComponents/SearchBar/SearchBar';
import doubleArrow from '../../assets/arrow_up_down.svg';
import arrowUpRight from '../../assets/arrow-up-right.svg';
import './Orders.css';

function Orders() {
  const user = useSelector(state => state.user);
  const userType = user?.type ? user.type : localStorage.getItem('type');
  const adminOrders = useSelector(state => state.orders);
  const [searchId, setSearchId] = useState('');
  const [offset, setOffset] = useState(1);
  const [currPage, setCurrPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(GetOrderStats());
    dispatch(GetOrders({
      skip: (currPage - 1 ) * 10 ,
      limit: 10
    }));
  }, []);

  useEffect( () => {
    if (searchId.length > 0) {
      dispatch(GetOrdersById({orderId: searchId}));
    } else {
      dispatch(GetOrders({
        skip: (currPage - 1 ) * 10 ,
        limit: 10
      }));
    }
  }, [searchId, refresh]);

  const handlePrevClick = () => {
    if (offset > 1) {
      setOffset(offset - 1);
    }
  };
  const handlePgBtnClick = (num) => {
    setCurrPage(num);
    dispatch(GetOrders({
      skip: (num - 1) * 10 ,
      limit: 10
    }));

  };

  const handleNextClick = () => {
    if (offset + 2 < adminOrders.totalOrders / 10) {
      setOffset(offset + 1);
    }
  };

  const handleAccessClick = () => {
    navigate('/');
  };

  return (
    <div>
      { userType === 'admin' ? 
        <Layout isAdmin={true}>
          <div className='orderSummaryWrapper'>
            <div className='orderSummary'>
              <div className='orderSummaryTitle'>Total Orders</div>
              <h4 className='orderSummaryData'>{adminOrders.totalOrders}</h4>
            </div>

            <div className='orderSummary'>
              <div className='orderSummaryTitle'>Total Units</div>
              <h4 className='orderSummaryData'>{adminOrders.totalUnits}</h4>
            </div>
            <div className='orderSummary'>
              <div className='orderSummaryTitle'>Total Amount</div>
              <h4 className='orderSummaryData'>{`$${adminOrders.totalAmount}`}</h4>
            </div>
          </div>

          <div className='orderHeader'>
            <h4 className='orderHeading'>Orders</h4>
            <div className='searchMod'>
              <SearchBar
                width={'260px'}
                placeholder={'Search by ID'}
                onSearchChange={setSearchId}/>
            </div>
          </div>

          <div className='orderTable'>

            <Table>
              <thead>
                <tr>

                  <th>
                    <span>Date </span> 
                    <img src={doubleArrow} className='headerIcon' />
                  </th>

                  <th>Order #</th>

                  <th>
                    <span>User </span> 
                    <img src={doubleArrow} className='headerIcon' />
                  </th>

                  <th>
                    <span>Product(s) </span> 
                    <img src={doubleArrow} className='headerIcon' />
                  </th>

                  <th>
                    <span>Amount </span> 
                    <img src={doubleArrow} className='headerIcon' />
                  </th>

                  <th>
                    <span>Status</span> 
                  </th>

                  <th colSpan={2}>Action</th>

                </tr>
              </thead>

              <tbody>
                {!adminOrders.error ? adminOrders.orders.map((order, key)=>(
                  <OrderTableRow 
                    key={key}
                    order = {order}
                    actionIcon = {arrowUpRight}
                    reRenderFunc={() => setRefresh(!refresh)}/>
                ))
                  : <span>{adminOrders.error}</span> }
              </tbody>
            </Table>

            <div className='pages'>
              {adminOrders.totalOrders > 30 && <div className='pagebtn' onClick={handlePrevClick}>
                <span>Prev</span>
              </div>}
              {adminOrders.totalOrders > 10 && <div className='pagebtn' onClick={()=>handlePgBtnClick(offset)}>
                <span>{offset}</span>
              </div>}
              {adminOrders.totalOrders > 10 && <div className='pagebtn' onClick={()=>handlePgBtnClick(offset + 1)}>
                <span>{offset + 1}</span>
              </div>}
              {adminOrders.totalOrders > 20 && <div className='pagebtn' onClick={()=>handlePgBtnClick(offset + 2)}>
                <span>{offset + 2}</span>
              </div>}
              {adminOrders.totalOrders > 30 && <div className='pagebtn' onClick={handleNextClick}>
                <span>Next</span>
              </div>}
            </div>

          </div>

        </Layout>
        : <div className='DeniedMsg'>
          <h1>Access Denied</h1>
          <Button className='DeniedBtn' onClick={handleAccessClick}>Click to go Home</Button>
        </div>
      }
    </div>

  );
}

export default Orders;