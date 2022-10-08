import { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  Tooltip,
  ArcElement,
  Legend
)

const HoriBarChart = () => {

  const [sub, setSub] = useState([]);
  const [count, setCount] = useState([])

  useEffect(() => {
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/feedback/rating-full/`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("access")}`,
        },
      });
      const result = await res.json();
      console.log(result);
      let x = [];
      let y = [];
      for (let i of result) {
        x.push(i.res4)
        y.push(i.total)
      }
      setCount(y)
      setSub(x)
    })();
  }, []);

  let data = {
    labels: sub,
    datasets: [{
      label: 'Overall Ratings',
      data: count,
      backgroundColor: [
        // 'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        // 'rgba(255, 206, 86, 0.6)',
        // 'rgba(153, 102, 255, 0.6)',
        // 'rgba(255, 159, 64, 0.6)'
      ],
      borderColor: [
        // 'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        // 'rgba(255, 206, 86, 1)',
        // 'rgba(153, 102, 255, 1)',
        // 'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  let options = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'Subdivison'
    },
    scales: {
      y: {
        // beginAtZero: true,
        ticks: {
          stepSize: 1
        },
        title: {
          display: true,
          text: 'Rating',
        },
      },
      x: {
        // beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Ratings',
        },
      }
    }
  };

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

export default HoriBarChart;