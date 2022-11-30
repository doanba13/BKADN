import { useEffect, useState } from 'react';
import { ref, update } from '@firebase/database';
import { Button, Form, Input, Layout, Select } from 'antd';

import LoadingComponent from '@/component/LoadingComponent';
import { realtimeDb } from '@/fetcher/FirebaseService';
import { useGetData } from '@/fetcher/useGetData';

const { Option } = Select;

const SettingPage = () => {
    const { CTratio, PFSet, Fmode } = useGetData();
    const [isLoading, setLoading] = useState(true);

    const [form] = Form.useForm();

    useEffect(() => {
        setLoading(false);
        form.setFieldsValue({ phaseMode: Fmode, ctRatio: CTratio, powerFactor: PFSet });
    }, [CTratio, PFSet, Fmode]);

    const onSubmitHandler = (value: any) => {
        update(ref(realtimeDb), {
            Fmode: value.phaseMode,
            Submit: 1,
            CTratio: +value.ctRatio,
            PFSet: +value.powerFactor,
        });
    };

    if (isLoading) return <LoadingComponent />;

    return (
        <Layout style={{ alignItems: 'center', justifyContent: 'center', height: '800px' }}>
            <div
                style={{
                    padding: '2rem 1rem',
                    backgroundColor: '#3c3c3c',
                    borderRadius: '15px',
                    width: '35%',
                }}
            >
                <Form
                    name="basic"
                    form={form}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onSubmitHandler}
                    autoComplete="off"
                >
                    <Form.Item label="Phase Mode" name="phaseMode">
                        <Select>
                            <Option value={1}>1 Phase</Option>
                            <Option value={2}>3 Phase</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="CT Ratio" name="ctRatio">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Power Factor Set" name="powerFactor">
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Set
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Layout>
    );
};

export default SettingPage;
