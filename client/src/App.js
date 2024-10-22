import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './screens/auth/Login';
import OTPVerification from './screens/auth/OTPVerification';
import Register from './screens/auth/Register';
import ResetPassword from './screens/auth/ResetPassword';
import SignUp from './screens/auth/SignUp';
import Home from './screens/user/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/otp-verification' element={<OTPVerification />} />
        <Route path='/create-account' element={<SignUp />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
