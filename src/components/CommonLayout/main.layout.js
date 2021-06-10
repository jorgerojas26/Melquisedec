import styled from 'styled-components';

import { colors, breakpoints } from 'styles/theme';

export const Wrapper = styled.div`
    flex: 1;
`;

export const SeparatorWrapper = styled.div`
    flex-direction: row;
    flex: 1;
`;

export const ContentContainer = styled.div`
    flex: 1;
    overflow: hidden;

    @media (min-width: ${breakpoints.mobile}) {
        overflow-x: auto;
    }
`;

export const ToolbarContainer = styled.div`
    height: 50px;

    background: ${colors.extraLightPrimary};
`;

export const TableContainer = styled.div`
    flex: 1 1 auto;
    overflow: hidden;
`;

export const FormContainer = styled.div`
    position: absolute;
    margin: auto;
    top: 5%;
    left: 0;
    right: 0;

    max-width: 90%;

    background: white;

    border-radius: 4px;

    z-index: 4;

    @media (min-width: ${breakpoints.mobile}) {
        top: 100px;
        bottom: auto;
        max-width: 400px;
        height: auto;

        ${(props) => {
            if (props.medium) {
                return `
                max-width: 800px;
                `;
            }
        }}
    }
`;

export const ConfirmContainer = styled.div`
    position: absolute;
    margin: auto;
    top: 100px;
    left: 0;
    right: 0;

    max-width: 350px;

    background: white;

    z-index: 4;

    border-radius: 4px;
`;
