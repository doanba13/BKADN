import styled from 'styled-components';

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    padding-left: 1rem;
    background-color: #595959;
    width: 245px;
    border-radius: 15px;
    margin-bottom: 15px;
    h1 {
        font-size: 1.8rem;
        font-weight: 500;
        padding: 0;
        margin: 0;
    }
    h2 {
        padding: 0;
        font-size: 2.3rem;
        font-weight: 600;
        margin: 0;
    }
`;

export const DataCard = ({ hasMore = false }: { hasMore?: boolean }) => {
    return (
        <CardContainer>
            <h1>Vrms-AN</h1>
            <h2>42.2 V</h2>
            {hasMore && (
                <>
                    <h2>42.2 V</h2>
                    <h2>42.2 V</h2>
                </>
            )}
        </CardContainer>
    );
};
