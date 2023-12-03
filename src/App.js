import './App.css';
import './component/User/UserTable.css';
import './component/NavBar/NavBar.css';
import './component/Excel/ExcelTable.css';
import './component/Orders/Orders.css';
import './component/Security/Login.css';
import 'semantic-ui-css/semantic.min.css'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NavBar from './component/NavBar/NavBar';
import Login from './component/Security/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<NavBar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;