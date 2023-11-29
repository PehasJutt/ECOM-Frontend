import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notification } from 'antd';

const initialUserState = {
  id: null,
  name:null,
  image: null,
  email: null,
  password: null,
  addresses: null,
  defaultAddress: null,
  rememberMe: false,
  token:null,
  type:null,
  error:null,
  loading: false,
  rejected: null,
  renderError: false
};

const loginUser = createAsyncThunk('login', async(data) => {
  const res = await axios({
    method: 'POST',
    url: 'http://localhost:4000/users/login',
    data
  });

  return res.data;
});

const SignupUser = createAsyncThunk('signup', async(data) => {
  const res = await axios({
    method: 'POST',
    url: 'http://localhost:4000/users/signup',
    data
  });

  return res.data;
});

const forgotPassword = createAsyncThunk('forgotPassword', async(data) => {
  const res = await axios({
    method: 'POST',
    url: 'http://localhost:4000/users/forgot-password',
    data
  });

  return res.data;
});

const ResetPass = createAsyncThunk('reset', async(data) => {
  const { password, token } = data;  
  const res = await axios({
    method: 'POST',
    url: 'http://localhost:4000/users/reset',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`
    },
    data: {password}
  });

  return res.data;
});

const AddUserAddress = createAsyncThunk('addUserAddress', async(data) => {
  const res = await axios({
    method: 'POST',
    url: 'http://localhost:4000/addresses/add-address',
    data
  });

  return res.data;
});

const GetUserAddresses = createAsyncThunk('getUserAddresses', async(data) => {
  const res = await axios({
    method: 'get',
    url: 'http://localhost:4000/addresses/get-user-addresses',
    params: data
  });

  return res.data;
});

const SetDefaultAddress = createAsyncThunk('setDefaultAddress', async(data) => {
  const res = await axios({
    method: 'POST',
    url: 'http://localhost:4000/users/login',
    data
  });

  return res.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.value = initialUserState;
    }, 
    resetError: (state) => {
      state.error = null;
    }
  },
  extraReducers: {
    //extra reducers for loginUser
    [loginUser.pending]:(state)=>{
      state.loading = true;
    },
    [loginUser.fulfilled]:(state,{payload: {user: {_id, name, image, type, email}, token}}) => {
      state.id = _id;
      state.loading = false;
      state.error = null;
      state.token = token;
      state.type = type;
      state.rejected = false;
      state.image = image;
      state.name = name;
      state.email = email;
      localStorage.setItem('id', _id);
      localStorage.setItem('token', token);
      localStorage.setItem('userImage', image);
      localStorage.setItem('userName', name);
      localStorage.setItem('type', type);
    },
    [loginUser.rejected]: (state, action) => {
      if (action.error.message === 'Network Error'){
        state.error = 'Sorry, Server Down Right Now';
      } else {
        state.error = 'Incorrect Credentials';
      }
      state.loading = false;
      state.rejected = true;
      state.renderError = !state.renderError;
    },

    //extra reducers for SignupUser
    [SignupUser.pending]:(state)=>{
      state.loading = true;
    },
    [SignupUser.fulfilled]:(state)=>{
      state.loading = false;
      state.rejected = false;
      state.error = null;
      notification.success({
        message: 'Signup Success',
        description: 'Congratulations for being a part of our family',
        duration: 2
      });
    },
    [SignupUser.rejected]: (state, action) => {
      if (action.error.message === 'Network Error'){
        state.error = 'Sorry, Server Down Right Now';
      } else {
        state.error = 'Email Already Registered';
      }
      state.loading = false;
      state.rejected = true;
      state.renderError = !state.renderError;
    },

    //extra reducers for ForgotPassword
    [forgotPassword.pending]:(state)=>{
      state.loading = true;
    },
    [forgotPassword.fulfilled]:(state)=>{
      state.loading = false;
      state.rejected = false;
      state.error = null;
    },
    [forgotPassword.rejected]: (state, action) => {
      if (action.error.message === 'Network Error'){
        state.error = 'Sorry, Server Down Right Now';
      } else {
        state.error = 'Cannot Confirm Email';
      }
      state.loading = false;
      state.rejected = true;
      state.renderError = !state.renderError;
    },

    //extra reducers for ResetPass
    [ResetPass.pending]:(state)=>{
      state.loading = true;
    },
    [ResetPass.fulfilled]:(state)=>{
      state.loading = false;
      state.rejected = false;
      state.error = null;
    },
    [ResetPass.rejected]: (state, action) => {
      if (action.error.message === 'Network Error'){
        state.error = 'Sorry, Server Down Right Now';
      } else {
        state.error = 'Something Bad Happened';
      }
      state.loading = false;
      state.rejected = true;
      state.renderError = !state.renderError;
    },

    // //extra reducers for AddUserAddress
    [AddUserAddress.pending]:(state)=>{
      state.error = null;
    },
    [AddUserAddress.fulfilled]:(state)=>{
      state.error = null;
    },
    [AddUserAddress.rejected]: (state, action) => {
      if (action.error.message === 'Network Error'){
        state.error = 'Sorry, Server Down Right Now';
      } else {
        state.error = 'Something Bad Happened';
      }
      state.loading = false;
      state.rejected = true;
      state.renderError = !state.renderError;
    },

    //extra reducers for GetDefaultAddress
    [GetUserAddresses.pending]:(state)=>{
      state.error = null;
    },
    [GetUserAddresses.fulfilled]:(state,{payload})=>{
      state.addresses = payload.addressArr;
    },
    [GetUserAddresses.rejected]: (state, action) => {
      if (action.error.message === 'Network Error'){
        state.error = 'Sorry, Server Down Right Now';
      } else {
        state.error = 'Something Bad Happened';
      }
      state.loading = false;
      state.rejected = true;
      state.renderError = !state.renderError;
    },

    //extra reducers for setDefaultAddress
    [SetDefaultAddress.pending]:(state)=>{
      state.error = null;
    },
    [SetDefaultAddress.fulfilled]:(state)=>{
      state.error = null;
    },
    [SetDefaultAddress.rejected]: (state, action) => {
      if (action.error.message === 'Network Error'){
        state.error = 'Sorry, Server Down Right Now';
      } else {
        state.error = 'Something Bad Happened';
      }
      state.loading = false;
      state.rejected = true;
      state.renderError = !state.renderError;
    }
  }
});

export {
  loginUser,
  SignupUser,
  forgotPassword,
  ResetPass,
  AddUserAddress,
  GetUserAddresses,
  SetDefaultAddress
};

export const { logout } = userSlice.actions;

export default userSlice.reducer;