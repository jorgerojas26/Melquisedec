import { StyledTable, THead, TBody, TFoot, TH, THChildrenWrapper, TR, TD, StyledLoadingContainer } from './styles.js';

const Table = ({ children, ...props }) => {
    return <StyledTable {...props}>{children}</StyledTable>;
};

Table.Head = ({ children, ...props }) => {
    return <THead {...props}>{children}</THead>;
};

Table.Body = ({ children, ...props }) => {
    return <TBody {...props}>{children}</TBody>;
};

Table.Foot = ({ children, ...props }) => {
    return <TFoot {...props}>{children}</TFoot>;
};

Table.TH = ({ children, ...props }) => {
    return (
        <TH {...props}>
            <THChildrenWrapper>{children}</THChildrenWrapper>
        </TH>
    );
};

Table.TR = ({ children, ...props }) => {
    return <TR {...props}>{children}</TR>;
};

Table.TD = ({ children, ...props }) => {
    return <TD {...props}>{children}</TD>;
};

Table.LoadingContainer = () => {
    return <StyledLoadingContainer>Cargando...</StyledLoadingContainer>;
};

export default Table;
