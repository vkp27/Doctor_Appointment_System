import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Login from './Pages/Login'
import Register from './Pages/Register'
import { useSelector } from 'react-redux'
import Spinner from './Components/Spinner'
import ProtectedRoute from './Components/ProtectedRoute'
import PublicRoute from './Components/PublicRoute'
import ApplyDoctor from './Pages/ApplyDoctor'

const App = () => {
  const {loading} = useSelector(state => state.alerts)

  return (
    <BrowserRouter>
      {loading ? <Spinner /> :
        <Routes>
          <Route 
            path='/' 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route 
            path='/apply-doctor' 
            element={
              <ProtectedRoute>
                <ApplyDoctor />
              </ProtectedRoute>
            }
          />
          <Route 
            path='/login' 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path='/register' 
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } 
          />
        </Routes>
      }
    </BrowserRouter>
  )
}

export default App