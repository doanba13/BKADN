import { useDesktop, useMobile, useTablet } from './ReponsiveHelper';

export const useGridResponseHelper = () => {
    const isMobile = useMobile();
    const isTablet = useTablet();
    const isDesktop = useDesktop();

    const itemsPerRow = isDesktop ? 4 : isTablet ? 3 : isMobile ? 3 : 2;

    return { itemsPerRow };
};
