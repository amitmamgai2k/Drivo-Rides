import { Route, Routes } from 'react-router-dom'
import AdminLogin from './Pages/AdminAuth/AdminLogin'
import AdminDashboard from './Pages/AdminAuth/AdminDashboard'
import RideId from './Pages/SingleIdPages/RideId';
import CaptainId from './Pages/SingleIdPages/CaptainId';
import DeleteCaptain from './Pages/SingleIdPages/DeleteCaptain';

export default function App() {
  return (
    <>
<Routes>
  <Route path = '/admin-auth' element = {<AdminLogin/>} />
  <Route path = '/admin-dashboard' element = {<AdminDashboard/>} />
 <Route path = '/admin-dashboard/rides/:rideId' element = {<RideId/>} />
  <Route path = '/admin-dashboard/captains/:captainId' element = {<CaptainId/>} />
  <Route path  = '/admin-dashboard/captains/delete/:captainId' element = {<DeleteCaptain/>} />
</Routes>
    </>

  )
}