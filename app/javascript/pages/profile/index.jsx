import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

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
import { loadStats } from '@app/store/stats';
import useMediaQuery from '@app/hooks/useMediaQuery';

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

function Profile() {
  const { data, isLoading } = useSelector((state) => state.stats);
  const { username } = useSelector((state) => state.user);
  const { data: { id } } = useSelector((state) => state.classroom);
  const isTablet = useMediaQuery(useMediaQuery.QUERIES.tablet);
  const lineWidth = useMemo(() => (isTablet ? '100%' : '75%'), [isTablet]);
  const lineHeight = useMemo(() => (isTablet ? 160 : 80), [isTablet]);
  const pieWidth = useMemo(() => (isTablet ? '70%' : '20%'), [isTablet]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadStats(id));
  }, [dispatch, id]);

  if (Object.keys(data).length === 0 || isLoading) {
    return null;
  }

  return (
    <div className="container">
      <h1>
        Hello
        {' @'}
        {username}
      </h1>
      <Paper elevation={10} className="p-10 m-b-10">
        <h3>My Stats 🥳</h3>
        <div
          className={classNames(
            { 'row space-between': !isTablet },
            { 'column space-between': isTablet },
          )}
        >
          <div style={{ width: lineWidth }}>
            <Line height={lineHeight} options={options} data={lineChartData(data)} />
          </div>
          <div
            className={classNames(
              { 'm-t-10': isTablet },
            )}
            style={{ width: pieWidth, marginLeft: 'auto', marginRight: 'auto' }}
          >
            <Pie data={pieChartData(data)} options={options} />
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default Profile;
