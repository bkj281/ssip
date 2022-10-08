import { useEffect, useState } from 'react'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement
)

const BarChart = () => {

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
        body: JSON.stringify({ district: 'Ahmedabad', station_id: "" }),
      });
      const result = await res.json();
      console.log(result);
      let x = [];
      let y = [];
      for (let i of result) {
        x.push(i.subdivision)
        y.push(i.count)
      }
      setCount(y)
      setSub(x)
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
    scales: {
      y: {
        // beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  }

  return (
    <>
      <Bar
        data={data}
        options={options}
      />
    </>
  );
}

export default BarChart;