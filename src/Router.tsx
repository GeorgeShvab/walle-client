import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import Index from './pages/index'
import Registration from './pages/registration/Registration'
import Login from './pages/login/Login'
import Layout from './components/Layout'
import Home from './pages/home/Home'
import RegistrationSuccess from './pages/registration/RegistrationSuccess'
import Verification from './pages/registration/Verification'
import Document from './pages/document/Document'
import NewDocument from './pages/document/NewDocument'

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/registration/success" element={<RegistrationSuccess />} />
      <Route path="/registration/verification" element={<Verification />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/documents/:id"
        element={
          <Layout>
            <Document />
          </Layout>
        }
      />
      <Route
        path="/documents/new"
        element={
          <Layout>
            <NewDocument />
          </Layout>
        }
      />
    </Routes>
  )
}

export default Router
