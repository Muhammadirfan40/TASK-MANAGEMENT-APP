import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import DashboardPage from './Pages/DashboardPage/DashboardPage';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import UserDashboard from './Pages/UserDashboard/UserDashboard';


function App() {


  return (
    <>

      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/registerpage' element={<RegisterPage />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/dashboardpage' element={<DashboardPage />} />
        <Route path='/admindashboard' element={<AdminDashboard />} />
        <Route path='/userdashboard' element={<UserDashboard />} />

      </Routes>

    </>
  )
}

export default App
