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
import ProtectRoute from './components/ProtectRoute'

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route
        path="/registration"
        element={
          <ProtectRoute protectFromAuthorized>
            <Registration />
          </ProtectRoute>
        }
      />
      <Route
        path="/registration/success"
        element={
          <ProtectRoute protectFromAuthorized>
            <RegistrationSuccess />
          </ProtectRoute>
        }
      />
      <Route
        path="/registration/verification"
        element={
          <ProtectRoute protectFromAuthorized>
            <Verification />
          </ProtectRoute>
        }
      />
      <Route
        path="/login"
        element={
          <ProtectRoute protectFromAuthorized>
            <Login />
          </ProtectRoute>
        }
      />
      <Route
        path="/home"
        element={
          <Layout>
            <ProtectRoute>
              <Home />
            </ProtectRoute>
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
            <ProtectRoute>
              <NewDocument />
            </ProtectRoute>
          </Layout>
        }
      />
    </Routes>
  )
}

export default Router
