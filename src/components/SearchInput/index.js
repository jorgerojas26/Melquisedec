import { Wrapper } from './styles';
import AsyncSelect from 'react-select/async-creatable';
import { colors } from 'styles/theme';
import debounce from 'debounce-promise';

const SearchInput = ({
    innerRef,
    size,
    styles,
    isError,
    value,
    autoFocus,
    onSelect,
    placeholder,
    isDisabled,
    loadOptions,
    onCreateOption,
    defaultOptions = true,
}) => {
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
                    control: (provided, state) => {
                        return {
                            ...provided,
                            width: '100%',
                            boxShadow: state.selectProps.isError
                                ? '0 0 0 2px red'
                                : state.isFocused
                                ? '0 0 0 2px ' + colors.secondary
                                : '0 0 0 1px ' + colors.lightBlack,
                            color: colors.secondary + ' !important',
                            border: 'none',
                            padding: size === 'medium' ? '5px 0px' : size === 'large' ? '10px 0px' : 'auto',
                        };
                    },
                    option: (provided) => ({
                        ...provided,
                    }),
                    ...styles,
                }}
                loadOptions={debounce((inputValue, callback) => loadOptions(inputValue, callback), 150)}
                defaultOptions={defaultOptions}
                cacheOptions
                value={value}
                autoFocus={autoFocus}
                placeholder={placeholder}
                isDisabled={isDisabled}
                onChange={onSelect}
                ref={innerRef}
                loadingMessage={() => {
                    return 'Cargando...';
                }}
                onCreateOption={onCreateOption}
                isClearable
                isError={isError}
            />
        </Wrapper>
    );
};

export default SearchInput;
