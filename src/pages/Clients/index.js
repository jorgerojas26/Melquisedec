import { useState } from 'react';

import { Wrapper, SeparatorWrapper, ContentContainer, WidgetsContainer, FilterBarContainer, TableContainer } from './layout.styles';

import ClientsTable from 'components/ClientsTable';

const Clients = ({ showWidgets }) => {
    const [selectedClient, setSelectedClient] = useState(null);
    console.log(selectedClient);

    const handleClientSelect = (client) => {
        setSelectedClient(client);
    };

    return (
        <Wrapper>
            <SeparatorWrapper>
                <ContentContainer>
                    <TableContainer>
                        <ClientsTable onClientSelect={handleClientSelect} />
                    </TableContainer>
                </ContentContainer>
            </SeparatorWrapper>
        </Wrapper>
    );
};

export default Clients;
