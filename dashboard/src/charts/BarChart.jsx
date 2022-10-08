import { useEffect, useState } from 'react'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement
)

const BarChart = ({ district }) => {

  const [sub, setSub] = useState([]);
  const [count, setCount] = useState([])

  useEffect(() => {
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/feedback/sub-count/`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("access")}`,
        },
        body: JSON.stringify({ district, station_id: "" }),
      });
      const result = await res.json();
      console.log(result);
      let x = [];
      let y = [];
      for (let i of result) {
        x.push(i.subdivision)
        y.push(i.count)
      }
      handleCount(y);
      handleSub(x);
    })();
  }, [district]);

  const handleSub = (x) => {
    setSub(x);
  };
  const handleCount = (x) => {
    setCount(x);
  };

  let data = {
    labels: sub,
    datasets: [{
      label: [],
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
    plugins: {
      legend: {
        display: false
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
          text: 'Number of Feedbacks',
        },
      },
      x: {
        title: {
          display: true,
          text: district,
        },
      },
    }
  }

  return (
    <>
      <div style={{ height: '386px', margin: '1em' }}>
        <Bar
          data={data}
          options={options}
        />
      </div>
    </>
  );
}

export default BarChart;