import ContentLoader from 'react-content-loader';

import { Loader } from './Loader';

export const ExampleLoader = (props: any) => {
    const contentLoader = (
        <ContentLoader
            speed={2}
            width={'100%'}
            height={60}
            viewBox="0 0 200 60"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="0" y="12" rx="5" ry="5" width="100%" height="15" />
            <rect x="0" y="39" rx="5" ry="5" width="100%" height="15" />
        </ContentLoader>
    );
    return (
        <Loader contentLoader={contentLoader} loadingArea={props.loadingarea}>
            {props.children}
        </Loader>
    );
};
