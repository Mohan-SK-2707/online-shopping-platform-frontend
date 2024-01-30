import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bannerImage from '../src/AFB.png';
import Login from './Auth/Login';
import NavigationBar from './Navigationbar/Navbar';
import User from './User/User';

function App() {



  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/*' element={<MainRoutes />} />
      </Routes>
      <ToastContainer />
    </Router>
  );

  function MainRoutes() {
    return (
      <>
        <NavigationBar />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/users' element={<User />} />
        </Routes>
      </>
    );
  }
}

const Home = () => (
  <img src={bannerImage} alt="Banner" style={{ width: '95%', maxHeight: '70vh', height: '70vh', marginTop: '30px' }} />
);

export default App;
