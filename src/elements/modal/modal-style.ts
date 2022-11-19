import { animated } from 'react-spring';
import styled from 'styled-components';

import { StyledButton } from '@/elements/button/StyledButton';

export interface StyleProps {
    $isCancelBtn: boolean;
}

export const ModalBackground = styled(animated.div)`
    display: flex;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    z-index: 120;
`;

export const View = styled(animated.div)<StyleProps>`
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    background: #141414;
    color: #000;
    position: absolute;
    text-align: center;
    z-index: 120;
    border-radius: 10px;
    padding: 2rem 3rem;
    max-width: 60%;
    min-width: 30%;
    font-size: 0.5rem;
    top: 30%;
    right: 50%;

    & h1 {
        line-height: 30px;
    }

    & div {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        @media (max-width: 768px) {
            flex-direction: column;
        }

        & button {
            font-size: 0.9rem;
            flex: ${(props) => (props.$isCancelBtn ? '0 0 46%' : '100%')};
            padding: 0.3rem 1rem;
        }
    }

    @media (max-width: 768px) {
        max-width: 80%;
        min-width: 70%;
        font-size: 0.4rem;
        padding: 1rem 2rem;
    }
`;

export const AcceptBtn = styled(StyledButton)`
    background: rgba(255, 255, 255, 0.1);
`;

export const CancelBtn = styled(StyledButton)`
    background: rgba(255, 255, 255, 0.1);

    &:hover {
        background: rgba(255, 255, 255, 0.5);
    }
`;
