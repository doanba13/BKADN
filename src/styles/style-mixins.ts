type JustifyContent =
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'initial'
    | 'inherit';

type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'initial' | 'inherit' | 'stretch' | 'baseline';

type FlexDir = 'row' | 'row-reverse' | 'column' | 'column-reverse' | 'initial' | 'inherit';

interface FlexProps {
    justify?: JustifyContent;
    align?: AlignItems;
    direction?: FlexDir;
}

export const flex: (props?: FlexProps) => string = ({ justify, align, direction }) => `
    display: flex;
    ${justify ? `justify-content: ${justify};` : ''}
    ${align ? `align-items: ${align};` : ''}
    ${direction ? `flex-direction: ${direction};` : ''}
    
`;
