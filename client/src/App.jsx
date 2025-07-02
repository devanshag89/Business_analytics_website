import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoute'
import MainPage from './components/MainPage'
import Login from './auth/Login'
import Signup from './auth/Signup'
import Dashbord from './dashboard/Dashbord'



function App() {

  return (
    
    <Router>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard' element={<ProtectedRoute><Dashbord/></ProtectedRoute>}/>
      </Routes>
    </Router>
  
  )
}

export default App
