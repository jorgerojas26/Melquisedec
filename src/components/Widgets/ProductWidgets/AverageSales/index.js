import { useState, useEffect } from 'react';
import Card from 'components/Card';

import { ResponsiveLine } from '@nivo/line';
import { getProductAverageSales } from 'api/reports';

const AverageSales = ({ productId }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetch_report = async () => {
            setLoading(true);
            const report = await getProductAverageSales(productId);
            setLoading(false);
            if (report.chart_data && report.chart_data.id) {
                setData([report.chart_data]);
            } else {
                setData([]);
            }
        };

        if (productId) {
            fetch_report();
        }
    }, [productId]);

    return (
        <Card>
            <Card.Header>
                <h3>Promedio ventas semanal</h3>
                <small>Últimos 3 meses</small>
            </Card.Header>
            <Card.Body>
                {loading && 'Cargando...'}
                {data.length > 0 && !loading && (
                    <div style={{ height: '200px' }}>
                        <ResponsiveLine
                            data={data}
                            margin={{ top: 10, right: 40, bottom: 30, left: 40 }}
                            xScale={{ type: 'point' }}
                            yScale={{ type: 'linear', min: 0, stacked: false }}
                            axisLeft={{
                                format: (e) => Math.floor(e) === e && e,
                            }}
                            pointSize={10}
                            pointColor={{ theme: 'background' }}
                            pointBorderWidth={2}
                            pointBorderColor={{ from: 'serieColor' }}
                            enablePointLabel
                            enableGridX
                            enableGridY
                            useMesh
                            tooltip={({ point }) => {
                                return (
                                    <div
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'auto auto',
                                            gap: '2px',
                                            background: point.borderColor,
                                            padding: '5px',
                                        }}
                                    >
                                        <label>Semana: </label>
                                        <span>{point.data.x}</span>
                                        <label>Vendidos: </label>
                                        <span>{point.data.y}</span>
                                    </div>
                                );
                            }}
                        />
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default AverageSales;
