import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './screens/user/Home';
import UserProfile from './screens/busOperator/profile/UserProfile';
import ManageBus from './screens/busOperator/busManagement/ManageBus';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />

        {/* Bus Operator */}
        <Route path='/bo/user-profile' element={<UserProfile />} />
        <Route path='/bo/bus' element={<ManageBus />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
