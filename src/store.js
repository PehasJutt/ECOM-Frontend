import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import  userReducer from './reducers/user';
import prodReducer from './reducers/product';
import cartSlice from './reducers/cart';
import orderSlice from './reducers/orders';
import notificationSlice from './reducers/notifications';

const reducers = combineReducers({
  user: userReducer,
  products: prodReducer,
  cart: cartSlice,
  orders: orderSlice,
  notifications: notificationSlice
});

const rootReducer = (state, action) => {
  if (action.type === 'user/logout') {
    state.cart = undefined;
    state.user = undefined;
  }
  return reducers(state, action);
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'cart']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  devTools: true
});

export default store;