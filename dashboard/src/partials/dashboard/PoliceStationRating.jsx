import React, { useEffect, useState } from 'react';
import DoughnutChart from '../../charts/DoughnutChart';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function PoliceStationRating({ pid }) {
  const [pname, setPname] = useState('');
  const [ratings, setRatings] = useState({ labels: ['1', '2', '3', '4', '5'], data: [
    0, 0, 0, 0, 0
  ] });

  useEffect(() => {
    if (pid) {
      getData();
    } else {
      alert("No Police Id :(");
    }
  }, []);
  // console.log(ratings);
  const getData = async () => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/feedback/rating-count/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("access")}`
      },
      body: JSON.stringify({ station_id: pid }),
    });
    const result = await res.json();
    // console.log(result);
    let rats = ratings;
    for (let i=0; i<result.length; i++) {
      rats.data[Number(result[i].res4)-1] = Number(result[i].count);
    }
    // console.log(rats);
    setRatings(rats);
    // get data and set state is remaining
    const resP = await fetch(`${import.meta.env.VITE_BASE_URL}/station/get/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify({
        "station_id" : pid,
        // "district": "",
      }),
    });
    // console.log(res);
    const resultP = await resP.json();
    // console.log(resultP);
    // If valid set Pid else redirect to HomePage
    if (resP.status === 200) {
      // alert(resultP.message);
      setPname(resultP.message);
    } else {
      // redirect
      alert('Invalid pid');
    }
  };

  const chartData = {
    labels: ratings.labels,
    datasets: [
      {
        label: 'Top Countries',
        data: ratings.data,
        backgroundColor: [
          tailwindConfig().theme.colors.red[500],
          tailwindConfig().theme.colors.orange[400],
          tailwindConfig().theme.colors.yellow[300],
          tailwindConfig().theme.colors.blue[600],
          tailwindConfig().theme.colors.green[800],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.red[600],
          tailwindConfig().theme.colors.orange[500],
          tailwindConfig().theme.colors.yellow[400],
          tailwindConfig().theme.colors.blue[700],
          tailwindConfig().theme.colors.green[900],
        ],
        hoverBorderColor: tailwindConfig().theme.colors.white,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Ratings of {pname}</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <DoughnutChart data={chartData} width={389} height={260} />
    </div>
  );
}

export default PoliceStationRating;
