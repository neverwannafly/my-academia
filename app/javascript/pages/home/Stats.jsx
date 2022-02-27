import React from 'react';
import { useSelector } from 'react-redux';

import { Paper } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';

import { lineChartData, pieChartData } from '@app/utils/stats';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

function Stats() {
  const { data, isLoading } = useSelector((state) => state.stats);
  if (Object.keys(data).length === 0 || isLoading) {
    return null;
  }

  return (
    <Paper elevation={10} className="p-10 m-b-10">
      <h3>My Stats 🥳</h3>
      <div className="row space-between">
        <div style={{ width: '75%' }}>
          <Line height={80} options={options} data={lineChartData(data)} />
        </div>
        <div style={{ width: '20%' }}>
          <Pie data={pieChartData(data)} options={options} />
        </div>
      </div>
    </Paper>
  );
}

export default Stats;
