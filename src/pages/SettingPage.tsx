import { Button, Form, Input, Layout, Select } from 'antd';

const { Option } = Select;

export const SettingPage = () => {
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
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={() => null}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Phase Mode"
                        name="phaseMode"
                        initialValue={1}
                        // rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Select>
                            <Option value={1}>Phase 1</Option>
                            <Option value={2}>Phase 2</Option>
                            <Option value={3}>Phase 3</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="CT Ratio"
                        name="ctRatio"
                        // rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Power Factor Set"
                        name="powerFactor"
                        // rules={[{ required: true, message: 'Please input your username!' }]}
                    >
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
