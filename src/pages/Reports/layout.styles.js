import styled from 'styled-components';
import { colors } from 'styles/theme';

export const ContentWrapper = styled.div`
    flex-direction: row;
    flex: 1;
    padding: 10px;
    gap: 5%;
`;

export const ControlsWrapper = styled.div`
    flex: 0 1 50px;
    justify-content: center;
    align-items: center;
`;

export const ControlsContainer = styled.div`
    flex-direction: row;
    border-bottom: 1px solid black;
    padding-bottom: 10px;
    justify-content: center;
    align-items: center;
    gap: 5px;
`;

export const LeftWrapper = styled.div`
    flex: 1 1 55%;
    gap: 10px;
`;

export const RightWrapper = styled.div`
    flex: 1 1 40%;
    gap: 10px;
`;

export const CardContainer = styled.div`
    flex: 1;
    background: white;
    box-shadow: rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px;
    border-radius: 16px;
`;

export const CardHeader = styled.div`
    flex: 0 1 50px;
    justify-content: center;
    background: ${colors.superLightGray};

    padding-left: 20px;

    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    border-bottom: 1px solid ${colors.lightGray};

    h2 {
        margin: 0;
    }
`;

export const CardBody = styled.div`
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
`;

export const TableContainer = styled.div`
    table {
        th {
            background: ${colors.superLightGray};
            color: black;
            border: none;
        }
        td {
            color: #95a0a1;
            font-weight: 500;
            border-right: 1px solid rgb(147, 185, 177, 0.2);

            :last-child {
                border-right: none;
            }

            :first-child {
                padding: 0;
            }

            strong {
                color: #556769;
                font-weight: 500;
            }

            > svg {
                display: inline-block;
            }
        }

        tr {
            background: none !important;
            border-bottom: 1px solid rgb(147, 185, 177, 0.2);

            :last-child {
                border-bottom: none;
            }
        }
    }
`;

export const SalesContainer = styled.div``;

export const PaymentsContainer = styled.div`
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
`;

export const DebtsContainer = styled.div``;

export const PaymentsChartContainer = styled.div``;

export const TopContainer = styled.div``;
