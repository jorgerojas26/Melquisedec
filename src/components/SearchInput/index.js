import { Wrapper } from './styles';
import AsyncSelect from 'react-select/async-creatable';
import { colors } from 'styles/theme';
import debounce from 'debounce-promise';

const SearchInput = ({ value, autoFocus, onSelect, placeholder, loadOptions }) => {
    return (
        <Wrapper>
            <AsyncSelect
                styles={{
                    menu: (provided) => ({
                        ...provided,
                        flexDirection: 'column !important',
                    }),
                    menuList: (provided) => ({
                        ...provided,
                        flexDirection: 'column !important',
                    }),
                    container: (provided) => ({
                        ...provided,
                    }),
                    control: (provided, state) => ({
                        ...provided,
                        width: '100%',
                        boxShadow: state.isFocused ? '0 0 0 2px ' + colors.secondary : '0 0 0 1px ' + colors.lightBlack,
                        color: colors.secondary + ' !important',
                        border: 'none',
                        padding: '5px 0',
                    }),
                    option: (provided) => ({
                        ...provided,
                    }),
                }}
                loadOptions={debounce((inputValue, callback) => loadOptions(inputValue, callback), 150)}
                defaultOptions
                cacheOptions
                value={value}
                autoFocus={autoFocus}
                placeholder={placeholder}
                onChange={onSelect}
                loadingMessage={() => {
                    return 'Cargando...';
                }}
            />
        </Wrapper>
    );
};

export default SearchInput;
