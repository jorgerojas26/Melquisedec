import styled from 'styled-components';

import { colors, breakpoints } from 'styles/theme';

export const Wrapper = styled.div`
    height: 100%;
`;

export const SeparatorWrapper = styled.div`
    flex-direction: row;
    height: 100%;
`;

export const ContentContainer = styled.div`
    flex: 1;
    height: 100%;
    overflow: auto;
`;

export const ToolbarContainer = styled.div`
    background: ${colors.extraLightPrimary};

    div {
        height: 50px;
    }
`;

export const TableContainer = styled.div`
    @media (min-width: ${breakpoints.mobile}) {
        max-height: 500px;
    }
`;

export const FormContainer = styled.div`
    position: absolute;

    left: 0;
    right: 0;
    top: 120px;
    margin: auto;

    height: max-content;
    max-width: ${(props) => props.width || '400px'};

    background: white;

    border-radius: 4px;

    z-index: 4;

    @media (min-width: ${breakpoints.mobile}) {
        left: 70px;
    }

    @media (min-width: ${breakpoints.laptop}) {
        left: 275px;
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
