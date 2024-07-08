import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homee from './pages/Homee';


 

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route   path = "/login" element = {<Login />} />
    <Route   path = "/signup" element = {<Signup />} />
    <Route   path = "/home" element = {<Homee />} />
    
   </Routes>
   </BrowserRouter>
  );
}

export default App