import { useAuth } from '../contexts/authContext'

function Dashbord() {

  const { logout }  = useAuth();

const {user} = useAuth();
  return (
    <div>
      <h1>{user.firstName}</h1>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Dashbord
