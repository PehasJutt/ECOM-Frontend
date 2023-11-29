import { React, useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import {
  GetTopSellingProds,
  GetAnnualStats,
  GetDashboardStats
} from '../../reducers/orders';
import Layout from '../Layout/Layout';
import DashboardSummary from './DashboardSummary/DashboardSummary';
import MyLineChart from '../SubComponents/Charts/LineChart';
import MyPieChart from '../SubComponents/Charts/PieChart';
import GenericTable from '../SubComponents/Table/gerneric-table/gerneric-table'; 
import {TopSellTableHeader, TopSellTableRows} from './helper';
import './Dashboard.css';

const Dashboard = () => {
  const user = useSelector(state => state.user);
  const adminOrders = useSelector (state => state.orders);
  const userType = user?.type ? user.type : localStorage.getItem('type');
  const userToken = user?.token ? user.token : localStorage.getItem('token');
  const [dashboardStats, setDashboardStats] = useState(adminOrders?.dashboardStats ? adminOrders.dashboardStats : null );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect (() => {
    dispatch(GetDashboardStats(userToken));
    dispatch(GetAnnualStats(userToken));
    dispatch(GetTopSellingProds(userToken));
  }, []);

  useEffect (() => {
    setDashboardStats(adminOrders.dashboardStats);
  }, [adminOrders.dashboardStats]);

  const handleAccessClick = () => {
    navigate('/');
  };

  return (
    <>

      { userType === 'admin' ? 
        <Layout isAdmin={true}>
     
          <h4 className='dashboard_heading'>Dashboard</h4>
          <div className='DashboardSummaryCards' >
            <DashboardSummary
              title={'Today'}
              prods={dashboardStats?.todayStats?.totalProducts ? dashboardStats?.todayStats?.totalProducts : 0}
              units={dashboardStats?.todayStats?.totalUnits ? dashboardStats?.todayStats?.totalUnits : 0}
              orders={dashboardStats?.todayStats?.totalOrders ? dashboardStats?.todayStats?.totalOrders : 0}
              sale={`$${dashboardStats?.todayStats?.totalAmount ? dashboardStats?.todayStats?.totalAmount : 0}`}
            />
            <DashboardSummary
              title={'7 Days'}
              prods={dashboardStats?.sevenDayStats?.totalProducts ? dashboardStats?.sevenDayStats?.totalProducts : 0}
              units={dashboardStats?.sevenDayStats?.totalUnits ? dashboardStats?.sevenDayStats?.totalUnits : 0}
              orders={dashboardStats?.sevenDayStats?.totalOrders ? dashboardStats?.sevenDayStats?.totalOrders : 0}
              sale={`$${dashboardStats?.sevenDayStats?.totalAmount ? dashboardStats?.sevenDayStats?.totalAmount : 0}`}
            />
            <DashboardSummary
              title={'30 Days'}
              prods={dashboardStats?.thirtyDayStats?.totalProducts ? dashboardStats?.thirtyDayStats?.totalProducts : 0}
              units={dashboardStats?.thirtyDayStats?.totalUnits ? dashboardStats?.thirtyDayStats?.totalUnits : 0}
              orders={dashboardStats?.thirtyDayStats?.totalOrders ? dashboardStats?.thirtyDayStats?.totalOrders : 0}
              sale={`$${dashboardStats?.thirtyDayStats?.totalAmount ? dashboardStats?.thirtyDayStats?.totalAmount : 0}`}
            />
          </div>

          <div className='DashboardChartWrapper'>
            <div className='PieChart'>
              <h6 className='ChartHeader'>Orders Overview</h6>
              <div className='Chart'>
                <MyPieChart />
              </div>
            </div>
            <div className='LineChart'>
              <h6 className='ChartHeader'>Sales & Orders Report</h6>
              <div className='Chart'>
                <MyLineChart data = {adminOrders.annualStats}/>
              </div>
            </div>
          </div>

          <div className='DashboardTableWrapper'>
            <h6 className='DashboardTableHeading'>Top Selling Products</h6>
            <GenericTable 
              header={TopSellTableHeader} 
              rowsData={TopSellTableRows(adminOrders.topSellProds)} 
              rowDataColor={'#495057'}/>
          </div>
        
      
        </Layout>
        : <div className='DeniedMsg'>
          <h1>Access Denied</h1>
          <Button className='DeniedBtn' onClick={handleAccessClick}>Click to go Home</Button>
        </div>
      }
    </>
  );
  
};

export default Dashboard;