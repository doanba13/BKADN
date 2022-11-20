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

export const DataCard = ({
    hasMore = false,
    title,
    value,
    v2,
    v3,
    unit,
}: {
    hasMore?: boolean;
    title: string;
    value: number;
    v2?: number;
    v3?: number;
    unit?: string;
}) => {
    return (
        <CardContainer>
            <h1>{title}</h1>
            <h2>
                {value} {unit}
            </h2>
            {hasMore && (
                <>
                    <h2>
                        {v2} {unit}
                    </h2>
                    <h2>
                        {v3} {unit}
                    </h2>
                </>
            )}
        </CardContainer>
    );
};
