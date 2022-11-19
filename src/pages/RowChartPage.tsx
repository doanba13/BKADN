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

import { DataCard } from '@/component/Card';

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
            text: 'Chart.js Line Chart',
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

export const RowChartPage = () => {
    return (
        <Layout style={{ flexDirection: 'row', paddingTop: '100px' }}>
            <div style={{ display: 'flex', marginRight: '100px' }}>
                <div style={{ margin: '0 50px' }}>
                    <DataCard />
                    <DataCard />
                    <DataCard />
                </div>
                <div>
                    <DataCard />
                    <DataCard />
                    <DataCard />
                </div>
            </div>
            <div style={{ width: '800px', position: 'relative' }}>
                <Line options={options} data={data} />
            </div>
        </Layout>
    );
};
