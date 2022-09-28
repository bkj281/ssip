import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import FeedbackForm from './FeedBackForm';
import HomePage from './HomePage';
import LoginPage from './LoginPage';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/feedback/:id' element={<FeedbackForm />} />
          <Route path='/:id' element={<LoginPage />} />
          <Route path='*' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
