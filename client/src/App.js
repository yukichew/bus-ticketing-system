import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import UserProfile from './screens/busOperator/profile/UserProfile';
import Home from './screens/user/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* Bus Operator */}
        <Route path='/bo/user-profile' element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
