import { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export const StyledButton = ({ children, ...props }: Props) => {
    return <StyledBtn {...props}>{children}</StyledBtn>;
};

export const FormButton = ({ children, ...props }: Props) => {
    return <StyledFormBtn {...props}>{children}</StyledFormBtn>;
};

const StyledBtn = styled.button`
    flex: 0 0 10%;
    border: none;
    padding: 0.8rem 1rem;
    font-size: 1rem;
    width: calc(100% - 1rem);
    background-color: rgba(15, 15, 15, 0.5);
    border-radius: 10px;
    cursor: pointer;
    color: #fff;
    transition: 0.3s;
    font-weight: 500;

    &:hover,
    &:active {
        color: #000;
        background-color: #fab105;
    }

    @media (max-width: 768px) {
        padding: 0.6rem 0.8rem;
        font-size: 0.9rem;
    }

    @media (max-width: 480px) {
        padding: 0.4rem 0.6rem;
        font-size: 0.7rem;
    }
`;

const StyledFormBtn = styled(StyledBtn)`
    width: calc(100% - 1rem) !important;
    font-size: 1rem;
    padding: 0.8rem 1rem;
`;
