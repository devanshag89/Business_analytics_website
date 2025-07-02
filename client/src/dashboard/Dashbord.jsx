import React from 'react'
import { useAuth } from '../contexts/authContext'
function Dashbord() {

const {user} = useAuth();
  return (
    <div>
        <h1>{user.firstName}</h1>
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashbord
