import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ChangePassword from './pages/ChangePassword';
import SignOut from './components/SignOut';
import Home from './pages/home';
import Detail from './pages/detail';
import Checkout from './components/Checkout';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
	<Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
	<Route path="/change-password" element={<ChangePassword />} />
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/:slug' element={<Detail />} />
	  <Route path="/checkout" element={<Checkout />} />
        </Route>
	<Route path="/signout" element={<SignOut />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
