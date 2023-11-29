import { React, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { PieChart, Pie, Cell } from 'recharts';

import { GetOrderStats } from '../../../reducers/orders';

import './PieChart.css';

const MyPieChart = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(GetOrderStats());
  },[]);

  const data = [
    { name: 'Group A', value: orders.totalUnits },
    { name: 'Group B', value: orders.totalOrders }
  ];

  const COLORS = ['#5366FF', '#5DDC6B'];

  return (
    <>
      <PieChart width={800} height={292}>
        <Pie
          data={data}
          cx={145}
          cy={145}
          innerRadius={75}
          outerRadius={120}
          dataKey='value'
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
      <div className='PieChartMarkers'>
        <div className='PieChartMarker'>
          <div className='PieChartDot' style={{backgroundColor:'#5366FF'}} />
          <div className='PieChartTag'>{'Total Units'}</div>
        </div>
        <div className='PieChartMarker'>
          <div className='PieChartDot' style={{backgroundColor:'#5DDC6B'}} />
          <div className='PieChartTag'>{'Total Orders'}</div>
        </div>
      </div>
    </>
  );
};

export default MyPieChart;