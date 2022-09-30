import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import FeedbackForm from './FeedBackForm';
import HomePage from './HomePage';
import LoginPage from './LoginPage';

function App() {
  const [pid, setPid] = useState(0);
  const [otpid, setOtpid] = useState(0);
  const handlePid = (x) => {
    setPid(x);
  };
  const handleOtpid = (x) => {
    setOtpid(x);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/feedback' element={<FeedbackForm pid={pid} otpid={otpid} />} />
          <Route path='/:id' element={<LoginPage setPid={handlePid} setOtpid={handleOtpid} />} />
          <Route path='*' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
