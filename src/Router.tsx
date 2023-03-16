import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import Index from './pages/index'

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
    </Routes>
  )
}

export default Router
