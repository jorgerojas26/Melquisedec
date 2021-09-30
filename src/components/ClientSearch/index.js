import { useState, useEffect } from 'react';
import SearchInput from 'components/SearchInput';
import { getClients } from 'api/clients';

const ClientSearch = ({ size, innerRef, value, autoFocus, onSelect, onCreate }) => {
    const [selectedClient, setSelectedClient] = useState();

    useEffect(() => {
        if (value) setSelectedClient({ label: value.name, value });
    }, [value]);

    const loadClients = async (inputValue) => {
        const clients = await getClients({ page: 1, filter: inputValue });

        if (clients && clients.records.length > 0) {
            const records = clients.records.map((client) => {
                const formattedClient = {
                    key: client.id,
                    label: `${client.name} - ${Number(client.cedula).toLocaleString()}`,
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
            onCreateOption={onCreate}
            innerRef={innerRef}
            loadOptions={loadClients}
            defaultOptions={false}
            cacheOptions={false}
            placeholder='Cliente'
            value={selectedClient}
            onSelect={handleSelect}
            autoFocus={autoFocus}
            isError={selectedClient && selectedClient.value.sale && selectedClient.value.sale.length > 0}
            size={size}
        />
    );
};

export default ClientSearch;
