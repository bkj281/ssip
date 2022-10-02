import { useState } from 'react';
import './css/Login.css'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import gp from '../assets/images/gujarat-police.png'
import { toast } from 'react-toastify'

const Login = () => {

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPwd] = useState("")

  const handleLogin = async () => {
    try {

    } catch (e) {
      console.log(e);
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
    else if (!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email)) // Can enter any specific email format.
      toast.error('Invalid Email', {
        theme: "dark"
      });
    else
      handleLogin();
  }

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center" style={{ background: '#14195d', height: "100vh" }} fluid>
        <Row className="bg-white w-50 py-5 pe-5 rounded">
          <Col xs={12} md={6}>
            <Image
              src={gp}
              alt="Gujarat Police"
              className="d-block m-auto"
            />
          </Col>
          <Col xs={12} md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className='mb-3'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPwd(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='text-end mb-3'>
                <span style={{ color: '#14195d', fontSize: '0.9rem' }}>Forgot Password?</span>
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
