import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const GetNotification = createAsyncThunk('getNotification', async(data) => {
  const res = await axios({
    method: 'get',
    url: 'http://localhost:4000/notifications/get-notifications',
    params: data
  });

  return res.data;
});

export const ReadNotification = createAsyncThunk('readNotification', async(data) => {
  const res = await axios({
    method: 'post',
    url: 'http://localhost:4000/notifications/read-notification',
    data
  });
  
  return res.data;
});

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notifications: null,
    error: null
  },
  reducers: {},
  extraReducers: {
    //Extra reducers for GetNotification
    [GetNotification.pending]:(state)=>{
      state.error = null;
    },
    [GetNotification.fulfilled]:(state,{payload:{notifications}}) => {
      if (notifications.length) {
        state.error = null;
        state.notifications = notifications;
      } else {
        state.error = 'Cannot Get Notifications Data';
        state.notifications = null;
      }
    },
    [GetNotification.rejected]:(state)=>{
      state.loading = true;
      state.error = null;
    },

    //Extra reducers for ReadNotification
    [ReadNotification.pending]:(state)=>{
      state.error = null;
    },
    [ReadNotification.fulfilled]:(state) => {
      state.error = null;
    },
    [ReadNotification.rejected]:(state)=>{
      state.error = null;
    }
  }
 
});

export const { 
  AddToCart,
  SelectItem,
  UnSelectItem,
  SelectAllItems,
  UpdateItemQty,
  ClearCart,
  RemoveFromCart,
  AddDeliveryInfo,
  AddBillingInfo
} = notificationSlice.actions;

export default notificationSlice.reducer;