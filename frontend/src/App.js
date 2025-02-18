import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Appointment from './Pages/Appoinment';

const App = () => {
  return (
    <>
      <Toaster /> 
      <Routes>
        <Route path='/' element={<Appointment/>} />
      </Routes>
    </>
  );
}

export default App;
