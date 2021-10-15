import { useEffect, useState } from 'react';
import {} from './styles';
import WidgetBox from 'components/WidgetBox';
import TopClientsTable from 'components/ModuleTables/TopClientsTable';
import Card from 'components/Card';
import DateRangeSelector from 'components/DateRangeSelector';

import { getTopClients } from 'api/clients';

const ClientWidgets = ({ show, onClose }) => {
    const [topClients, setTopClients] = useState([]);
    const [topSalesRange, setTopSalesRange] = useState('last_week');
    const [topDebtsRange, setTopDebtsRange] = useState('last_week');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTopClients = async () => {
            setLoading(true);
            const response = await getTopClients();
            setLoading(false);
            if (!response.error) {
                setTopClients(response);
            }
        };

        fetchTopClients();
    }, []);

    return (
        <WidgetBox onClose={onClose} show={show}>
            <div style={{ gap: '10px' }}>
                <Card>
                    <Card.Header>
                        <h3>Top 5 mejores clientes</h3>
                    </Card.Header>
                    <div style={{ alignItems: 'flex-end' }}>
                        <select onChange={(event) => setTopSalesRange(event.target.value)} value={topSalesRange}>
                            <option value='lifetime'>De por vida</option>
                            <option value='last_month'>Último més</option>
                            <option value='last_week'>Última semana</option>
                            <option value='today'>Hoy</option>
                        </select>
                    </div>
                    <Card.Body>
                        {topClients.sales && <TopClientsTable data={topClients.sales[topSalesRange]} maxHeight='200px' loading={loading} />}
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Header>
                        <h3>Top 5 clientes deudores</h3>
                    </Card.Header>
                    <div style={{ alignItems: 'flex-end' }}>
                        <select onChange={(event) => setTopDebtsRange(event.target.value)} value={topDebtsRange}>
                            <option value='lifetime'>De por vida</option>
                            <option value='last_month'>Último més</option>
                            <option value='last_week'>Última semana</option>
                            <option value='today'>Hoy</option>
                        </select>
                    </div>
                    <Card.Body>
                        {topClients.debts && <TopClientsTable data={topClients.debts[topDebtsRange]} maxHeight='200px' loading={loading} />}
                    </Card.Body>
                </Card>
            </div>
        </WidgetBox>
    );
};

export default ClientWidgets;
