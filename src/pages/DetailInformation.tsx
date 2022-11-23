import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Button, Layout, Switch } from 'antd';
import Slider, { SliderMarks } from 'antd/lib/slider';
import { ref, update } from 'firebase/database';
import styled from 'styled-components';

import { DataCard } from '@/component/Card';
import { realtimeDb } from '@/fetcher/FirebaseService';
import { useGetData } from '@/fetcher/useGetData';

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

export const StyledH1 = styled.h1`
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
`;

const DetailInfo = () => {
    const {
        Vrms,
        Irms,
        Pload,
        Qload,
        Sload,
        PFload,
        THDI,
        THDV,
        PFcomped,
        Qcomped,
        Pcomped,
        Scomped,
        Steps,
        MStep,
        Start,
        Man,
        Freq,
    } = useGetData();
    const [isStart, setIsStart] = useState(false);
    console.log(Steps);

    useEffect(() => {
        setIsStart(Start);
    }, [Start]);

    const writeData = (data: any) => {
        update(ref(realtimeDb, 'MStep'), {
            MStep1: data,
        });
    };

    const startStopHandler = () => {
        setIsStart(!isStart);
        update(ref(realtimeDb), {
            Start: !isStart,
            Submit: !isStart,
        });
    };

    const toggleSetSellect = (data: boolean) => {
        update(ref(realtimeDb), {
            Man: data,
            Submit: 1,
        });
    };

    return (
        <>
            <Layout style={{ height: '100vh', padding: '5rem 0' }}>
                <Section>
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
                        <div style={{ marginLeft: '1rem' }}>
                            <DataCard title="Freq" value={Freq} unit="Hz" />
                        </div>
                    </div>
                    <div style={{ width: '516px', display: 'grid', placeItems: 'center' }}>
                        <div style={{ width: '300px' }}>
                            <CircularProgressbar value={Steps.Steps0} maxValue={5} text={`${Steps.Steps0}/5`} />
                        </div>

                        <Slider
                            onChange={(data: any) => writeData(data)}
                            style={{ width: '300px' }}
                            marks={marks}
                            value={MStep.MStep1}
                            defaultValue={MStep.MStep1}
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
                            <Button onClick={startStopHandler}>{isStart ? 'Stop' : 'Start'}</Button>
                            <div
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: 50,
                                    border: '1px solid #fff',
                                    backgroundColor: isStart ? 'green' : 'red',
                                }}
                            />
                            <Switch
                                checkedChildren="Auto"
                                unCheckedChildren="Manual"
                                checked={!Man}
                                onChange={(checked) => toggleSetSellect(!checked)}
                                style={{ width: '70px' }}
                            />
                        </div>
                    </div>
                </Section>
                <Section style={{ marginTop: '1rem' }}>
                    <div>
                        <div>
                            <StyledH1>Before</StyledH1>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'start' }}>
                            <div>
                                <DataCard title="Power Factor" value={PFload.PFload0} />
                                <DataCard title="Reactive Power" value={Qload.Qload0} unit="VAR" />
                            </div>
                            <div style={{ marginLeft: '1rem' }}>
                                <DataCard title="Active Power" value={Pload.Pload0} unit="W" />
                                <DataCard title="Apparent Power" value={Sload.Sload0} unit="VA" />
                            </div>
                        </div>
                    </div>
                    <div style={{ marginLeft: '1rem', display: 'flex', paddingTop: '4rem' }}>
                        <DataCard hasMore title="THDV" value={THDV.THDV1} v2={THDV.THDV2} v3={THDV.THDV3} unit="%" />
                        <div style={{ width: '1rem' }} />
                        <DataCard hasMore title="THDI" value={THDI.THDI1} v2={THDI.THDI2} v3={THDI.THDI3} unit="%" />
                    </div>
                    <div>
                        <div>
                            <StyledH1>After</StyledH1>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'start' }}>
                            <div style={{ marginLeft: '1rem' }}>
                                <DataCard title="Power Factor" value={PFcomped.PFload0} />
                                <DataCard title="Reactive Power" value={Qcomped.Qcomped0} unit="VAR" />
                            </div>
                            <div style={{ marginLeft: '1rem' }}>
                                <DataCard title="Active Power" value={Pcomped.Pcomped0} unit="W" />
                                <DataCard title="Apparent Power" value={Scomped.Scomped0} unit="VA" />
                            </div>
                        </div>
                    </div>
                </Section>
            </Layout>
        </>
    );
};

export default DetailInfo;
