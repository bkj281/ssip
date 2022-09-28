import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './LoginPage.css';
import Gujarat_Police_Logo from './assets/Gujarat_Police_Logo_1.png';

function HomePage() {
  let navigate = useNavigate();
  const [pid, setPid] = useState('');
  
  const handleChange = (e) => {
    let val = e.target.value;
    setPid(val);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/${pid}`);
  };
  
  return (
    <div className='login-flex'>
      <div style={{ flex: '4', display:' block', textAlign: 'center' }}>
        <img
          className='police-logo'
          src={Gujarat_Police_Logo}
          alt='Gujarat Police Logo'
        />
      </div>
      <div style={{ flex: '1', alignSelf: 'flex-start', paddingLeft: '3em', paddingRight: '3em' }}>
        <h1 className='wlcm'>Enter Police Station Number:</h1>
      </div>
      <div className='div-inp-txt'>
        <span className='inp-lbl-phno'>Police ID</span>
        <input
          type="text"
          name="Police ID"
          className='inp-txt'
          value={pid}
          onChange={handleChange}
        />
      </div>
      <div className='div-inp-txt'>
        <button className='div-inp-sbt' onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default HomePage;
