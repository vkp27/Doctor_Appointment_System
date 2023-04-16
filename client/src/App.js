import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Login from './Pages/Login'
import Register from './Pages/Register'
import { useSelector } from 'react-redux'
import Spinner from './Components/Spinner'
import ProtectedRoute from './Components/ProtectedRoute'
import PublicRoute from './Components/PublicRoute'
import ApplyDoctor from './Pages/ApplyDoctor'
import NotificationPage from './Pages/NotificationPage'
import Doctors from './Pages/Admin/Doctors'
import Users from './Pages/Admin/Users'
import Profile from './Pages/Doctor/Profile'
import BookinPage from './Pages/BookinPage'
import Appointments from './Pages/Appointments'
import DoctorAppointments from './Pages/Doctor/DoctorAppointments'

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
            path='/admin/doctors' 
            element={
              <ProtectedRoute>
                <Doctors />
              </ProtectedRoute>
            }
          />
          <Route 
            path='/admin/users' 
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route 
            path='/doctor/profile/:id' 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route 
            path='/doctor/book-appointment/:doctorId' 
            element={
              <ProtectedRoute>
                <BookinPage />
              </ProtectedRoute>
            }
          />
          <Route 
            path='/notification' 
            element={
              <ProtectedRoute>
                <NotificationPage />
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
          <Route 
            path='/appointments' 
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/doctor-appointments' 
            element={
              <ProtectedRoute>
                <DoctorAppointments />
              </ProtectedRoute>
            } 
          />
        </Routes>
      }
    </BrowserRouter>
  )
}

export default App