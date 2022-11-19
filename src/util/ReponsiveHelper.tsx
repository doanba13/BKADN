//References
//https://ant.design/components/layout/#breakpoint-width

//Extra small device is less than 480
import { useMediaQuery } from 'react-responsive';

export const MIN_DEVICE_WIDTH_MOBILE = 480;
export const MIN_DEVICE_WIDTH_TABLET = 768;
export const MIN_DEVICE_WIDTH_LAPTOP_OR_DESKTOP = 992;
export const MIN_DEVICE_WIDTH_LARGE_DESKTOP = 1200;

export const useDesktop = () => useMediaQuery({ minWidth: MIN_DEVICE_WIDTH_LAPTOP_OR_DESKTOP });
export const useTablet = () => useMediaQuery({ minWidth: MIN_DEVICE_WIDTH_TABLET });
export const useMobile = () => useMediaQuery({ minWidth: MIN_DEVICE_WIDTH_MOBILE });
export const useSmallMobile = () => useMediaQuery({ maxWidth: MIN_DEVICE_WIDTH_MOBILE - 1 });

export const Desktop = ({ children }: { children: React.ReactNode }) => {
    const isDesktop = useDesktop();
    return isDesktop ? children : null;
};
export const Tablet = ({ children }: { children: React.ReactNode }) => {
    const isTablet = useTablet();
    return isTablet ? children : null;
};
export const Mobile = ({ children }: { children: React.ReactNode }) => {
    const isMobile = useMobile();
    return isMobile ? children : null;
};

export const SmallMobile = ({ children }: { children: React.ReactNode }) => {
    const isMobile = useSmallMobile();
    return isMobile ? children : null;
};
