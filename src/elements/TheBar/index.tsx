import React from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


interface ITheBar {
    labels: string[],
    prices: number[],
    predictedPrices: number[]
}


export const TheBar: React.FC<ITheBar> = (props) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Предсказание продаж',
            },
        },
    };
        
    const data = {
        labels: props.labels,
        datasets: [
            {
                label: 'Текущие продажи',
                data: props.prices,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Предсказание продаж на месяц',
                data: props.predictedPrices,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    return <Bar options={options} data={data} />;
}
