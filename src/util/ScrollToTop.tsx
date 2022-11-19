import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop: () => any = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        // Todo: Close all modal when scroll to top
        // Example: modalDispatch({ type: 'close' });
    }, [pathname]);

    return null;
};
