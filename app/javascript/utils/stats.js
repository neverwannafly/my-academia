import { readableDate } from './datetime';

function dateRange(date) {
  const data = {};

  for (let i = 0; i < 7; i += 1) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - i);
    data[readableDate(newDate)] = {
      count: 0,
      order: i,
      key: readableDate(newDate),
    };
  }

  return data;
}

export const lineChartData = (data) => {
  const chartData = dateRange(new Date());

  data.progress_data.forEach((row) => {
    chartData[readableDate(row.created_at)].count += row.score;
  });

  const values = Object
    .values(chartData)
    .sort((row1, row2) => row2.order - row1.order);

  return {
    labels: values.map((row) => row.key),
    datasets: [{
      label: 'Score',
      data: values.map((row) => row.count),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }],
  };
};

export const pieChartData = (data) => {
  const {
    total_problems: totalProblems,
    problems_solved: problemsSolved,
  } = data;

  const labels = ['solved', 'unsolved'];
  const value = [
    problemsSolved,
    totalProblems - problemsSolved,
  ];

  return {
    labels,
    datasets: [
      {
        label: '% of Problems Solved',
        data: value,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
};
