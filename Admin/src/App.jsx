import { Route, Routes } from 'react-router-dom'
import AdminAuth from './Pages/AdminAuth/AdminLogin'
export default function App() {
  return (
    <>
<Routes>
  <Route path = '/admin-auth' element = {<AdminAuth/>} />
</Routes>
    </>

  )
}