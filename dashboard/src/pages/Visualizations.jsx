import React, { useState, useEffect, createRef } from 'react';
import { Button, Container, Col, Row, Form } from 'react-bootstrap';
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
import Pdf from 'react-to-pdf'
import jsPDF from 'jspdf'

function Visualization() {

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [district, setDistrict] = useState("Ahmedabad")
  const [dis, setDis] = useState([])

  const ref = createRef();

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

  const generatePDF = async () => {
    // document.getElementById('hide').style.display = 'none!important';
    document.getElementById('hide').setAttribute('style', 'display:none !important')
    let doc = new jsPDF('landscape', 'px', 'a2');
    await doc.html(document.getElementById('one'), {
      callback: (doc) => {
        doc.save();
      }
    });
    document.getElementById('hide').setAttribute('style', 'display:block !important')
  }

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <Button onClick={generatePDF} style={{ position: 'fixed', bottom: "25px", right: "25px" }}>
          Download Reports
        </Button>

        <main className='mt-5' ref={ref}>
          <Container className='text-center' id="one">
            <Row>
              <Col xs={12} md={6} lg={4}>
                {/* <h4>Overall Ratings</h4> */}
                <HoriBarChart />
              </Col>
              <Col xs={12} md={6} lg={4}>
                <DistrictWise />
              </Col>
            </Row>
            <Form className='mx-auto d-block' id="hide">
              <Row className="my-5 justify-center">
                <Form.Group className="mb-3" as={Col} xs={6} md={3}>
                  <Form.Label>District</Form.Label>
                  <Form.Select name="district" value={district} onChange={(e) => setDistrict(e.target.value)}>
                    {dis.map((d, id) => <option key={id} value={d}>{d}</option>)}
                  </Form.Select>
                </Form.Group>
              </Row>
            </Form>
            <Row id="two">
              <Col xs={12} md={6} lg={4}>
                <BarChart district={district} />
              </Col>
              <Col xs={12} md={6} lg={4}>
                <SubDivAvgRatChart district={district} />
              </Col>
            </Row>
            <Row className='mt-5 text-center' id="three">
              <Col xs={12} md={12} lg={12}>
                <h2>Dynamic Data of Average rating of all Districts</h2>
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