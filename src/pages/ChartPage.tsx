import React, { useEffect } from 'react';
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

import { useChartContext } from '@/context/chartCtx';
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
            text: 'Power Factor After',
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
            text: 'Power Factor Before',
        },
    },
};

const labels = new Array(64).fill('');

const ChartPage = () => {
    const { PFcomped, PFload } = useGetData();
    const { pfComp, pfLoad, setComp, setLoad } = useChartContext((state) => state);

    console.log(pfComp, pfLoad);

    useEffect(() => {
        if (!PFcomped.PFload1) return;
        const { pfComp1, pfComp2, pfComp3 } = { ...pfComp };
        if (pfComp1.length === 64) {
            pfComp1.shift();
            pfComp2.shift();
            pfComp3.shift();
        }
        pfComp1.push(PFcomped.PFload1);
        pfComp2.push(PFcomped.PFload2);
        pfComp3.push(PFcomped.PFload3);

        setComp({ pfComp1, pfComp2, pfComp3 });
    }, [PFcomped]);

    useEffect(() => {
        if (!PFload.PFload1) return;
        const { pfLoad1, pfLoad2, pfLoad3 } = { ...pfLoad };
        if (pfLoad1.length === 64) {
            pfLoad1.shift();
            pfLoad2.shift();
            pfLoad3.shift();
        }
        pfLoad1.push(PFload.PFload1);
        pfLoad2.push(PFload.PFload2);
        pfLoad3.push(PFload.PFload3);

        setLoad({ pfLoad1, pfLoad2, pfLoad3 });
    }, [PFload]);

    return (
        <Layout style={{ flexDirection: 'column', paddingTop: '100px', alignItems: 'center' }}>
            <div style={{ width: '800px', position: 'relative' }}>
                <Line
                    options={options2}
                    data={{
                        labels,
                        datasets: [
                            {
                                label: 'A',
                                data: pfLoad.pfLoad1,
                                borderColor: 'rgb(255, 99, 132)',
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                pointRadius: 0,
                            },
                            {
                                label: 'B',
                                data: pfLoad.pfLoad2,
                                borderColor: 'rgb(240, 233, 42)',
                                backgroundColor: 'rgba(241, 236, 95, 0.5)',
                                pointRadius: 0,
                            },
                            {
                                label: 'C',
                                data: pfLoad.pfLoad3,
                                borderColor: 'rgb(128, 245, 89)',
                                backgroundColor: 'rgba(87, 210, 49, 0.5)',
                                pointRadius: 0,
                            },
                        ],
                    }}
                />
            </div>
            <div style={{ width: '800px', position: 'relative' }}>
                <Line
                    options={options}
                    data={{
                        labels,
                        datasets: [
                            {
                                label: 'A',
                                data: pfComp.pfComp1,
                                borderColor: 'rgb(255, 99, 132)',
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                pointRadius: 0,
                            },
                            {
                                label: 'B',
                                data: pfComp.pfComp2,
                                borderColor: 'rgb(240, 233, 42)',
                                backgroundColor: 'rgba(241, 236, 95, 0.5)',
                                pointRadius: 0,
                            },
                            {
                                label: 'C',
                                data: pfComp.pfComp3,
                                borderColor: 'rgb(128, 245, 89)',
                                backgroundColor: 'rgba(87, 210, 49, 0.5)',
                                pointRadius: 0,
                            },
                        ],
                    }}
                />
            </div>
        </Layout>
    );
};

export default ChartPage;
