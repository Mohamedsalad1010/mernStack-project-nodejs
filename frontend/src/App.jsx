import './App.css'
import { Routes , Route, Navigate } from 'react-router'


import LoginPage from './pages/auth/loginPage'
import RegisterPage from './pages/auth/registerPage'
import Dashboard from './pages/auth/dashboard/Dashboard'
import ProtectRout from './components/auth/protectRout'
import AdminProtectedRoute from './components/auth/AdminProtectedRoute'
import Admin from './pages/auth/dashboard/Admin'
function App() {

 
  return (

 <>
  <Routes>
<Route path='/login'  element={ <LoginPage/>}/>
<Route path='/register'  element={ <RegisterPage/>}/>
{/* todo protect */}
<Route path='/dashboard' element={ <ProtectRout> <Dashboard/></ProtectRout> }/>

<Route path='/admin' element={ <AdminProtectedRoute> <Admin/></AdminProtectedRoute> }/>

 <Route path='/' element={<Navigate to="/login" replace />} />

  </Routes></>
  

  )
}

export default App
