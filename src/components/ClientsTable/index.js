import { useState } from 'react';
import { useClients } from 'hooks/clients';

import { useTableFilter } from 'hooks/tableFilter';

import { FilterContainer } from './styles';

import TableFilterInput from 'components/TableFilterInput';
import Table from 'components/Table';

const ClientsTable = ({ onClientSelect }) => {
    const { clientList, loading } = useClients([]);
    const [searchStr, setSearchStr] = useState('');
    const filteredClients = useTableFilter(clientList, searchStr, [1, 2, 3, 4]);

    const clientsToRender = filteredClients.length || (!filteredClients.length && searchStr) ? filteredClients : clientList;

    return (
        <>
            <FilterContainer>
                <TableFilterInput
                    value={searchStr}
                    onChange={(event) => setSearchStr(event.target.value)}
                    placeholder='Buscar por id, nombre, cédula o teléfono'
                    autoFocus
                />
            </FilterContainer>
            <Table
                onRowSelect={onClientSelect}
                loading={loading}
                data={clientsToRender}
                columns={['ID', 'Nombre', 'Cédula', 'Teléfono', 'Creado']}
            />
        </>
    );
};

export default ClientsTable;
