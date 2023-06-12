import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Previous 6 months of Stats',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

export let data = {
  labels,
  datasets: [
    {
      label: 'Expenditure',
      data: [10000, 12500, 19500, 18000, 15500, 0],
      backgroundColor: 'rgba(245, 47, 47, 0.7)',
    },
    {
      label: 'Balance',
      data: [40000, 22500, 39500, 30000, 35300, 0],
      backgroundColor: 'rgba(47, 245, 53, 0.7)',
    },
  ],
};


export function BarChart() {
  
  // console.log(data.datasets[0].data[5], data.datasets[1].data[5]);
  
  const {totalMoney} = useSelector((state)=>state);
  const {totalExpense} = useSelector((state)=>state);

  data.datasets[0].data[5] = totalExpense;
  data.datasets[1].data[5] = totalMoney;
  // console.log(totalMoney);
  // console.log(data.datasets[0].data[5], data.datasets[1].data[5]);

  return <Bar options={options} data={data} />;
}