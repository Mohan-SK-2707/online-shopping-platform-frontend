import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './security/Login/Login';
import Signup from './security/Signup/Signup';
import WelcomePage from './landing/WelcomePage';
import Dashboard from './dashboard/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
