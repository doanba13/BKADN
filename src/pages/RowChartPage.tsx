import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Layout, Switch } from 'antd';
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

const createChartData = (data: any, type: boolean) => {
    console.log(data);

    return {
        labels,
        datasets: [
            {
                label: type ? 'MV 1' : 'MI 1',
                data: type ? data.V1 : data.I1,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: type ? 'MV 2' : 'MI 2',
                data: type ? data.V2 : data.I2,
                borderColor: 'rgb(240, 233, 42)',
                backgroundColor: 'rgba(241, 236, 95, 0.5)',
            },
            {
                label: type ? 'MV 3' : 'MI 3',
                data: type ? data.V2 : data.I2,
                borderColor: 'rgb(128, 245, 89)',
                backgroundColor: 'rgba(87, 210, 49, 0.5)',
            },
        ],
    };
};

const RowChartPage = () => {
    const { MV, Vrms, Irms, MI } = useGetData();

    const [toggleChart, setToggleChart] = useState(true);
    const [chartData, setChartData] = useState<any>(createChartData(MV, toggleChart));

    useEffect(() => {
        console.log(createChartData(MV, toggleChart));

        setChartData(createChartData(MV, toggleChart));
    }, [MV]);

    useEffect(() => {
        setChartData(createChartData(toggleChart ? MV : MI, toggleChart));
    }, [toggleChart]);

    return (
        <Layout style={{ flexDirection: 'row', paddingTop: '100px' }}>
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
                    onChange={(value) => {
                        setToggleChart(!toggleChart);
                        update(ref(realtimeDb), {
                            csel: value ? true : false,
                        });
                    }}
                    style={{ width: '70px', position: 'absolute', top: 10, left: 10 }}
                />
                <Line options={options} data={chartData} />
            </div>
        </Layout>
    );
};

export default RowChartPage;
