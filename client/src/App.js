import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import OTPVerification from './screens/OTPVerification';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/register/otp-verification' element={<OTPVerification />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
