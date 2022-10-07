import React, { useState, useEffect } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import TableCard from '../partials/dashboard/TableCard';
import { toast } from 'react-toastify';


const Dashboard = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const [dis, setDi] = useState([])
  const [district, setDistrict] = useState("")
  const [subdivision, setSubdivision] = useState("")
  const [subdiv, setSub] = useState([])
  const [rating, setRating] = useState("")
  const [station_id, setStationID] = useState("")

  useEffect(() => {
    if (localStorage.getItem("access") === null || localStorage.getItem('access') === undefined) {
      toast.info('Session Expired!\nLogin First!!', { theme: "dark" })
      return navigate('/login');
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("access")}`
    };

    (async () => {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/feedback/filter/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          district,
          subdivision,
          rating,
          station_id
        })
      });
      const result = await res.json();
      // console.log(result);
      setFeedbacks(result)
    })();
  }, []);

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
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

              </div>

              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                onClick={downloadData}
              >
                <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                <span>Download</span>
              </button>

            </div>

            <div className="grid grid-cols-12 gap-6">
              {/* Table (Top Channels) */}
              <TableCard data={feedbacks} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;