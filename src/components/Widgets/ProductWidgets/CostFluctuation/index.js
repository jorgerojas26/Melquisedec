import { useState, useEffect } from 'react';
import Card from 'components/Card';

import { ResponsiveLine } from '@nivo/line';
import { getCostFluctuation } from 'api/reports';

const CostFluctuation = ({ productId }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetch_report = async () => {
            setLoading(true);
            const report = await getCostFluctuation(productId);
            setLoading(false);
            if (report.id) {
                setData([report]);
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
                <h3>Promedio costo mensual</h3>
            </Card.Header>
            <Card.Body>
                {loading && 'Cargando...'}
                {data.length > 0 && !loading && (
                    <div style={{ height: '200px' }}>
                        <ResponsiveLine
                            data={data}
                            margin={{ top: 10, right: 20, bottom: 30, left: 40 }}
                            xScale={{ type: 'point' }}
                            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                            axisTop={null}
                            axisRight={null}
                            pointSize={10}
                            pointColor={{ theme: 'background' }}
                            pointBorderWidth={2}
                            pointBorderColor={{ from: 'serieColor' }}
                            pointLabelYOffset={-12}
                            useMesh={true}
                        />
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default CostFluctuation;
