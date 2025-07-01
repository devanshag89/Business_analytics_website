import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from './components/MainPage'
import Login from './auth/Login'
import Signup from './auth/Signup'



function App() {

  return (
    
    <Router>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </Router>
  
  )
}

export default App
