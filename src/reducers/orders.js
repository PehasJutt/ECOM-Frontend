import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const GetOrders = createAsyncThunk('getOrders', async(data) => {
  const token = localStorage.getItem('token');
  const res = await axios({
    method: 'post',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`
    },
    url: 'http://localhost:4000/orders/get-orders',
    data
  });

  return res.data;
});

export const GetOrdersById = createAsyncThunk('getOrdersById', async(data) => {
  const token = localStorage.getItem('token');
  const res = await axios({
    method: 'post',
    url: 'http://localhost:4000/orders/search-orders-by-id',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`
    },
    data
  });

  return res.data;
});

export const GetTopSellingProds = createAsyncThunk('getTopSellingProds', async(token) => {
  const res = await axios({
    method: 'post',
    url: 'http://localhost:4000/orders/top-selling-products',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`
    }
  });

  return res.data;
});

export const GetOrderStats = createAsyncThunk('getOrderStats', async() => {
  const token = localStorage.getItem('token');
  const res = await axios({
    method: 'get',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`
    },
    url: 'http://localhost:4000/orders/get-order-stats'
  });

  return res.data;
});

export const GetUserOrders = createAsyncThunk('getUserOrders', async(data) => {
  const res = await axios({
    url: 'http://localhost:4000/orders/get-user-orders',
    method: 'post',
    data
  });

  return res.data;
});

export const GetOrderById = createAsyncThunk('getOrderById', async(data) => {
  const res = await axios({
    url: 'http://localhost:4000/orders/get-order-by-id',
    method: 'post',
    data
  });

  return res.data;
});

export const GetDashboardStats = createAsyncThunk('getDashboardStats', async(token) => {
  const res = await axios({
    method: 'get',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`
    },
    url: 'http://localhost:4000/orders/get-dashboard-stats'
  });

  return res.data;
});

export const GetAnnualStats = createAsyncThunk('getAnnualStats', async(token) => {
  console.log('in annaul axios');
  const res = await axios({
    method: 'get',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`
    },
    url: 'http://localhost:4000/orders/get-annual-stats'
  });

  return res.data;
});

export const MarkAsDelivered = createAsyncThunk('markAsDelivered', async({token, id}) => {
  const data = {id : id};
  const res = await axios({
    method: 'post',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`
    },
    url: 'http://localhost:4000/orders/mark-delivered',
    data
  });

  return res.data;
});


const ordersInitialState = {
  loading: false,
  orders: [],
  userOrder: null,
  userOrders: [],
  error: null,
  topSellProds: [],
  totalOrders: null,
  totalUnits: null,
  totalAmount: null,
  dashboardStats: null,
  annualStats: null,
  deliveryStatus: null
};

export const adminOrderSlice = createSlice({
  name: 'adminOrders',
  initialState: ordersInitialState,
  reducers: {
    ClearUserOrder: (state) => {
      state.userOrder = null;
    }
  },
  extraReducers: {
    //Extra reducers for GetOrders
    [GetOrders.pending]:(state)=>{
      state.loading = true;
      state.error = null;
    },
    [GetOrders.fulfilled]:(state,{payload:{orders}}) => {
      state.loading = false;
      if (orders.length) {
        state.error = null;
        state.orders = orders;
      } else {
        state.error = 'Cannot Get Orders Data';
        state.orders = null;
      }
    },
    [GetOrders.rejected]: (state, action) => {
      state.loading = false;
      if (action.error.message === 'Network Error'){
        state.error = 'Sorry, Server Down Right Now';
      } else {
        state.error = 'Something went wrong';
      }
    },

    //Extra reducers for GetUserOrders
    [GetUserOrders.pending]:(state)=>{
      state.loading = true;
      state.error = null;
    },
    [GetUserOrders.fulfilled]:(state,{payload:{orders}}) => {
      state.loading = false;
      if (orders) {
        state.error = null;
        state.userOrders = orders;
      } else {
        state.error = 'Cannot Get User Orders';
        state.orders = null;
      }
    },
    [GetUserOrders.rejected]: (state, action) => {
      state.loading = false;
      if (action.error.message === 'Network Error'){
        state.error = 'Sorry, Server Down Right Now';
      } else {
        state.error = 'Something went wrong';
      }
    },

    //Extra reducers for GetOrdersById
    [GetOrdersById.pending]:(state)=>{
      state.loading = true;
      state.error = null;
    },
    [GetOrdersById.fulfilled]:(state,{payload:{orders}}) => {
      state.loading = false;
      if (orders) {
        state.error = null;
        state.orders = orders;
      } else {
        state.error = 'Cannot Get Orders By Id';
        state.orders = null;
      }
    },
    [GetOrdersById.rejected]: (state, action) => {
      state.loading = false;
      if (action.error.message === 'Network Error'){
        state.error = 'Sorry, Server Down Right Now';
      } else {
        state.error = 'Something went wrong';
      }
    },

    //Extra reducers for GetOrderById
    [GetOrderById.pending]:(state)=>{
      state.loading = true;
      state.error = null;
    },
    [GetOrderById.fulfilled]:(state,{payload}) => {
      state.loading = false;
      if (payload) {
        state.error = null;
        state.userOrder = payload;
      } else {
        state.error = 'Cannot Get Orders By Id';
        state.orders = null;
      }
    },
    [GetOrderById.rejected]: (state, action) => {
      state.loading = false;
      if (action.error.message === 'Network Error'){
        state.error = 'Sorry, Server Down Right Now';
      } else {
        state.error = 'Something went wrong';
      }
    },


    //Extra reducers for GetTopSellingProds
    [GetTopSellingProds.pending]:(state)=>{
      state.loading = true;
      state.error = null;
    },
    [GetTopSellingProds.fulfilled]:(state, {payload}) => {
      // console.log('rcvd top prods: ', products);
      state.loading = false;
      // if (products.length) {
      state.error = null;
      state.topSellProds = payload.products;
      // } else {
      //   state.error = 'Cannot Get Top Selling Products';
      //   state.topSellProds = null;
      // }
    },
    [GetTopSellingProds.rejected]: (state, action) => {
      state.loading = false;
      if (action.error.message === 'Network Error'){
        state.error = 'Sorry, Server Down Right Now';
      } else {
        state.error = 'Something went wrong';
      }
    },

    //Extra reducers for GetOrderStats
    [GetOrderStats.pending]:(state)=>{
      state.loading = true;
      state.error = null;
    },
    [GetOrderStats.fulfilled]:(state,{payload:{orderStats}}) => {
      state.loading = false;
      if (orderStats) {
        state.error = null;
        state.totalOrders = orderStats.totalOrders;
        state.totalUnits = orderStats.totalUnits;
        state.totalAmount = orderStats.totalAmount;
      } else {
        state.error = 'Cannot Get Orders Stats';
        state.orders = null;
      }
    },
    [GetOrderStats.rejected]: (state, action) => {
      state.loading = false;
      if (action.error.message === 'Network Error'){
        state.error = 'Sorry, Server Down Right Now';
      } else {
        state.error = 'Something went wrong';
      }
    },

    //Extra reducers for GetDashboardStats
    [GetDashboardStats.pending]:(state)=>{
      state.loading = true;
      state.error = null;
    },
    [GetDashboardStats.fulfilled]:(state,{payload:{dashboardStats}}) => {
      state.loading = false;
      if (dashboardStats) {
        state.error = null;
        state.dashboardStats = dashboardStats;
      } else {
        state.error = 'Cannot Get Dashboard Stats';
        state.dashboardStats = null;
      }
    },
    [GetDashboardStats.rejected]: (state, action) => {
      state.loading = false;
      if (action.error.message === 'Network Error'){
        state.error = 'Sorry, Server Down Right Now';
      } else {
        state.error = 'Something went wrong';
      }
    },

    //Extra reducers for GetAnnualStats
    [GetAnnualStats.pending]:(state)=>{
      state.loading = true;
      state.error = null;
    },
    [GetAnnualStats.fulfilled]:(state,{payload:{annualStats}}) => {
      console.log('in annaul fulfiled');
      state.loading = false;
      if (annualStats) {
        state.error = null;
        state.annualStats = annualStats;
      } else {
        state.error = 'Cannot Get Annual Stats';
        state.annualStats = null;
      }
    },
    [GetAnnualStats.rejected]: (state, action) => {
      state.loading = false;
      if (action.error.message === 'Network Error'){
        state.error = 'Sorry, Server Down Right Now';
      } else {
        state.error = 'Something went wrong';
      }
    },

    //Extra reducers for MarkAsDelivered
    [MarkAsDelivered.pending]:(state)=>{
      state.loading = true;
      state.error = null;
    },
    [MarkAsDelivered.fulfilled]:(state,{payload:{deliveryStatus}}) => {
      console.log('in annaul fulfiled');
      state.loading = false;
      if (deliveryStatus) {
        state.error = null;
        state.deliveryStatus = deliveryStatus;
      } else {
        state.error = 'Cannot Set Delivery Stats';
        state.deliveryStatus = false;
      }
    },
    [MarkAsDelivered.rejected]: (state, action) => {
      state.loading = false;
      if (action.error.message === 'Network Error'){
        state.error = 'Sorry, Server Down Right Now';
      } else {
        state.error = 'Something went wrong';
      }
    }

  }
 
});

export const { ClearUserOrder } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;