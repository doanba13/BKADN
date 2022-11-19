import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { FormattedMessage } from 'react-intl';
import { useTransition } from 'react-spring';

import { AcceptBtn, CancelBtn, ModalBackground, View } from './modal-style';

interface ModalProps {
    cancelHandler?: () => void;
    acceptHandler?: () => void;
    visibleHook: () => any;
    nameBtnAcceptHandler?: string;
    children: ReactNode;
}

export const BodyPopup = ({
    nameBtnAcceptHandler,
    cancelHandler,
    acceptHandler,
    visibleHook,
    children,
}: ModalProps) => {
    // Todo: Change visibleHook props from Zustand store
    const [visible] = visibleHook();
    const domElement = document.getElementById('modal');

    const transition = useTransition(visible, {
        from: { opacity: 0, transform: 'translate(50%, -50px)' },
        enter: { opacity: 1, transform: 'translate(50%, 0px)' },
        leave: { opacity: 0, transform: 'translate(50%, 50px)' },
    });

    const content = transition(
        (props, visible) =>
            visible && (
                <ModalBackground>
                    <View style={props} $isCancelBtn={!!cancelHandler}>
                        {children}
                        <div style={{ justifyContent: cancelHandler ? 'space-between' : 'center' }}>
                            {cancelHandler && (
                                <CancelBtn onClick={cancelHandler} style={{ marginTop: '.5rem' }}>
                                    <FormattedMessage id={'app.package.cancel'} />
                                </CancelBtn>
                            )}
                            {acceptHandler && (
                                <AcceptBtn onClick={acceptHandler} style={{ marginTop: '.5rem' }}>
                                    <FormattedMessage
                                        id={nameBtnAcceptHandler ? nameBtnAcceptHandler : 'app.modal.accept'}
                                    />
                                </AcceptBtn>
                            )}
                        </div>
                    </View>
                </ModalBackground>
            ),
    );

    return domElement ? ReactDOM.createPortal(<>{content}</>, domElement) : null;
};

export const PopupMessage = ({
    message,
    cancelHandler,
    acceptHandler,
    visibleHook,
    nameBtnAcceptHandler,
}: Omit<ModalProps, 'children'> & { message: string }) => {
    return (
        <BodyPopup
            visibleHook={visibleHook}
            acceptHandler={acceptHandler}
            cancelHandler={cancelHandler}
            nameBtnAcceptHandler={nameBtnAcceptHandler!}
        >
            <h1>{message}</h1>
        </BodyPopup>
    );
};
