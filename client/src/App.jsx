import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from './components/MainPage'
import Login from './auth/Login'
import Signup from './auth/Signup'
import Dashboard from './dashboard/Dashbord'
import ProtectedRoute from './contexts/ProtectedRoutes'



function App() {

  return (
    
    <Router>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add more protected routes here */}
        </Route>
      </Routes>
    </Router>
  
  )
}

export default App
