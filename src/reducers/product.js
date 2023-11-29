import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialUserState = {
  data: [],
  prodDetail: null,
  total: null,
  netCount: null,
  error:null,
  loading: false,
  rejected: null,
  CUDres: null,
  bulkUploadResult: null
};

export const fetchProducts = createAsyncThunk('fetchProducts', async(data) => {
  const res = await axios({
    method: 'post',
    url: 'http://localhost:4000/products/get-products',
    data
  });

  return res.data;
});

export const addBulkProducts = createAsyncThunk('addBulkProducts', async(data) => {
  const token = localStorage.getItem('token');
  const res = await axios({
    method: 'post',
    url: 'http://localhost:4000/products/add-bulk-products',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`
    },
    data
  });

  return res.data;
});

export const productDetails = createAsyncThunk('productDetails', async(data) => {
  const res = await axios({
    method: 'post',
    url: 'http://localhost:4000/products/get-product-details',
    data
  });

  return res.data;
});

export const getSharedProduct = createAsyncThunk('getSharedProduct', async(data) => {
  const res = await axios({
    method: 'get',
    url: 'http://localhost:4000/products/get-shared-product',
    params: data
  });

  return res.data;
});

export const addProduct = createAsyncThunk('addProduct', async(reqData) => {
  const {token, formData} = reqData;
  const res = await axios.post('http://localhost:4000/products/add-product', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${token}`
    }
  });

  return res.data;
});

export const delPrevProdImgs = createAsyncThunk('delPrevProdImgs', async(data) => {
  console.log(data);
  const token = localStorage.getItem('token');
  const res = await axios({
    method: 'post',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`
    },
    url: 'http://localhost:4000/products/delete-product-images',
    data
  });

  return res.data;
});

export const deleteProduct = createAsyncThunk('deleteProduct', async(reqData) => {
  const {token, id} = reqData;
  const data = {prodId: id};
  console.log(token, data);
  const res = await axios({
    method: 'post',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`
    },
    url: 'http://localhost:4000/products/delete-product',
    data
  });

  return res.data;
});

export const updateProduct = createAsyncThunk('updateProduct', async(payload) => {
  const {token, formData} = payload;
  console.log('sendingData: ',formData );
  const res = await axios.patch('http://localhost:4000/products/update-product', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    }
  });

  return res.data;
});

export const productSlice = createSlice({
  name: 'Products',
  initialState: initialUserState,
  reducers: {},
  extraReducers: {
    // Extra Reducers for fetchProducts
    [fetchProducts.pending]:(state)=>{
      state.loading = true;
      state.CUDres = null;
      state.error = null;
    },
    [fetchProducts.fulfilled]:(state,{payload:{products,total,netCount}}) => {
      state.netCount = netCount;
      state.loading = false;
      state.CUDres = null;
      state.total = total;
      if (products) {
        state.error = null;
        state.data = products;
        state.rejected = false;
      } else {
        state.error = 'error';
        state.data = null;
        state.rejected = true;
      }
    },
    [fetchProducts.rejected]: (state) => {
      state.loading = false;
      state.rejected = true;
      state.CUDres = null;
    },

    // Extra Reducers for productDetails
    [productDetails.pending]:(state)=>{
      state.prodDetail = null;
      state.CUDres = null;
      state.error = null;
    },
    [productDetails.fulfilled]:(state,action) => {
      state.prodDetail = action.payload;
    },
    [productDetails.rejected]: (state) => {
      state.prodDetail = null;
    },

    // Extra Reducers for addBulkProducts
    [addBulkProducts.pending]:(state)=>{
      state.error = null;
      state.bulkUploadResult = null;
      state.CUDres = null;
    },
    [addBulkProducts.fulfilled]:(state,action) => {
      state.bulkUploadResult = action.payload.bulkUploadResult;
    },
    [addBulkProducts.rejected]: (state) => {
      state.bulkUploadResult = null;
    },

    // Extra Reducers for addProducts
    [addProduct.pending]:(state)=>{
      state.CUDres = null;
      state.error = null;
    },
    [addProduct.fulfilled]:(state,action) => {
      state.CUDres = action.payload;
    },
    [addProduct.rejected]: (state) => {
      state.CUDres = null;
    },

    // Extra Reducers for delPrevProdImgs
    [delPrevProdImgs.pending]:(state)=>{
      state.CUDres = null;
      state.error = null;
    },
    [delPrevProdImgs.fulfilled]:(state) => {
      state.CUDres = null;
      state.error = null;
    },
    [delPrevProdImgs.rejected]: (state) => {
      state.CUDres = null;
      state.error = 'err';
    },

    // Extra Reducers for deleteProducts
    [deleteProduct.pending]:(state)=>{
      state.CUDres = null;
      state.error = null;
    },
    [deleteProduct.fulfilled]:(state,action) => {
      state.CUDres = action.payload;
    },
    [deleteProduct.rejected]: (state) => {
      state.CUDres = null;
    },

    // Extra Reducers for updateProducts
    [updateProduct.pending]:(state)=>{
      state.CUDres = null;
      state.error = null;
    },
    [updateProduct.fulfilled]:(state,action) => {
      state.CUDres = action.payload;
    },
    [updateProduct.rejected]: (state) => {
      state.CUDres = null;
    },

    // Extra Reducers for getSharedProduct
    [getSharedProduct.pending]:(state)=>{
      state.loading = true;
      state.rejected = false;
      state.error = null;
      state.CUDres = null;
    },
    [getSharedProduct.fulfilled]:(state,{payload:{products,total}}) => {
      state.loading = false;
      state.CUDres = null;
      state.total = total;
      if (products) {
        state.rejected = false;
        state.error = null;
        state.data = products;
      } else {
        state.error = 'error';
        state.data = null;
        state.rejected = true;
      }
    },
    [getSharedProduct.rejected]: (state) => {
      state.loading = false;
      state.rejected = true;
      state.CUDres = null;
    }
  }
});

export default productSlice.reducer;