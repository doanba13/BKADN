import { Spin } from 'antd';
import styled from 'styled-components';

const LoadingComponent = () => {
    return (
        <LoadingSection>
            <Spin size={'large'} tip={'Loading...'} />
        </LoadingSection>
    );
};

export default LoadingComponent;

const LoadingSection = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #171717;

    & .ant-spin-lg .ant-spin-dot {
        font-size: 100px;
    }

    & .ant-spin-dot-item {
        background-color: #faad14;
        width: 45px !important;
        height: 45px !important;
    }

    & .ant-spin-text {
        font-size: 1rem;
        padding-top: 10px;
        color: rgba(255, 255, 255, 0.8);
    }
`;
