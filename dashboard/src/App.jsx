import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';

import './charts/ChartjsConfig';

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

// Import Sections
import Sidebar from './partials/Sidebar'
import Header from './partials/Header';

// Import pages
import Login from './authentication/Login';
import Dashboard from './pages/Dashboard';
import QR from './qr-code/QR';

function App() {

  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>

      <div className="flex h-screen overflow-hidden">

        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <Routes>
              <Route exact path='/' element={<Login />} />
              <Route exact path='/login' element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/qr-generator" element={<QR />} />
            </Routes>
          </main>
        </div>
      </div>

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
