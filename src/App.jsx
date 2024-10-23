import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import DashboardPage from './Pages/DashboardPage/DashboardPage';
import Mytasks from './Pages/Mytasks/Mytasks';
import ProfileUpdate from './Pages/ProfileUpdate/ProfileUpdate';
import LoginUsers from './Pages/LoginUsers/LoginUsers';


function App() {


  return (
    <>

      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/registerpage' element={<RegisterPage />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/dashboardpage' element={<DashboardPage />} />
        <Route path='/dashboardpage/profileupdate' element={<ProfileUpdate />} />
        <Route path='/dashboardpage/mytasks' element={<Mytasks />} />
        <Route path='/dashboardpage/allusers' element={<LoginUsers />} />



      </Routes>

    </>
  )
}

export default App
