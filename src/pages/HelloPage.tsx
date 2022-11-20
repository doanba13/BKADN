import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Button, Layout, Switch } from 'antd';
import Slider, { SliderMarks } from 'antd/lib/slider';
import { ref, update } from 'firebase/database';
import styled from 'styled-components';

import { DataCard } from '@/component/Card';
import { realtimeDb } from '@/fetcher/FirebaseService';
import { useGetData } from '@/fetcher/useGetData';

import { StyledH1 } from './DetailInformation';

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
    const { Vrms, Irms, Pload, Qload, Sload, PFload, THDI, THDV, PFcomped, Qcomped, Pcomped, Scomped, Steps } =
        useGetData();
    const [isStart, setIsStart] = useState(false);

    const writeData = (data: any, idx: number) => {
        update(ref(realtimeDb, 'MStep'), {
            [`MStep${idx}`]: data,
        });
    };

    const startStopHandler = () => {
        setIsStart(!isStart);
        update(ref(realtimeDb), {
            start: isStart ? 0 : 1,
        });
    };

    const toggleSetSellect = (data: boolean) => {
        update(ref(realtimeDb), {
            csel: data,
        });
    };

    return (
        <>
            <Layout style={{ height: '100vh', padding: '5rem 0' }}>
                <Section style={{ justifyContent: 'space-between', padding: '0 200px' }}>
                    <div style={{ display: 'flex' }}>
                        <div>
                            <DataCard title="Vrms A" value={Vrms.Vrms1} unit="V" />
                            <DataCard title="Vrms B" value={Vrms.Vrms2} unit="V" />
                            <DataCard title="Vrms C" value={Vrms.Vrms3} unit="V" />
                        </div>
                        <div style={{ marginLeft: '1rem' }}>
                            <DataCard title="Irms A" value={Irms.Irms1} unit="A" />
                            <DataCard title="Irms B" value={Irms.Irms2} unit="A" />
                            <DataCard title="Irms C" value={Irms.Irms3} unit="A" />
                        </div>
                    </div>
                    <div style={{ width: '516px', display: 'grid', placeItems: 'center' }}>
                        <div style={{ display: 'flex', marginLeft: '-200px' }}>
                            <div style={{ marginRight: '30px', display: 'grid', placeItems: 'center' }}>
                                <div style={{ width: '150px' }}>
                                    <CircularProgressbar value={Steps.Steps1} maxValue={5} text={`${Steps.Steps1}/5`} />
                                </div>
                                <Slider
                                    onChange={(data: any) => writeData(data, 2)}
                                    style={{ width: '200px' }}
                                    marks={marks}
                                    defaultValue={0}
                                    max={5}
                                />
                            </div>
                            <div style={{ marginRight: '30px', display: 'grid', placeItems: 'center' }}>
                                <div style={{ width: '150px' }}>
                                    <CircularProgressbar value={Steps.Steps2} maxValue={5} text={`${Steps.Steps2}/5`} />
                                </div>
                                <Slider
                                    onChange={(data: any) => writeData(data, 3)}
                                    style={{ width: '200px' }}
                                    marks={marks}
                                    defaultValue={0}
                                    max={5}
                                />
                            </div>
                            <div style={{ marginRight: '30px', display: 'grid', placeItems: 'center' }}>
                                <div style={{ width: '150px' }}>
                                    <CircularProgressbar value={Steps.Steps3} maxValue={5} text={`${Steps.Steps3}/5`} />
                                </div>
                                <Slider
                                    onChange={(data: any) => writeData(data, 4)}
                                    style={{ width: '200px' }}
                                    marks={marks}
                                    defaultValue={0}
                                    max={5}
                                />
                            </div>
                        </div>

                        <div
                            style={{
                                width: '300px',
                                marginLeft: '-200px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '0.5rem',
                            }}
                        >
                            <Button onClick={startStopHandler}>{isStart ? 'Stop' : 'Start'}</Button>
                            <Switch
                                checkedChildren="Auto"
                                unCheckedChildren="Manual"
                                defaultChecked
                                onChange={(checked) => toggleSetSellect(!checked)}
                                style={{ width: '70px' }}
                            />
                        </div>
                    </div>
                </Section>
                <Section>
                    <div style={{ display: 'flex', justifyContent: 'start' }}>
                        <div>
                            <StyledH1>Before</StyledH1>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <DataCard
                                        title="Power Factor"
                                        value={PFload.PFload1}
                                        v2={PFload.PFload2}
                                        v3={PFload.PFload3}
                                        hasMore
                                    />
                                    <DataCard
                                        title="Reactive Power"
                                        value={Qload.Qload1}
                                        v2={Qload.Qload2}
                                        v3={Qload.Qload3}
                                        hasMore
                                        unit="VAR"
                                    />
                                </div>
                                <div style={{ marginLeft: '1rem' }}>
                                    <DataCard
                                        title="Active Power"
                                        value={Pload.Pload1}
                                        v2={Pload.Pload2}
                                        v3={Pload.Pload3}
                                        hasMore
                                        unit="W"
                                    />
                                    <DataCard
                                        title="Apparent Power"
                                        value={Sload.Sload1}
                                        v2={Sload.Sload2}
                                        v3={Sload.Sload3}
                                        hasMore
                                        unit="VA"
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{ marginLeft: '1rem', paddingTop: '69px' }}>
                            <DataCard
                                title="THDV"
                                value={THDV.THDV1}
                                v2={THDV.THDV2}
                                v3={THDV.THDV3}
                                hasMore
                                unit="%"
                            />
                            <DataCard
                                hasMore
                                title="THDI"
                                value={THDI.THDI1}
                                v2={THDI.THDI2}
                                v3={THDI.THDI3}
                                unit="%"
                            />
                        </div>
                        <div>
                            <StyledH1>After</StyledH1>
                            <div style={{ display: 'flex' }}>
                                <div style={{ marginLeft: '1rem' }}>
                                    <DataCard
                                        title="Power Factor"
                                        value={PFcomped.PFload1}
                                        v2={PFcomped.PFload2}
                                        v3={PFcomped.PFload3}
                                        hasMore
                                    />
                                    <DataCard
                                        title="Reactive Power"
                                        value={Qcomped.Qcomped1}
                                        v2={Qcomped.Qcomped2}
                                        v3={Qcomped.Qcomped3}
                                        hasMore
                                        unit="VAR"
                                    />
                                </div>
                                <div style={{ marginLeft: '1rem' }}>
                                    <DataCard
                                        title="Active Power"
                                        value={Pcomped.Pcomped1}
                                        v2={Pcomped.Pcomped2}
                                        v3={Pcomped.Pcomped3}
                                        hasMore
                                        unit="W"
                                    />
                                    <DataCard
                                        title="Apparent Power"
                                        value={Scomped.Scomped1}
                                        v2={Scomped.Scomped2}
                                        v3={Scomped.Scomped3}
                                        hasMore
                                        unit="VA"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>
            </Layout>
        </>
    );
};

export default HelloPage;
