import React, { useState, useEffect } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import TableCard from '../partials/dashboard/TableCard';
import { toast } from 'react-toastify';
import { Col, Form, Pagination, Row } from 'react-bootstrap'


const Dashboard = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const [dis, setDi] = useState([])
  const [district, setDistrict] = useState("")
  const [subdivision, setSubdivision] = useState("")
  const [subdiv, setSub] = useState([])
  const [rating, setRating] = useState("")
  const [station_id, setStationID] = useState("")
  const [global, setGlobal] = useState([]);
  const [total, setTotal] = useState("")
  const [pg, setPg] = useState(1)
  const [ini, setIni] = useState("")

  useEffect(() => {
    (async () => {
      const res2 = await fetch(`${import.meta.env.VITE_BASE_URL}/station/districts/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const result2 = await res2.json();
      // console.log(result);
      if (result2.message.length >= 0)
        setDi(result2.message);

    })();
    fetchData(1);
  }, []);

  const fetchData = async (pg) => {
    if (localStorage.getItem("access") === null || localStorage.getItem('access') === undefined) {
      toast.info('Session Expired!\nLogin First!!', { theme: "dark" })
      return navigate('/login');
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("access")}`
    };

    const id = toast.loading("Fetching Data...", {
      theme: "dark",
      closeOnClick: true,
      closeButton: null,
      toastId: "duplicate"
    });

    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/feedback/filter/`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        district,
        subdivision,
        rating,
        station_id,
        pg
      })
    });
    const result = await res.json();
    // console.log(result);
    setFeedbacks(result.data)
    setGlobal(result.data);
    setTotal(result.count)
    setIni(result.count)
    toast.update(id, {
      isLoading: false,
      render: "Fetched",
      type: "success",
      autoClose: 1000,
      toastId: id
    });
  }

  const handleChange = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDistrict(value);
    if (name === "district") {
      // console.log(value);
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
        // console.log(result);
        if (result.message.length > 0)
          setSub(result.message);
      })();
    }
  }

  const downloadData = async () => {
    // const headers = {
    //   'Content-Type': 'text/csv',
    //   'Authorization': `Bearer ${localStorage.getItem("access")}`
    // };

    // const res = await fetch(`${import.meta.env.VITE_BASE_URL}/feedback/data/`, {
    //   method: 'GET',
    //   headers
    // });

    // console.log(res);
    // let result = await res.blob()
    // console.log(result);

    window.open(`${import.meta.env.VITE_BASE_URL}/feedback/filter/`, "_blank");

    // fetch(`${import.meta.env.VITE_BASE_URL}/feedback/filter/`, { headers })
    //   .then((response) => response.blob())
    //   .then((blob) => {
    //     let _url = window.URL.createObjectURL(blob);
    //     window.open(_url.slice(5), "_blank").focus(); // window.open + focus
    //   }).catch((err) => {
    //     toast.error('Download Failed!', { theme: "dark" })
    //     console.log(err);
    //   });

  }

  const handleReset = (e) => {
    e.preventDefault();
    setFeedbacks(global)
    setSub([]);
    setSubdivision("");
    setDistrict("");
    setRating("");
    setStationID("")
    setTotal(ini)
  }

  const handleSearch = async (e) => {
    e.preventDefault();

    if (localStorage.getItem("access") === null || localStorage.getItem('access') === undefined) {
      toast.info('Session Expired!\nLogin First!!', { theme: "dark" })
      return navigate('/login');
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("access")}`
    };

    const id = toast.loading("Fetching Data...", {
      theme: "dark",
      closeOnClick: true,
      closeButton: null,
      toastId: "duplicate"
    });

    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/feedback/filter/`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        district,
        subdivision,
        rating,
        station_id: "",
        pg
      })
    });

    const result = await res.json();
    setFeedbacks(result.data);
    setTotal(result.count)
    toast.update(id, {
      isLoading: false,
      render: "Fetched",
      type: "success",
      autoClose: 1000,
      toastId: id
    });
  }

  const handleSearchById = async (e) => {
    e.preventDefault();

    if (localStorage.getItem("access") === null || localStorage.getItem('access') === undefined) {
      toast.info('Session Expired!\nLogin First!!', { theme: "dark" })
      return navigate('/login');
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("access")}`
    };

    const id = toast.loading("Fetching Data...", {
      theme: "dark",
      closeOnClick: true,
      closeButton: null,
      toastId: 'duplicate'
    });

    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/feedback/filter/`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        district: "",
        subdivision: "",
        rating: "",
        station_id,
        pg
      })
    });

    const result = await res.json();
    setFeedbacks(result.data);
    setTotal(result.count)
    toast.update(id, {
      isLoading: false,
      render: "Fetched",
      type: "success",
      autoClose: 1000,
      toastId: id
    });
  }

  let items = [];
  for (let number = 1; number <= Math.ceil(total / 10); number++) {
    items.push(
      <Pagination.Item key={number} active={number === pg} onClick={() => {
        setPg(number); fetchData(number);
      }}>
        {number}
      </Pagination.Item>,
    );
  }

  return (

    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            <div className="mb-8">

              <div className="">
                <Form>
                  <Row className="mb-3">
                    <Form.Group className="mb-3" as={Col} xs={6} md={3}>
                      <Form.Label>District</Form.Label>
                      <Form.Select name="district" value={district} onChange={handleChange}>
                        <option value="" disabled>Select District</option>
                        {dis.map((d, id) => <option key={id} value={d}>{d}</option>)}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" as={Col} xs={6} md={3}>
                      <Form.Label>Sub Division</Form.Label>
                      <Form.Select name="subdivision" value={subdivision} onChange={(e) => setSubdivision(e.target.value)}>
                        <option value="" disabled>Select SubDivision</option>
                        {subdiv.map((d, id) => <option key={id} value={d}>{d}</option>)}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" as={Col} xs={6} md={3}>
                      <Form.Label>Ratings</Form.Label>
                      <Form.Select name="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                        <option value="" disabled>Select Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" as={Col} xs={6} md={3}>
                      <Form.Label>Station ID</Form.Label>
                      <Form.Control
                        type="text"
                        value={station_id}
                        onChange={(e) => setStationID(e.target.value.toUpperCase())}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} xs={12} md={9}>
                      <button className="bg-red-600 mb-2 hover:bg-red-700 text-white font-bold py-1 px-3 mx-2 rounded" onClick={handleReset}>Reset</button>
                      <button className="bg-emerald-500 mb-2 hover:bg-emerald-600 text-white font-bold py-1 px-3 mx-2 rounded" onClick={handleSearch}>Search without Station ID</button>
                      <button className="bg-blue-500 mb-2 hover:bg-blue-600 text-white font-bold py-1 px-3 mx-2 rounded" onClick={handleSearchById}>Search using Station ID</button>
                    </Form.Group>

                    <Col className=''>
                      <button
                        className="bg-gray-300  hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center float-md-end"
                        onClick={downloadData}
                      >
                        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                        <span>Download</span>
                      </button>
                    </Col>
                  </Row>
                </Form>
              </div>

            </div>

            <div className="grid grid-cols-12 gap-6">
              {/* Table (Top Channels) */}
              <TableCard data={feedbacks} />
              <Pagination className='col-span-full mx-auto' size="sm">{items}</Pagination>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;