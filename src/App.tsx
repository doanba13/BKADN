import { IntlProvider } from 'react-intl';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';

import logo1 from '@/assets/logo1.png';
import logo2 from '@/assets/logo2.png';
import { useLangContext } from '@/context/langCtx';
import ApplicationRoutes from '@/pages/ApplicationRoutes';
import GlobalStyle from '@/styles/GlobalStyle';

import { languageConfig } from './util/langConfig';

import 'antd/dist/antd.dark.css';

const App = () => {
    const lang = useLangContext((state) => state.lang);
    const { locale, messages } = languageConfig[lang];

    return (
        <div>
            <GlobalStyle />
            <IntlProvider locale={locale} messages={messages}>
                <Layout>
                    <Header
                        style={{
                            height: '110px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Menu
                            theme="light"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            style={{ padding: '20px' }}
                            items={[
                                { key: 1, label: <Link to={'/'}>Home</Link> },
                                { key: 2, label: <Link to={'/detail'}>Detail</Link> },
                                { key: 3, label: <Link to={'/chart-1'}>Chart 1</Link> },
                                { key: 4, label: <Link to={'/chart-2'}>Chart 2</Link> },
                                { key: 5, label: <Link to={'/chart-3'}>Chart 3</Link> },
                            ]}
                        />
                        <div>
                            <img style={{ height: '90px', marginRight: '10px' }} src={logo1} />
                            <img style={{ height: '90px' }} src={logo2} />
                        </div>
                    </Header>
                    <ApplicationRoutes />
                </Layout>
            </IntlProvider>
        </div>
    );
};

export default App;
