import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Form } from 'react-bootstrap';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
// import Rating from '../partials/dashboard/Rating';
// import FeedbackViz from '../partials/dashboard/FeedbackViz';
// import DistrictWise from '../partials/dashboard/DistrictWise';
// import PoliceStationRating from '../partials/dashboard/PoliceStationRating';
import DistrictWise from '../charts/DistrictWise';
import BarChart from '../charts/BarChart';
import HoriBarChart from '../charts/HoriBarChart';
import SubDivAvgRatChart from '../charts/SubDivAvgRatChart';
import DisRatingChart from '../charts/DisRatingChart';

function Visualization() {

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [district, setDistrict] = useState("Ahmedabad")
  const [dis, setDis] = useState([])

  useEffect(() => {
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/station/districts/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const result = await res.json();
      // console.log(result);
      setDis(result.message);
      // setDistrict(result.message[0]);
    })();
  }, [district]);

  const handleSearch = async () => {

  }

  return (

    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className='mt-5'>
          <Container className='text-center'>
            <Form>
              <Row className="mb-3">
                <Form.Group className="mb-3" as={Col} xs={6} md={3}>
                  <Form.Label>District</Form.Label>
                  <Form.Select name="district" value={district} onChange={(e) => setDistrict(e.target.value)}>
                    {dis.map((d, id) => <option key={id} value={d}>{d}</option>)}
                  </Form.Select>
                </Form.Group>
                {/* <Form.Group as={Col} xs={12} md={9}>
                  <button className="bg-emerald-500 mb-2 hover:bg-emerald-600 text-white font-bold py-1 px-3 mx-2 rounded" onClick={handleSearch}>Filter</button>
                </Form.Group> */}
              </Row>
            </Form>
            <Row>
              <Col xs={12} md={6} lg={4}>
                <h4>Overall Ratings</h4>
                <HoriBarChart />
              </Col>
              <Col xs={12} md={6} lg={4}>
                <BarChart district={district} />
              </Col>
              <Col xs={12} md={6} lg={4}>
                <DistrictWise />
              </Col>
              <Col xs={12} md={6} lg={4}>
                <SubDivAvgRatChart district={district} />
              </Col>
              <Col xs={12} md={12} lg={12}>
                <DisRatingChart />
              </Col>
            </Row>
          </Container>
        </main>
      </div >
    </div >
  );
}

export default Visualization;