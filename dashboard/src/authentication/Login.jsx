import { useState } from 'react';
import './css/Login.css'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import gp from '../assets/images/gujarat-police.png'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPwd] = useState("")

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username:email,
          password
        }),
      });
      const result = await res.json();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "")
      toast.warning('Enter Email Address', {
        theme: "dark"
      });
    else if (password === "")
      toast.warning('Enter Password', {
        theme: "dark"
      });
    else if (!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+com$/.test(email)) // Can enter any specific email format.
      toast.error('Invalid Email', {
        theme: "dark"
      });
    else
      handleLogin();
  }

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center" style={{ background: '#14195d', height: "100vh" }} fluid>
        <Row className="bg-white w-50 py-5 pe-md-5 rounded">
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
                  value={email}
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
                <Button className='btn-sm px-4' type='submit'>Login</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
