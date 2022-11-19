import { CircularProgressbar } from 'react-circular-progressbar';
import { Button, Layout, Switch } from 'antd';
import Slider, { SliderMarks } from 'antd/lib/slider';
import { ref, set } from 'firebase/database';
import styled from 'styled-components';

import { DataCard } from '@/component/Card';
import { realtimeDb, useGetData } from '@/fetcher/FirebaseService';

import 'react-circular-progressbar/dist/styles.css';

const Section = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 1.5rem;
    padding: 0 2rem;

    button {
        font-size: 1rem;
    }
`;

const marks: SliderMarks = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
};

const HelloPage = () => {
    const { Vrms } = useGetData();

    const writeData = (data: any) => {
        set(ref(realtimeDb, 'clientTestWriteData'), {
            test: `Write from client ${data}`,
        });
    };

    console.log(Vrms);

    return (
        <>
            <Layout style={{ height: '100vh', padding: '5rem 0' }}>
                <Section>
                    <div style={{ display: 'flex' }}>
                        <div>
                            <DataCard />
                            <DataCard />
                            <DataCard />
                        </div>
                        <div style={{ marginLeft: '1rem' }}>
                            <DataCard />
                            <DataCard />
                            <DataCard />
                        </div>
                    </div>
                    <div style={{ width: '516px', display: 'grid', placeItems: 'center' }}>
                        <div style={{ width: '300px' }}>
                            <CircularProgressbar value={2} maxValue={5} text={`2/5`} />
                        </div>

                        <Slider
                            onChange={(data: any) => writeData(data)}
                            style={{ width: '300px' }}
                            marks={marks}
                            defaultValue={0}
                            max={5}
                        />
                        <Slider
                            onChange={(data: any) => writeData(data)}
                            style={{ width: '300px' }}
                            marks={marks}
                            defaultValue={0}
                            max={5}
                        />
                        <Slider
                            onChange={(data: any) => writeData(data)}
                            style={{ width: '300px' }}
                            marks={marks}
                            defaultValue={0}
                            max={5}
                        />

                        <div
                            style={{
                                width: '300px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '0.5rem',
                            }}
                        >
                            <Button>Start</Button>
                            <Switch
                                checkedChildren="Auto"
                                unCheckedChildren="Manual"
                                defaultChecked
                                style={{ width: '70px' }}
                            />
                        </div>
                    </div>
                </Section>
                <Section>
                    <div style={{ display: 'flex', justifyContent: 'start' }}>
                        <div>
                            <DataCard hasMore />
                            <DataCard hasMore />
                        </div>
                        <div style={{ marginLeft: '1rem' }}>
                            <DataCard hasMore />
                            <DataCard hasMore />
                        </div>
                        <div style={{ marginLeft: '1rem' }}>
                            <DataCard hasMore />
                            <DataCard hasMore />
                        </div>
                        <div style={{ marginLeft: '1rem' }}>
                            <DataCard hasMore />
                            <DataCard hasMore />
                        </div>
                        <div style={{ marginLeft: '1rem' }}>
                            <DataCard hasMore />
                            <DataCard hasMore />
                        </div>
                    </div>
                </Section>
            </Layout>
        </>
    );
};

export default HelloPage;
