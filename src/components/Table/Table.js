import {
    StyledTable,
    THead,
    TBody,
    TFoot,
    TH,
    TR,
    TD,
    StyledLoadingContainer,
    StyledFilterContainer,
    StyledNoDataContainer,
    TableContainer,
    PaginationContainer,
} from './styles.js';

const Table = ({ children, ...props }) => {
    return <StyledTable {...props}>{children}</StyledTable>;
};

Table.TableContainer = ({ children, maxHeight }) => {
    return <TableContainer maxHeight={maxHeight}>{children}</TableContainer>;
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
    return <TH {...props}>{children}</TH>;
};

Table.TR = ({ children, ...props }) => {
    return <TR {...props}>{children}</TR>;
};

Table.TD = ({ children, ...props }) => {
    return <TD {...props}>{children}</TD>;
};

Table.LoadingContainer = ({ children, data }) => {
    return <StyledLoadingContainer data={data}>{children}</StyledLoadingContainer>;
};

Table.FilterContainer = ({ children, filterHeight }) => {
    return <StyledFilterContainer filterHeight={filterHeight}>{children}</StyledFilterContainer>;
};

Table.NoDataContainer = ({ children }) => {
    return <StyledNoDataContainer>{children}</StyledNoDataContainer>;
};

Table.PaginationContainer = ({ children }) => {
    return <PaginationContainer>{children}</PaginationContainer>;
};

export default Table;
