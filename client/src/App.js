import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './screens/user/Home';
import UserProfile from './screens/busOperator/profile/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* Auth */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/otp-verification' element={<OTPVerification />} />
        <Route path='/create-account' element={<SignUp />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        {/* Bus Operator */}
        <Route path='/bo/user-profile' element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
