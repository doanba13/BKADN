import React, { useEffect, useState } from 'react';
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
import { useGetData } from '@/fetcher/useGetData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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

export const RowChartPage = () => {
    const { MV } = useGetData();
    const [chartData, setChartData] = useState<any>({
        labels,
        datasets: [
            {
                label: 'MV 1',
                data: MV.V1,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'MV 2',
                data: MV.V2,
                borderColor: 'rgb(240, 233, 42)',
                backgroundColor: 'rgba(241, 236, 95, 0.5)',
            },
            {
                label: 'MV 3',
                data: MV.V3,
                borderColor: 'rgb(128, 245, 89)',
                backgroundColor: 'rgba(87, 210, 49, 0.5)',
            },
        ],
    });

    useEffect(() => {
        setChartData({
            labels,
            datasets: [
                {
                    label: 'MV 1',
                    data: MV.V1,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: 'MV 2',
                    data: MV.V2,
                    borderColor: 'rgb(240, 233, 42)',
                    backgroundColor: 'rgba(241, 236, 95, 0.5)',
                },
                {
                    label: 'MV 3',
                    data: MV.V3,
                    borderColor: 'rgb(128, 245, 89)',
                    backgroundColor: 'rgba(87, 210, 49, 0.5)',
                },
            ],
        });
    }, [MV]);

    console.log(MV);

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
                <Line options={options} data={chartData} />
            </div>
        </Layout>
    );
};
