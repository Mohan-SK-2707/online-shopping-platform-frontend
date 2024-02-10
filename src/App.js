import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './dashboard/Navbar';
import Login from './security/Login/Login';
import Signup from './security/Signup/Signup';
import Address from './user/Address';
import UserProfile from './user/UserProfile';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<WelcomePage />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Navbar />} />
          <Route path="/account/profile" element={<UserProfile id={"650046c390fc095ba87e6472"} />} />
          <Route path='/account/address' element={<Address />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
