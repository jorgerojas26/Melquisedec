import styled from 'styled-components';

import { colors, breakpoints } from 'styles/theme';

export const Container = styled.div`
    justify-content: center;

    position: fixed;
    top: 150px;

    height: 50px;
    width: 100%;

    box-shadow: rgba(101 119 134 / 20%) 0px 0px 15px, rgba(101 119 134 / 25%) 0px 0px 3px 1px;

    font-size: 24px;
    font-weight: 700;
    text-align: center;
    color: white;

    ${(props) => {
        if (props.type === 'success') {
            return { background: colors.primary };
        } else if (props.type === 'error') {
            return { background: 'red' };
        }
    }}

    @media (min-width: ${breakpoints.mobile}) {
        top: auto;
        bottom: 0;
    }
`;
