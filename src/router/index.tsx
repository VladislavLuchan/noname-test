import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import { UserAuthContextProvider, useUserAuth } from './UserAuthContext';
import { ROUTES } from './routes';
import ProtectedRoute from './ProtectedRoute';
import Header from '../components/Header/Header';
import Messenger from '../components/Messenger';

const Router = () => {
  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<Login />} path={ROUTES.LOGIN}></Route>
          <Route element={<Register />} path={ROUTES.REGISTER}></Route>
          <Route element={<ProtectedRoute><Messenger /></ProtectedRoute>} path={ROUTES.CHAT} index></Route>
        </Routes>
      </BrowserRouter>
  )
}

export default Router
