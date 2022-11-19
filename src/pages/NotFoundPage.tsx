import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const scale = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const float = keyframes`
  50% {
    transform: translateY(15px);
  }
`;

const DivTop = styled.div`
    margin-top: 30px;
`;

const DivBackground = styled.div`
    background: transparent;
`;

const DivContainer = styled.div`
    margin: 0 auto;
    position: relative;
    width: 250px;
    height: 250px;
`;

const DivGhost = styled.div`
    width: 50%;
    height: 53%;
    left: 25%;
    top: 10%;
    position: absolute;
    border-radius: 50% 50% 0 0;
    background: #ededed;
    border: 2px solid #ee772f;
    border-bottom: none;
    animation: ${float} 2s ease-out infinite;
`;

const DivGhostCopy = styled.div`
    width: 50%;
    height: 53%;
    left: 25%;
    top: 10%;
    position: absolute;
    border-radius: 50% 50% 0 0;
    background: #ededed;
    border: 1px solid #bfc0c0;
    border-bottom: none;
    animation: ${float} 2s ease-out infinite;
    z-index: 0;
`;

const DivFace = styled.div`
    position: absolute;
    width: 100%;
    height: 60%;
    top: 20%;
`;

const DivEye = styled.div`
    position: absolute;
    background: #ee772f;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    top: 40%;
`;

const DivMouth = styled.div`
    position: absolute;
    top: 50%;
    left: 45%;
    width: 10px;
    height: 10px;
    border: 3px solid;
    border-radius: 50%;
    border-color: transparent #ee772f #ee772f transparent;
    transform: rotate(45deg);
`;

const DivFoot = styled.div`
    position: absolute;
    background: #ededed;
    top: 87%;
    width: 26%;
    height: 23%;
    border: 2px solid #ee772f;
    z-index: 0;
`;

const DivShadow = styled.div`
    position: absolute;
    width: 30%;
    height: 7%;
    background: #bfc0c0;
    left: 35%;
    top: 80%;
    border-radius: 50%;
    animation: ${scale} 2s infinite;
`;

const H3 = styled.h3`
    font-size: 2em;
    text-align: center;
    color: #bfc0c0;
    margin-top: -20px;
    font-weight: 900;
`;

const DivButtons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`;

const Btn = styled.button`
    background: white;
    font-weight: bold;
    color: #ee772f;
    padding: 7px 20px;
    margin: 5px;
    border-radius: 20px;
    border: 3px solid #ee772f;
    font-family: 'Lato', sans-serif;
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 1px;

    &:hover {
        background: #ee772f;
        color: white;

        transition: all 0.4s ease-out;
    }
`;

function NotFoundPage() {
    const history = useNavigate();

    return (
        <>
            <DivBackground />
            <DivTop>
                <h1
                    style={{
                        marginBottom: 0,
                        color: 'white',
                        textShadow: '3px 0 #ee772f, 0 1px #ee772f, 1px 0 #ee772f, 0 -1px #ee772f',
                        fontFamily: 'Abril Fatface, serif',
                        fontSize: '9em',
                        textAlign: 'center',
                    }}
                >
                    404
                </h1>
                <H3
                    style={{
                        color: '#ee772f',
                    }}
                >
                    Oops!
                </H3>
            </DivTop>
            <DivContainer>
                <DivGhostCopy>
                    <DivFoot style={{ borderRadius: '0 0 100% 30%', left: -1 }} />
                    <DivFoot style={{ borderRadius: '0 0 50% 50%', left: '23%' }} />
                    <DivFoot style={{ borderRadius: '0 0 50% 50%', left: '50%' }} />
                    <DivFoot style={{ borderRadius: ' 0 0 30% 100%', left: '74.5%' }} />
                </DivGhostCopy>
                <DivGhost>
                    <DivFace>
                        <DivEye style={{ left: '25%' }} />
                        <DivEye style={{ right: '25%' }} />
                        <DivMouth />
                    </DivFace>
                </DivGhost>
                <DivShadow />
            </DivContainer>
            <div style={{ marginTop: 10 }}>
                <H3
                    style={{
                        color: '#ee772f',
                        fontFamily: ' Lato, sans-serif',
                        textTransform: 'uppercase',
                    }}
                >
                    THE PAGE CAN&apos;T BE FOUND.
                </H3>
                <DivButtons>
                    <Btn
                        className="btn"
                        onClick={() => {
                            if (window.history.state && window.history.state.idx > 0) {
                                history(-1);
                            } else {
                                history('/', { replace: true });
                            }
                        }}
                    >
                        <div>Back</div>
                    </Btn>
                    <Btn className="btn" onClick={() => history('/')}>
                        <div>Home</div>
                    </Btn>
                </DivButtons>
            </div>
        </>
    );
}

export default NotFoundPage;
