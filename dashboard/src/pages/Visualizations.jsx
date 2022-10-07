import React, { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
// import Rating from '../partials/dashboard/Rating';
// import FeedbackViz from '../partials/dashboard/FeedbackViz';
// import DistrictWise from '../partials/dashboard/DistrictWise';
// import PoliceStationRating from '../partials/dashboard/PoliceStationRating';
import DistrictWise from '../charts/DistrictWise';
import BarChart from '../charts/BarChart';

function Visualization() {

  const [sidebarOpen, setSidebarOpen] = useState(true);

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
            <Row>
              <Col xs={12} md={6} lg={4}>
                <h4>Overall Ratings</h4>
                <DistrictWise />
              </Col>
              <Col xs={12} md={6} lg={4}>
                <BarChart />
              </Col>
            </Row>
          </Container>
        </main>
      </div >
    </div >
  );
}

export default Visualization;