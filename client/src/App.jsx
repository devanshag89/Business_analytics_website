// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import MainPage from './components/MainPage'
// import Login from './auth/Login'
// import Signup from './auth/Signup'
// import Dashboard from './dashboard/Dashbord'
// import ProtectedRoute from './contexts/ProtectedRoutes'



// function App() {

//   return (
    
//     <Router>
//       <Routes>
//         <Route path='/' element={<MainPage/>}/>
//         <Route path='/login' element={<Login/>}/>
//         <Route path='/signup' element={<Signup/>}/>
//         <Route element={<ProtectedRoute />}>
//           <Route path="/dashboard" element={<Dashboard />} />
//           {/* Add more protected routes here */}
//         </Route>
//       </Routes>
//     </Router>
  
//   )
// }

// export default App



import FileUpload from './test/FileUpload';
import PaymentButton from './test/PaymentButton';
import InsightsDisplay from './test/InsigtsDisplay';
import { useState } from 'react';

function App() {
  const [filename, setFilename] = useState(null);
  const [insights, setInsights] = useState(null);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">AI Business Analytics</h1>
      <FileUpload setFilename={setFilename} />
      {filename && <PaymentButton filename={filename} setInsights={setInsights} />}
      {insights && <InsightsDisplay insights={insights} />}
    </div>
  );
}

export default App;
