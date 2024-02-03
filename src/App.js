import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './security/Login/Login';
import Signup from './security/Signup/Signup';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
