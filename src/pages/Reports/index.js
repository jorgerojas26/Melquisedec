import { useState, useEffect } from 'react';
import { Wrapper, SeparatorWrapper, ContentContainer, ReportTableContainer } from 'components/CommonLayout/main.layout';
import * as L from './layout.styles.js';
import { DateTime } from 'luxon';
import Button from 'components/Button';
import { getSalesReport } from 'api/reports';
import Notification from 'components/Notification';
import { useNotification } from 'hooks/notification';
import SalesReportTable from 'components/ModuleTables/ReportTables/Sales';
import PaymentsReportTable from 'components/ModuleTables/ReportTables/Payments';
import DebtsReportTable from 'components/ModuleTables/ReportTables/Debts';
import DebtPaymentsTable from 'components/ModuleTables/ReportTables/DebtPayments';

import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';
import AverageSales from 'components/Widgets/ProductWidgets/AverageSales/index.js';

const ReportsPage = () => {
    const [dates, setDates] = useState({
        from: DateTime.now().toISODate(),
        to: DateTime.now().toISODate(),
    });

    const [loading, setLoading] = useState(false);
    const { notification, showNotification } = useNotification();

    const [reportDetails, setReportDetails] = useState();
    const [chartData, setChartData] = useState();

    const handleClick = async (event) => {
        event.preventDefault();
        if (!loading) {
            setLoading(true);
            const response = await getSalesReport({ from: dates.from, to: dates.to });
            setLoading(false);

            if (response.error) {
                showNotification('error', response.error.message);
            } else {
                setReportDetails(null);
                setReportDetails({ ...response });
            }
        }
    };

    useEffect(() => {
        if (reportDetails) {
            const payment_chart_data = reportDetails.payment_report.reduce((acc, payment) => {
                return [...acc, { id: payment.name + ' ' + payment.currency, label: payment.name, value: payment.usedCount }];
            }, []);

            setChartData((prevState) => ({ ...prevState, payment: payment_chart_data }));

            let top_sell_chart_data = reportDetails.top_sell_products.reduce((acc, product) => {
                return [...acc, { id: product.product, label: product.product, value: product.totalSold }];
            }, []);

            setChartData((prevState) => ({ ...prevState, top_sell: top_sell_chart_data }));

            let hourly_sales_chart_data = reportDetails.hourly_sales_report.reduce((acc, hour) => {
                return [...acc, { id: hour.hour, label: hour.hour, value: hour.total }];
            }, []);

            setChartData((prevState) => ({ ...prevState, hourly_sales: hourly_sales_chart_data }));
        }
    }, [reportDetails]);

    console.log(reportDetails);
    return (
        <Wrapper>
            <SeparatorWrapper>
                <ContentContainer>
                    <L.ControlsWrapper>
                        <L.ControlsContainer>
                            <span>Fecha: </span>
                            <input type='date' onChange={(event) => setDates({ ...dates, from: event.target.value })} value={dates.from} />
                            <input type='date' onChange={(event) => setDates({ ...dates, to: event.target.value })} value={dates.to} />
                            <Button loading={loading} onClick={handleClick} background='green' color='white'>
                                Enviar
                            </Button>
                        </L.ControlsContainer>
                    </L.ControlsWrapper>
                    {reportDetails && (
                        <L.ContentWrapper>
                            <L.LeftWrapper>
                                <L.SalesContainer>
                                    <L.CardContainer>
                                        <L.CardHeader>
                                            <h3>Ventas</h3>
                                        </L.CardHeader>
                                        <L.CardBody>
                                            <ReportTableContainer>
                                                {reportDetails.sale_report.length > 0 && (
                                                    <SalesReportTable
                                                        data={reportDetails.sale_report}
                                                        maxHeight='300px'
                                                        onFilter={() => {}}
                                                    />
                                                )}
                                            </ReportTableContainer>
                                        </L.CardBody>
                                    </L.CardContainer>
                                </L.SalesContainer>
                                <L.PaymentsContainer>
                                    <L.CardContainer>
                                        <L.CardHeader>
                                            <h3>Pagos</h3>
                                        </L.CardHeader>
                                        <L.CardBody>
                                            <ReportTableContainer>
                                                {reportDetails.payment_report.length > 0 && (
                                                    <PaymentsReportTable data={reportDetails.payment_report} maxHeight='200px' />
                                                )}
                                            </ReportTableContainer>
                                        </L.CardBody>
                                    </L.CardContainer>
                                    <L.CardContainer>
                                        <L.CardHeader>
                                            <h3>Deudas</h3>
                                        </L.CardHeader>
                                        <L.CardBody>
                                            <ReportTableContainer>
                                                {reportDetails.debt_report.length > 0 && (
                                                    <DebtsReportTable data={reportDetails.debt_report} maxHeight='200px' />
                                                )}
                                            </ReportTableContainer>
                                        </L.CardBody>
                                    </L.CardContainer>
                                </L.PaymentsContainer>
                                <div>
                                    <L.CardContainer>
                                        <L.CardHeader>
                                            <h3>Pagos de deudas</h3>
                                        </L.CardHeader>
                                        <L.CardBody>
                                            <ReportTableContainer>
                                                {reportDetails.debt_payment_report.length > 0 && (
                                                    <DebtPaymentsTable data={reportDetails.debt_payment_report} maxHeight='200px' />
                                                )}
                                            </ReportTableContainer>
                                        </L.CardBody>
                                    </L.CardContainer>
                                </div>
                                <L.DebtsContainer></L.DebtsContainer>
                            </L.LeftWrapper>
                            <L.RightWrapper>
                                <L.TopContainer>
                                    <L.CardContainer>
                                        <L.CardHeader>
                                            <h3>Productos más vendidos</h3>
                                        </L.CardHeader>
                                        <L.CardBody>
                                            {chartData && chartData.top_sell && (
                                                <div style={{ height: '200px' }}>
                                                    <ResponsiveBar
                                                        data={chartData.top_sell.reverse()}
                                                        layout='horizontal'
                                                        margin={{ left: 150, right: 10 }}
                                                        padding={0.7}
                                                        enableGridX
                                                        enableGridY
                                                    />
                                                </div>
                                            )}
                                        </L.CardBody>
                                    </L.CardContainer>
                                </L.TopContainer>
                                <L.CardContainer>
                                    <L.CardHeader>
                                        <h3>Horas más activas</h3>
                                    </L.CardHeader>
                                    <L.CardBody>
                                        {chartData && chartData.hourly_sales && (
                                            <div style={{ height: '200px' }}>
                                                <ResponsiveBar
                                                    data={chartData.hourly_sales}
                                                    margin={{ bottom: 45, top: 10 }}
                                                    valueFormat={(value) => (value > 0 ? value : '')}
                                                    axisBottom={{
                                                        tickSize: 10,
                                                        tickPadding: 5,
                                                        tickRotation: 0,
                                                        legend: 'Reloj 24 horas',
                                                        legendPosition: 'middle',
                                                        legendOffset: 35,
                                                    }}
                                                    enableGridX
                                                />
                                            </div>
                                        )}
                                    </L.CardBody>
                                </L.CardContainer>
                                <L.CardContainer>
                                    <L.CardHeader>
                                        <h3>Métodos de pago más usados</h3>
                                    </L.CardHeader>
                                    <L.CardBody>
                                        {chartData && chartData.payment && (
                                            <div style={{ height: '200px' }}>
                                                <ResponsivePie
                                                    data={chartData.payment}
                                                    margin={{ top: 20, bottom: 20, right: 100 }}
                                                    enableArcLinkLabels={true}
                                                    margin={{ top: 30, right: 20, bottom: 20, left: 20 }}
                                                    innerRadius={0.5}
                                                    padAngle={0.7}
                                                    cornerRadius={3}
                                                    activeOuterRadiusOffset={8}
                                                    borderWidth={1}
                                                    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                                                    arcLinkLabelsSkipAngle={10}
                                                    arcLinkLabelsTextColor='#333333'
                                                    arcLinkLabelsThickness={2}
                                                    arcLinkLabelsColor={{ from: 'color' }}
                                                    arcLabelsSkipAngle={10}
                                                    arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                                                />
                                            </div>
                                        )}
                                    </L.CardBody>
                                </L.CardContainer>
                            </L.RightWrapper>
                        </L.ContentWrapper>
                    )}
                </ContentContainer>
            </SeparatorWrapper>
            {notification && <Notification type={notification.type}>{notification.message}</Notification>}
        </Wrapper>
    );
};

export default ReportsPage;
