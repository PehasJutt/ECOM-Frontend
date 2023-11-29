import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const MyLineChart = (props) => {
  const {data} = props;

  return (
    <LineChart width={675} height={320} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }} >
      <CartesianGrid stroke='#ccc' strokeDasharray='3 3'/>
      <XAxis dataKey='name' />
      <YAxis yAxisId='left'/>
      <YAxis yAxisId='right' orientation='right'/>
      <Line type='monotone' dataKey='totalOrders' stroke='#FF8339' yAxisId='left'/>
      <Line type='monotone' dataKey='totalAmount' stroke='#87C5FF' yAxisId='right'/> {/* Blue */}
      
    </LineChart>
  );
};

MyLineChart.propTypes = { 
  data: PropTypes.object
};

export default MyLineChart;