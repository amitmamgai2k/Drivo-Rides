
import { Routes, Route } from 'react-router-dom';
import Start from './pages/Start';
import UserSignup from './pages/UserSignup';
import UserLogin from './pages/UserLogin';
import CaptainSignup from './pages/CaptainSignup';
import CaptainLogin from './pages/CaptainLogin';
import Home from './pages/Home';
import UserProtectedWrapper from './pages/UserProtectedWrapper';
import UserLogout from './pages/UserLogout';
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper';
import CaptainHome from './pages/CaptainHome';
import CaptainLogout from './pages/CaptainLogout';
import Riding from './pages/Riding';
import CaptainRiding from './pages/CaptainRiding';
import UserForgotPassword from './pages/UserForgotPassword';
import CaptainForgotPassword from './pages/CaptainForgotPassword';
import OTPPage from './pages/OtpVerification';
import CaptainOtpVerification from './pages/CaptainOtpVerification';
import PrivacyPolicy from './pages/CompanyPolicies/PrivacyPolicy';
import TermsAndConditions from './pages/CompanyPolicies/TermsAndConditions';
import DeleteAccount from './components/UserMenu/DeleteAccount';


const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/Riding" element = {<Riding/>}/>
        <Route path = "/user-forgot-password" element = {<UserForgotPassword/>}/>
        <Route path  = "/verify-otp" element = {<OTPPage/>}/>
        <Route path = "/captain-otp-verify" element = {<CaptainOtpVerification/>}/>
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path = 'captain-forgot-password' element = {<CaptainForgotPassword/>}/>
        <Route path = "/captain-riding" element={<CaptainRiding/>}/>
        <Route path = '/home' element =
         {
         <UserProtectedWrapper>
          <Home/>
         </UserProtectedWrapper>
       } />
       <Route path = '/delete-account' element = {<UserProtectedWrapper><DeleteAccount/></UserProtectedWrapper>} />
       <Route path = '/user-logout' element = {<UserProtectedWrapper><UserLogout/></UserProtectedWrapper>} />
       <Route path = '/captain-home' element = {<CaptainProtectedWrapper><CaptainHome/></CaptainProtectedWrapper>} />
       <Route path = '/captain-logout' element = {<CaptainProtectedWrapper><CaptainLogout/></CaptainProtectedWrapper>} />

      <Route path = '/Drivo-Rides-privacy-policy' element = {<PrivacyPolicy/>} />
      <Route path = '/Drivo-Rides-Terms-and-Conditions' element = {<TermsAndConditions/>} />

      </Routes>

    </div>
  )
}

export default App;
