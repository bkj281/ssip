import React, { useEffect, useState } from 'react';
import DoughnutChart from '../../charts/DoughnutChart';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function FeedbackViz() {

  const [ratings, setRatings] = useState({ labels: [
    "Rajkot",
    "Surat",
    "Bhavnagar",
    "Ahmedabad"
  ], data: [
    355, 130, 235, 420,
  ] });

  useEffect(() => {
    getData();
  }, []);
  
  const getData = async () => {
    // const res = await fetch(`${import.meta.env.VITE_BASE_URL}/feedback/rating-count`, {
    //   method: 'POST',
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ district: "Rajkot" }),
    // });
    // const result = await res.json();
    // console.log(result);
    // get data and set state is remaining
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
        <h2 className="font-semibold text-slate-800">Sub Division wise Feedbacks</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <DoughnutChart data={chartData} width={389} height={260} />
    </div>
  );
}

export default FeedbackViz;
