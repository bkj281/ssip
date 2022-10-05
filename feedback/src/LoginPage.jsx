import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";
import './LoginPage.css';
import Gujarat_Police_Logo from './assets/Gujarat_Police_Logo_1.png';

import { toast } from 'react-toastify';

function LoginPage({ setPid, setOtpid, setPname }) {
  let navigate = useNavigate();
  let params = useParams();
  const [verify, setVerify] = useState(false);
  const [phoneNO, setPhoneNo] = useState('');
  const [OTP, setOTP] = useState('');

  useEffect(() => {
    if (params.id) {
      verifyPId();
    }
  }, []);

  const verifyPId = async () => {
    try {
      // check if police id is valid or not
      const res = await toast.promise(fetch(`${import.meta.env.VITE_DEV_URL}/station/get/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "station_id" : params.id,
        }),
      }), { pending: 'Please Wait...' }, { toastId: 'get_station' } );
      // console.log(res);
      const result = await res.json();
      console.log(result);
      // If valid set Pid else redirect to HomePage
      if (res.status === 200) {
        handleConfirm(result.message);
      } else {
        // redirect
        toast.error(result.message, { toastId: 'invalid_pid' });
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error in verifying!', { toastId: 'error' });
      navigate('/');
    }
  };

  const handleConfirm = async (mssg) => {
    try {
      const result = await confirm(`Are you in Police station ${mssg}`);
      if (!result) {
        toast.info('Please enter Police station ID', { toastId: 'enter_pid' });
        navigate('/');
      } else {
        toast.info('Login with Phone No.', { toastId: 'login_phone' });
        setPid(params.id);
        setPname(mssg);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong :(', { toastId: 'error'});
      navigate('/');
    }
  };
  
  const handleChange = (e) => {
    let val = e.target.value;
    if (e.target.name === 'Phone No') {
      // updating state only when value is number and it's length is less than 11
      if (!Number.isNaN(Number(val)) && val.length < 11) {
        setPhoneNo(val);
      } else {
        toast.warn('Phone No should be of 10 digits!', { toastId: 'validate' });
      }
    } else if (e.target.name === 'OTP') {
      if (!Number.isNaN(Number(val)) && val.length < 7) {
        setOTP(val);
      } else {
        toast.warn('OTP should be of 6 digits!', { toastId: 'validate' });
      }
    }
  }
  
  const handleSubmit = async () => {
    if (!verify) {
      // check if phone number is correct (validation)
      if (phoneNO.length != 10) {
        // throw error
        toast.warn("Invalid Phone Number!", { toastId: 'invalid_phone' });
        return;
      }
      // send Phone No using API
      const res = await toast.promise(fetch(`${import.meta.env.VITE_DEV_URL}/verify/time_based/${phoneNO}/`, {
        method: 'GET',
        // headers: {
        //   'Authorization': 'Token 4e2ffb12ab52213e89eb311e2b65f1fcd081698d',
        // },
      }), { pending: 'Sending OTP...', error: 'Error in sending OTP' }, { toastId: 'send_otp' } );
      const result = await toast.promise(res.json(), { pending: 'Please wait...', error: 'Something went wrong :(' }, { toastId: 'otp_id' });
      console.log(result);
      setOtpid(Number(result.id));
      // setOtpid(Number(1));
      toast.info('OTP sent! Please Enter OTP.', { toastId: 'otp_info'});
      setVerify(true);
    } else {
      // send OTP using API
      const res = await toast.promise(fetch(`${import.meta.env.VITE_DEV_URL}/verify/time_based/${phoneNO}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Token 4e2ffb12ab52213e89eb311e2b65f1fcd081698d',
        },
        body: JSON.stringify({ 'otp' : OTP }),
      }), { pending: 'Verifying OTP...', error: 'Invalid OTP!' }, { toastId: 'verify_otp' });
      const result = await toast.promise(res.json(), { pending: 'Please wait...', error: 'Something went wrong :(' }, { toastId: 'otp_status' });
      console.log(result);
      // let result = 'You are authorised';
      if (result === 'You are authorised') {
        toast.success(result, { toastId: 'authorized' });
        // render feedback form
        navigate(`/feedback`);
      } else {
        // throw error
        toast.error(result[0], { toastId: 'unauthorized' });
      }
    }
  };

  const onEnter = (e) => {
    if(e.keyCode == 13){
      handleSubmit();
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
      <div style={{ flex: '1', alignSelf: 'flex-start', width: '100%' }}>
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
          onKeyDown={onEnter}
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
          onKeyDown={onEnter}
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
