import React from 'react';
import { Line } from 'react-chartjs-2';
import { Layout } from 'antd';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const randomInteger = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Power Factor Before',
        },
    },
};

export const options2 = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Power Factor After',
        },
    },
};

const labels = new Array(64).fill('');

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: new Array(64).fill(0).map((_) => randomInteger(-1, 1)),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};

export const data2 = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: new Array(64).fill(0).map((_) => randomInteger(-1, 1)),
            borderColor: 'rgb(48, 241, 87)',
            backgroundColor: 'rgba(4, 156, 14, 0.5)',
        },
    ],
};

export const ChartPage = () => {
    return (
        <Layout style={{ flexDirection: 'column', paddingTop: '100px', alignItems: 'center' }}>
            <div style={{ width: '800px', position: 'relative' }}>
                <Line options={options} data={data} />
            </div>

            <div style={{ width: '800px', position: 'relative' }}>
                <Line options={options2} data={data2} />
            </div>
        </Layout>
    );
};
