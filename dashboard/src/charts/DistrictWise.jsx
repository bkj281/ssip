import { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(
  Tooltip,
  ArcElement,
  Legend
)

const DistrictWise = () => {

  const [sub, setSub] = useState([]);
  const [count, setCount] = useState([])

  useEffect(() => {
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/feedback/res2-get/`, {
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
        x.push(i.res2)
        y.push(i.total)
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
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  return (
    <>
      <div style={{ height: '336px', margin: '1em' }}>
        <Doughnut
          data={data}
        />
      </div>
    </>
  );
}

export default DistrictWise;