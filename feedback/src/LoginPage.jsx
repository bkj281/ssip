import { useState } from 'react';
import './LoginPage.css';
import Gujarat_Police_Logo from './assets/Gujarat_Police_Logo_1.png';

function LoginPage() {
  const [verify, setVerify] = useState(false);
  const [phoneNO, setPhoneNo] = useState('');
  const [OTP, setOTP] = useState('');
  const handleChange = (e) => {
    let val = e.target.value;
    if (e.target.name === 'Phone No') {
      // updating state only when value is number and it's length is less than 11
      if (!Number.isNaN(Number(val)) && val.length < 11) {
        setPhoneNo(val);
      }
    } else if (e.target.name === 'OTP') {
      if (!Number.isNaN(Number(val)) && val.length < 7) {
        setOTP(val);
      }
    }
  }
  const handleSubmit = (e) => {
    if (!verify) {
      // check if phone number is correct (validation)
      // send Phone No using API
      setVerify(true);
    } else {
      // send OTP using API
      // If verified by server redirect to Feedback form
      // Else show error of Incorrect OTP
    }
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
        <h1 className='wlcm'>Welcome!</h1>
      </div>
      <div className='div-inp-txt'>
        <span className='inp-lbl-phno'>Phone no</span>
        <input
          type="text"
          name="Phone No"
          className='inp-txt'
          value={phoneNO}
          onChange={handleChange}
          readOnly={verify}
        />
      </div>
      {verify ? <div className='div-inp-txt'>
        <span className='inp-lbl-otp'>OTP</span>
        <input
          type="text"
          name="OTP"
          className='inp-txt'
          value={OTP}
          onChange={handleChange}
        />
      </div>: null}
      <div className='div-inp-txt'>
        <button className='div-inp-sbt' onClick={handleSubmit}>
          {verify ? "Log in": "Verify"}
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
