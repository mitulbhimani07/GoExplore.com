import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Airline from '../AllPages/Airline'
import Hotels from '../AllPages/Hotels'
import Car from '../AllPages/Car'
import Contact from '../AllPages/Contact'
import Login from '../AllPages/Login'
import Register from '../AllPages/Register'
export default function BookingRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Airline />} />
            <Route path='/hotels' element={<Hotels />} />
            <Route path='/car' element={<Car />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

        </Routes>
    </div>
  )
}
