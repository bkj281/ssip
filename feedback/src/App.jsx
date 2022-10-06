import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import FeedbackForm from './FeedBackForm';
import HomePage from './HomePage';
import LastPage from './LastPage';
import LoginPage from './LoginPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [pid, setPid] = useState(null);
  const [otpid, setOtpid] = useState(0);
  const [pname, setPname] = useState('');
  const handlePid = (x) => {
    setPid(x);
  };
  const handleOtpid = (x) => {
    setOtpid(x);
  };
  const handlePname = (x) => {
    setPname(x);
  };

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/feedback' element={<FeedbackForm pid={pid} otpid={otpid} pname={pname} />} />
            <Route path='/submitted' element={<LastPage setOtpid={handleOtpid} />} />
            <Route path='/:id' element={<LoginPage setPid={handlePid} setOtpid={handleOtpid} setPname={handlePname} />} />
            <Route path='*' element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </div>
      <ToastContainer
        autoClose={2000}
        hideProgressBar={true}
      />
    </>
  );
}

export default App;
