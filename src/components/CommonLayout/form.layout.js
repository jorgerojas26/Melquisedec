import styled from 'styled-components';

import { colors } from 'styles/theme';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const HeaderContainer = styled.div`
    flex: 0 1 50px;
    border-bottom: 1px solid ${colors.shadow};
`;

export const CloseButtonContainer = styled.div`
    flex: 0 1 20px;
    align-items: flex-end;
`;

export const TitleContainer = styled.div`
    flex: 1;
    align-items: flex-start;
    margin-left: 20px;

    font-size: 20px;
    font-weight: 700;
`;

export const BodyContainer = styled.div`
    padding: 20px;
    flex: 1;
    gap: 10px;
    max-height: 450px;
    overflow-y: ${(props) => (props.overflow ? 'auto' : 'none')};

    h4 {
        margin: 0 0 5px 0;
    }
`;

export const FooterWrapper = styled.div`
    border-top: 1px solid ${colors.shadow};
`;

export const FooterContainer = styled.div`
    flex-direction: row;
    justify-content: flex-end;
    flex: 0 1 50px;

    padding: 5px 0;
`;

export const InlineContainer = styled.div`
    flex-direction: row;
    gap: 10px;

    div {
        max-width: 100%;
    }
`;
export const InputContainer = styled.div`
    flex: 0 1 auto;
`;

export const ButtonContainer = styled.div`
    margin-right: 10px;

    background: ${(props) => (props.color ? props.color : 'transparent')};

    > button {
        color: white;
    }

    svg {
        margin: 0;
    }
`;

export const ErrorAlert = styled.span`
    font-weight: 500;
    color: red;
    padding-top: 5px;
    width: 100%;
`;

export const ErrorContainer = styled.span`
    display: flex;
    flex: 0 0 20px;
    margin: 0 20px;
    color: white;
    font-size: 18px;
`;

export const ImageContainer = styled.div`
    min-width: 48px;
    max-width: 48px;
    background-image: url(${(props) => props.url});
    background-repeat: no-repeat;
    background-size: contain;
`;

export const TableContainer = styled.div`
    * {
        font-size: 16px;
        padding: 0;
        margin: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    td {
        max-width: 80px;
    }

    h4 {
        margin-top: 10px;
        text-align: center;
    }
`;
