import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import HomePage from './Page/Home/HomePage';
import ContactPage from './Page/Contact/ContactPage';
import AdminPage from './Page/Admin/AdminPage';
import AdminSignInPage from './Page/Admin/AdminSignInPage';

const RouteList = () => {
  return (
    <div className="page-container">
      <Routes>
        <Route path='/' element={<HomePage />} exact />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/signin' element={<AdminSignInPage />} />
        <Route exact path='/admin' element={<PrivateRoute/>}>
          <Route exact path='/admin' element={<AdminPage/>}/>
        </Route>
      </Routes>
    </div>
  );
};

export default RouteList;