import { useState, useEffect, useRef } from 'react';
import SearchInput from 'components/SearchInput';
import { getClients } from 'api/clients';
import NumberInput from 'react-number-format';

const ClientSearch = ({ size, value, autoFocus, onSelect }) => {
    const [selectedClient, setSelectedClient] = useState();
    const searchRef = useRef(null);

    useEffect(() => {
        if (value) setSelectedClient({ label: value.name, value });
    }, [value]);

    const loadClients = async (inputValue) => {
        const clients = await getClients({ page: 1, filter: inputValue });

        if (clients && clients.records.length > 0) {
            clients.records[0].debts = true;
            const records = clients.records.map((client) => {
                const formattedClient = {
                    label: [
                        client.name,
                        ' - ',
                        <NumberInput displayType='text' thousandSeparator='.' decimalSeparator=',' value={client.cedula} />,
                    ],
                    value: client,
                };
                return formattedClient;
            });

            return records;
        }
    };

    const handleSelect = (option, { action }) => {
        if (action === 'select-option') {
            setSelectedClient({ label: option.value.name, value });
            onSelect(option.value, action);
        } else if (action === 'clear') {
            setSelectedClient(null);
            onSelect(null, action);
        }
    };

    return (
        <SearchInput
            innerRef={searchRef}
            loadOptions={loadClients}
            placeholder='Cliente'
            value={selectedClient}
            onSelect={handleSelect}
            autoFocus={autoFocus}
            isError={selectedClient && selectedClient.value.debts}
            size={size}
        />
    );
};

export default ClientSearch;
