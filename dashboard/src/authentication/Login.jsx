import { useState, useEffect } from 'react';
import './css/Login.css'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import gp from '../assets/images/gujarat-police.png'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import newCaptcha from 'otp-generators'
import { HiOutlineRefresh } from 'react-icons/hi'

const Login = () => {

  const [username, setEmail] = useState("")
  const [password, setPwd] = useState("")
  const [captcha, setCaptcha] = useState("")
  const [check, setCheck] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('access'))
      navigate('/dashboard')
    const c = newCaptcha.generate(6, { alphabets: true, upperCase: true, specialChar: false });
    setCaptcha(c);
    // console.log(c);
  }, []);

  const refresh = () => {
    const c = newCaptcha.generate(6, { alphabets: true, upperCase: true, specialChar: false });
    setCaptcha(c);
  }

  const handleLogin = async () => {
    try {
      const id = toast.loading("Logging In...", {
        theme: "dark",
        closeOnClick: true,
        closeButton: null
      })
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        }),
      });
      const result = await res.json();
      // console.log(result);
      if (res.status === 404)
        toast.update(id, {
          render: "Invalid Email Id",
          type: "error",
          isLoading: false,
          autoClose: 3000
        });
      else if (res.status === 401)
        toast.update(id, {
          render: "Incorrect Password",
          type: "error",
          isLoading: false,
          autoClose: 3000
        });
      else {
        const { role, access, station_id } = result;
        localStorage.setItem("role", role[0]);
        localStorage.setItem("access", access);
        localStorage.setItem("station_id", station_id);
        toast.update(id, {
          isLoading: false,
          render: "Login Successful",
          type: "success",
          autoClose: 1000,
          onClose: () => navigate('/dashboard')
        });
        // navigate('/dashboard');
      }

    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "")
      toast.warning('Enter Email Address', {
        theme: "dark"
      });
    else if (password === "")
      toast.warning('Enter Password', {
        theme: "dark"
      });
    else if (!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+com$/.test(username)) // Can enter any specific username format.
      toast.error('Invalid Email', {
        theme: "dark"
      });
    else
      handleLogin();
  }

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center" style={{ background: '#14195d', height: "100vh" }} fluid>
        <Row className="bg-white w-2/3 py-5 pe-md-5 rounded">
          <Col xs={12} md={6} className='align-self-center'>
            <Image
              src={gp}
              alt="Gujarat Police"
              className="d-block m-auto"
            />
          </Col>
          <Col xs={12} md={6}>
            <h2 className='text-center'>
              Login
            </h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className='mb-3'>
                <Form.Label className='form-label2'>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  value={username}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label className='form-label2'>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPwd(e.target.value)}
                />
              </Form.Group>

              <Form.Group className='mb-2'>
                <span style={{ userSelect: "none" }} className='captcha py-2 px-3'>
                  {captcha}
                </span>
                <Form.Control
                  type="text"
                  value={check}
                  onChange={(e) => setCheck(e.target.value)}
                  className='w-50 d-inline mx-4'
                  onPaste={(e) => { e.preventDefault(); return false; }}
                />
                <HiOutlineRefresh className='d-inline' size={30} onClick={refresh} />
              </Form.Group>

              <Form.Group className='text-end mb-3'>
                <span
                  style={{ color: '#14195d', fontSize: '0.9rem' }}
                  onClick={() => toast.info("Contact Admin to change your Password!", {
                    theme: "dark"
                  })}
                  className='span'
                >Forgot Password?</span>
              </Form.Group>

              <Form.Group>
                <Button disabled={!(check === captcha)} className='btn-sm px-4' type='submit'>Login</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
