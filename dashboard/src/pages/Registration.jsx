import { useState, useEffect, useMemo } from "react";
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'

const Registration = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
    station_id: "",
    station_name: "",
    address: "",
    contact: "",
    pincode: "",
    district: "",
    subdivision: ""
  })

  const [flag, setFlag] = useState(true);

  const [districts, setDistricts] = useState([]);
  const [subdivisions, setSubdivisions] = useState([]);

  useEffect(() => {
    (
      async () => {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/station/districts/get`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const result = await res.json();
        console.log(result);
        if (result.message.length > 0)
          setDistricts(result.message);
      }
    )();
  }, []);

  const [layout, setLayout] = useState({
    color: "#14195d",
    background: "#f1f5f9",
    borderColor: "#14195d"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.pincode.length !== 6)
      toast.warning('Enter Valid PinCode', { theme: "dark" })
    else if (data.contact.length !== 10)
      toast.warning('Enter Valid Contact Number', { theme: "dark" })
    else {
      if (localStorage.getItem("access") === null || localStorage.getItem('access') === undefined) {
        toast.info('Session Expired!\nLogin First!!', { theme: "dark" })
        return navigate('/login');
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("access")}`,
      }

      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/station/add/`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      if (data.email && data.password) {
        const res2 = await fetch(`${import.meta.env.VITE_BASE_URL}/register/`, {
          method: 'POST',
          headers,
          body: JSON.stringify(data),
        });
        const result2 = await res2.json();
        console.log(res2.status, result2)
      }

      const result = await res.json();
      console.log(res.status, result);
      if (res.status === 404)
        toast.info(result.message, { theme: "dark" });
      else {
        toast.success(result.message, { theme: 'dark' });
        setData({
          email: "",
          password: "",
          station_id: "",
          station_name: "",
          address: "",
          contact: "",
          pincode: "",
          district: "",
          subdivision: ""
        })
      }
    }
  }

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "pincode" && value.length > 6)
      return;
    if (name === "contact" && value.length > 10)
      return;
    if (name === "station_id")
      value = value.toUpperCase();
    if (name === "district") {
      console.log(value);
      (async () => {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/station/sub-division/get`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            district: value
          })
        });
        const result = await res.json();
        console.log(result);
        if (result.message.length > 0)
          setSubdivisions(result.message);
      })();
    }

    setData((old) => {
      return {
        ...old,
        [name]: value
      }
    });
  }

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <Container className='mt-3'>
            <Row>
              <Col>
                <h1 className="text-decoration-underline text-center">Register New Station</h1>
                <Form onSubmit={handleSubmit} className='p-5'>
                  <Row className='mb-3'>
                    <Form.Group as={Col}>
                      <Form.Label>Station ID</Form.Label>
                      <Form.Control
                        name="station_id"
                        value={data.station_id}
                        onChange={handleChange}
                        type="text"
                        placeholder="GJxxyy"
                        required
                      />
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label>Station Name</Form.Label>
                      <Form.Control
                        name="station_name"
                        value={data.station_name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Station Name"
                        required
                      />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col}>
                      <Form.Label>Station Officer Email</Form.Label>
                      <Form.Control
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="Enter Station Incharge Email ID"
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Station Officer Password</Form.Label>
                      <Form.Control
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        type="password"
                        placeholder="Password"
                      />
                    </Form.Group>
                  </Row>

                  <Row>
                    <Form.Group as={Col} xs={8} className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        name="address"
                        value={data.address}
                        onChange={handleChange}
                        placeholder="1234 Main Street"
                        required
                      />
                    </Form.Group>
                    <Form.Group as={Col} xs={4}>
                      <Form.Label>PinCode</Form.Label>
                      <Form.Control
                        name="pincode"
                        value={data.pincode}
                        onChange={handleChange}
                        type="number"
                        placeholder="38xxxx"
                        required
                      />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col}>
                      <Form.Label>Station Contact</Form.Label>
                      <Form.Control
                        name="contact"
                        value={data.contact}
                        onChange={handleChange}
                        type="number"
                        placeholder="0797412358"
                        required
                      />
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label>District</Form.Label>
                      <Form.Select name="district" value={data.district} onChange={handleChange} required>
                        <option value="" selected disabled>Select District</option>
                        {districts.map((d, id) => <option key={id} value={d}>{d}</option>)}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label>Sub Division</Form.Label>
                      <Form.Select name="subdivision" value={data.subdivision} onChange={handleChange} required>
                        <option value="" selected disabled>Select SubDivision</option>
                        {subdivisions.map((d, id) => <option key={id} value={d}>{d}</option>)}
                      </Form.Select>
                    </Form.Group>
                  </Row>

                  <Button
                    size="md"
                    onMouseEnter={() => setLayout({
                      color: "#f1f5f9",
                      background: "#14195d",
                      borderColor: "#f1f5f9"
                    })}
                    onMouseLeave={() => setLayout({
                      color: "#14195d",
                      background: "#f1f5f9",
                      borderColor: "#14195d"
                    })}
                    style={layout}
                    className="px-5 float-right w-25 submit-btn"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Registration;