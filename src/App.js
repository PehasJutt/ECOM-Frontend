import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/Login/Login';
import SignUp from './components/Signup/Signup';
import Home from './components/Home/Home';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Dashboard from './components/Dashboard/Dashboard';
import Products from './components/Products/Products';
import Orders from './components/Orders/Orders';
import OrderSummary from './components/OrderSummary/OrderSummary';
import Checkout from './components/checkout/checkout';
import PageNotFound from './components/NotFound/NotFound';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const user = useSelector( state => state.user);
  return (
    <BrowserRouter>
      { user.token && user.type === 'admin' ?
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/forgotpassword' element={<ForgotPassword/>} />
          <Route path='/resetpassword' element={<ResetPassword/>} />
          <Route path='/admindashboard' element={<Dashboard/>}/>
          <Route path='/adminproducts' element={<Products/>}/>
          <Route path='/adminorders' element={<Orders/>}/>
          <Route path='/ordersummary' element={<OrderSummary/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes> 
        :  user.token && user.type === 'user' ? 
          <Routes>
            <Route path='/' exact element={<Home/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/forgotpassword' element={<ForgotPassword/>} />
            <Route path='/resetpassword' element={<ResetPassword/>} />
            <Route path='/ordersummary' element={<OrderSummary/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='*' element={<PageNotFound/>}/>
          </Routes> 
          :
          <Routes>
            <Route path='/' exact element={<Home/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/forgotpassword' element={<ForgotPassword/>} />
            <Route path='/resetpassword' element={<ResetPassword/>} />
            <Route path='*' element={<PageNotFound/>}/>
          </Routes> 
      }
    </BrowserRouter>
  );
}

export default App;
