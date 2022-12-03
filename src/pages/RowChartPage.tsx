import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Button, Layout, Switch } from 'antd';
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
import { ref, update } from 'firebase/database';

import { DataCard } from '@/component/Card';
import { realtimeDb } from '@/fetcher/FirebaseService';
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
            text: 'Voltage & Current chart',
        },
    },
};

const labels = new Array(64).fill('');

const RowChartPage = () => {
    const { MV, Vrms, Irms, csel } = useGetData();

    const [chartData, setChartData] = useState<any>({
        labels,
        datasets: [
            {
                label: 'A',
                data: MV.V1,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                pointRadius: 0,
            },
            {
                label: 'B',
                data: MV.V2,
                borderColor: 'rgb(240, 233, 42)',
                backgroundColor: 'rgba(241, 236, 95, 0.5)',
                pointRadius: 0,
            },
            {
                label: 'C',
                data: MV.V3,
                borderColor: 'rgb(128, 245, 89)',
                backgroundColor: 'rgba(87, 210, 49, 0.5)',
                pointRadius: 0,
            },
        ],
    });

    useEffect(() => {
        setChartData({
            labels,
            datasets: [
                {
                    label: 'A',
                    data: MV.V1,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    pointRadius: 0,
                },
                {
                    label: 'B',
                    data: MV.V2,
                    borderColor: 'rgb(240, 233, 42)',
                    backgroundColor: 'rgba(241, 236, 95, 0.5)',
                    pointRadius: 0,
                },
                {
                    label: 'C',
                    data: MV.V3,
                    borderColor: 'rgb(128, 245, 89)',
                    backgroundColor: 'rgba(87, 210, 49, 0.5)',
                    pointRadius: 0,
                },
            ],
        });
    }, [MV]);

    const onSetHandler = () => {
        const sendSubmit = setInterval(() => {
            update(ref(realtimeDb), {
                Submit: 1,
            });
        }, 100);
        setTimeout(() => clearInterval(sendSubmit), 2000);
    };

    return (
        <Layout style={{ flexDirection: 'row', paddingTop: '100px', justifyContent: 'center' }}>
            <div style={{ display: 'flex', marginRight: '100px' }}>
                <div style={{ margin: '0 50px' }}>
                    <DataCard title="Vrms A" value={Vrms.Vrms1} unit="V" />
                    <DataCard title="Vrms B" value={Vrms.Vrms2} unit="V" />
                    <DataCard title="Vrms C" value={Vrms.Vrms3} unit="V" />
                </div>
                <div>
                    <DataCard title="Irms A" value={Irms.Irms1} unit="A" />
                    <DataCard title="Irms B" value={Irms.Irms2} unit="A" />
                    <DataCard title="Irms C" value={Irms.Irms3} unit="A" />
                </div>
            </div>
            <div style={{ width: '800px', position: 'relative' }}>
                <Switch
                    checkedChildren="Current"
                    unCheckedChildren="Voltage"
                    checked={csel}
                    onChange={(value) => {
                        update(ref(realtimeDb), {
                            csel: value ? true : false,
                        });
                    }}
                    style={{ width: '70px', position: 'absolute', top: 10, left: 10 }}
                />
                <Button onClick={onSetHandler} style={{ position: 'absolute', top: 5, left: 90 }}>
                    Set
                </Button>
                <Line options={options} data={chartData} />
            </div>
        </Layout>
    );
};

export default RowChartPage;
