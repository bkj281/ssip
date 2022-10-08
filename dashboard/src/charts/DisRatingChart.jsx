import { useEffect, useState } from 'react'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement
)

const DisRatingChart = ({ districts }) => {

  const [sub, setSub] = useState([]);
  const [count, setCount] = useState([])

  useEffect(() => {
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/feedback/avg-rating/`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("access")}`,
        },
      });
      const result = await res.json();
      // console.log(result);
      for (let i = 0; i < districts; i++) {
        result.data[districts[i]] += 0;
      }
      console.log(result.data);
      let x = Object.keys(result.data);
      let y = Object.values(result.data);
      // handleCount(y);
      setSub(x);
      // handleSub(x);
      setCount(y);
    })();
  }, []);

  let data = {
    labels: sub,
    datasets: [{
      label: sub,
      data: count,
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  let options = {
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'Subdivison'
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        // beginAtZero: true,
        ticks: {
          stepSize: 1
        },
        title: {
          display: true,
          text: 'Average Ratings',
        },
      },
      x: {
        title: {
          display: true,
          text: 'districts',
        },
      },
    }
  }

  return (
    <>
      <div style={{ height: '336px', margin: '1em' }}>
        <Bar
          data={data}
          options={options}
        />
      </div>
    </>
  );
}

export default DisRatingChart;