import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './charts/ChartjsConfig';

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

// Import pages
import Login from './authentication/Login';
import Dashboard from './pages/Dashboard';
import QR from './qr-code/QR';
import Registration from './pages/Registration';
import Visualization from './pages/Visualizations';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/login' element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/qr-generator" element={<QR />} />
        <Route path='/dashboard/register-station' element={<Registration />} />
        <Route path='/dashboard/visuals' element={<Visualization />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ fontSize: '0.9rem' }}
      />
    </>
  );
}

export default App;
