import React, { useEffect, useState } from 'react';
import DoughnutChart from '../../charts/DoughnutChart';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DistrictWise({ district }) {

  const [ratings, setRatings] = useState({ labels: [], data: [] });

  useEffect(() => {
    if (district) {
      getData();
    } else {
      alert('District not found');
    }
  }, []);
  
  const getData = async () => {
    // const res = await fetch(`${import.meta.env.VITE_BASE_URL}/station/sub-division/get`, {
    //   method: 'POST',
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ district: district }),
    // });
    // const result = await res.json();
    // console.log(result);
    // let rats = ratings;
    // rats.labels = result.message;
    // console.log(rats);
    // setRatings(rats);
    // get data and set state is remaining
    getFeedbacks();
  };

  const getFeedbacks = async () => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/feedback/sub-count/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify({ district: district, "station_id": "" }),
    });
    const result = await res.json();
    console.log(result);
    let rats = ratings;
    for (let i=0; i<result.length; i++) {
      rats.labels[i] = result[i].subdivision; 
      rats.data[i] = result[i].count; 
    }
    console.log(rats);
    setRatings(rats);
  };

  const chartData = {
    labels: ratings.labels,
    datasets: [
      {
        label: 'Top Countries',
        data: ratings.data,
        backgroundColor: [
          tailwindConfig().theme.colors.indigo[500],
          tailwindConfig().theme.colors.blue[400],
          tailwindConfig().theme.colors.indigo[800],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.indigo[600],
          tailwindConfig().theme.colors.blue[500],
          tailwindConfig().theme.colors.indigo[900],
        ],
        hoverBorderColor: tailwindConfig().theme.colors.white,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">District wise Feedbacks in {district}</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <DoughnutChart data={chartData} width={389} height={260} />
    </div>
  );
}

export default DistrictWise;
