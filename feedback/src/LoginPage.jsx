import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './LoginPage.css';
import Gujarat_Police_Logo from './assets/Gujarat_Police_Logo_1.png';

function LoginPage({ setPid, setOtpid }) {
  let navigate = useNavigate();
  let params = useParams();
  const [verify, setVerify] = useState(false);
  const [phoneNO, setPhoneNo] = useState('');
  const [OTP, setOTP] = useState('');

  useEffect(() => {
    if (params.id) {
      setPid(Number(params.id));
    }
  }, []);
  
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
  
  const handleSubmit = async (e) => {
    if (!verify) {
      // check if phone number is correct (validation)
      if (phoneNO.length != 10) {
        // throw error
        return;
      }
      // send Phone No using API
      const res = await fetch(`https://ssip-project.herokuapp.com/verify/time_based/${phoneNO}/`, {
        method: 'GET',
        headers: {
          'Authorization': 'Token 4e2ffb12ab52213e89eb311e2b65f1fcd081698d',
        },
      });
      const result = await res.json();
      console.log(result);
      setOtpid(Number(result.id));
      // setOtpid(Number(1));
      setVerify(true);
    } else {
      // send OTP using API
      const res = await fetch(`https://ssip-project.herokuapp.com/verify/time_based/${phoneNO}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token 4e2ffb12ab52213e89eb311e2b65f1fcd081698d',
        },
        body: JSON.stringify({ 'otp' : OTP }),
      });
      const result = await res.json();
      console.log(result);
      // let result = 'You are authorised';
      if (result === 'You are authorised') {
        alert(result);
        // render feedback form
        navigate(`/feedback`);
      } else {
        alert (result);
        // throw error
      }
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
          {verify ? "Verify and Submit": "Send OTP"}
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
