import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import Index from './pages/index'
import Registration from './pages/registration/Registration'
import Login from './pages/login/Login'

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default Router
