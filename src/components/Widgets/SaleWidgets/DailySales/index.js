import { useState, useEffect } from 'react';
import Card from 'components/Card';

import { ResponsiveLine } from '@nivo/line';
import { getDailySales } from 'api/reports';

const DailySales = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetch_report = async () => {
            setLoading(true);
            const report = await getDailySales();
            setLoading(false);
            setData([report.chart_data] || []);
        };

        fetch_report();
    }, []);

    return (
        <Card>
            <Card.Header>
                <h2>Total ventas diarias</h2>
                <small>Últimas 2 semanas</small>
            </Card.Header>
            <Card.Body>
                {loading && 'Cargando...'}
                {data.length > 0 && !loading && (
                    <div style={{ height: '200px' }}>
                        <ResponsiveLine
                            data={data}
                            margin={{ top: 10, right: 20, bottom: 30, left: 40 }}
                            xScale={{ type: 'point' }}
                            yScale={{ type: 'linear', min: 0, stacked: false }}
                            axisTop={null}
                            axisRight={null}
                            pointSize={10}
                            pointColor={{ theme: 'background' }}
                            pointBorderWidth={2}
                            pointBorderColor={{ from: 'serieColor' }}
                            pointLabelYOffset={-12}
                            useMesh={true}
                            tooltip={({ point }) => {
                                return (
                                    <div style={{ placeItems: 'center', background: point.borderColor, padding: '5px' }}>
                                        <span>{point.data.x}</span>
                                        <span>${point.data.y}</span>
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

export default DailySales;
