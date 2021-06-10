import { Input } from './styles';

const TableFilterInput = ({ placeholder, value, onChange, ...rest }) => {
    return <Input placeholder={placeholder} value={value} onChange={onChange} {...rest} />;
};

export default TableFilterInput;
