import { Route, Routes } from 'react-router-dom'
import AdminLogin from './Pages/AdminAuth/AdminLogin'
import AdminDashboard from './Pages/AdminAuth/AdminDashboard'
import RideId from './Pages/RideTablePages/RideId'
export default function App() {
  return (
    <>
<Routes>
  <Route path = '/admin-auth' element = {<AdminLogin/>} />
  <Route path = '/admin-dashboard' element = {<AdminDashboard/>} />
 <Route path = '/admin-dashboard/rides/:rideId' element = {<RideId/>} />
</Routes>
    </>

  )
}