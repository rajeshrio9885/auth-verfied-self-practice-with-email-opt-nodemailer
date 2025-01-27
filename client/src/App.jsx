import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signpage from './pages/Signpage'
import FloatingBall from './component/FloatingBall'
import {ToastContainer} from "react-toastify"
import VerifyOpt from './pages/VerifyOpt'
import Home from './pages/Home'
const App = () => {
  return (
    <div className='min-w-screen relative bg-gradient-to-br from-gray-900 flex items-center justify-center overflow-hidden via-green-900 to-emerald-900 min-h-screen'>
      <ToastContainer/>
      <FloatingBall id="ball" color="bg-green-500" size="w-[150px] h-[150px]" opacity="0.5" top="10%" left="10%" delay={0} />
      <FloatingBall color="bg-emerald-500" size="w-[90px] h-[90px]" opacity="0.6" top="70%" left="80%" delay={5} />
      <FloatingBall color="bg-lime-500" size="w-[100px] h-[100px]" opacity="0.5" top="40%" left="50%" delay={2} />
      <Routes>
        <Route path='/signin' element={<Signpage />} />
        <Route path='/otp' element={<VerifyOpt />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>

  )
}

export default App