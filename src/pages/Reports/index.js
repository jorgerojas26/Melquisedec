import { useEffect, useState } from 'react';
import { Wrapper, SeparatorWrapper, ContentContainer } from 'components/CommonLayout/main.layout';
import * as L from './layout.styles.js';
import ProductsTable from 'components/ModuleTables/SalesControlTable';
import { DateTime } from 'luxon';
import Button from 'components/Button';

const ReportsPage = () => {
    const [dates, setDates] = useState({
        from: DateTime.now().toISODate(),
        to: DateTime.now().toISODate(),
    });

    const [reportDetails, setReportDetails] = useState(true);

    const handleClick = async (event) => {
        event.preventDefault();
    };

    return (
        <Wrapper>
            <SeparatorWrapper>
                <ContentContainer>
                    <L.ControlsWrapper>
                        <L.ControlsContainer>
                            <span>Fecha: </span>
                            <input type='date' onChange={(event) => setDates({ ...dates, from: event.target.value })} value={dates.from} />
                            <input type='date' onChange={(event) => setDates({ ...dates, to: event.target.value })} value={dates.to} />
                            <Button onClick={handleClick} background='green' color='white'>
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
                                            <L.TableContainer>
                                                <ProductsTable
                                                    maxHeight='200px'
                                                    onFilter={() => {}}
                                                    products={[
                                                        {
                                                            name: 'Cafe Della Nonna 200g',
                                                            converted_price: {
                                                                PRICE_VES: '5.08',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'Mantequilla Deline 250g',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'Mantequilla Deline 250g',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'Mantequilla Deline 250g',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'Mantequilla Deline 250g',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'Mantequilla Deline 250g',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'Mantequilla Deline 250g',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'Mantequilla Deline 250g',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'Mantequilla Deline 250g',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'Mantequilla Deline 250g',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'Mantequilla Deline 250g',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'Mantequilla Deline 250g',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'Mantequilla Deline 250g',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'Mantequilla Deline 250g',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'Mantequilla Deline 250g',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'AAAAAAAAAAAAAA',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                    ]}
                                                />
                                            </L.TableContainer>
                                        </L.CardBody>
                                    </L.CardContainer>
                                </L.SalesContainer>
                                <L.PaymentsContainer>
                                    <L.CardContainer>
                                        <L.CardHeader>
                                            <h3>Pagos</h3>
                                        </L.CardHeader>
                                        <L.CardBody>
                                            <L.TableContainer>
                                                <ProductsTable
                                                    maxHeight='200px'
                                                    products={[
                                                        {
                                                            name: 'Cafe Della Nonna 200g',
                                                            converted_price: {
                                                                PRICE_VES: '5.08',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'Mantequilla Deline 250g',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'Mantequilla Deline 250g',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'Mantequilla Deline 250g',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'Mantequilla Deline 250g',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'Mantequilla Deline 250g',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'Mantequilla Deline 250g',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'Mantequilla Deline 250g',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'Mantequilla Deline 250g',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'Mantequilla Deline 250g',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'Mantequilla Deline 250g',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'Mantequilla Deline 250g',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'Mantequilla Deline 250g',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'Mantequilla Deline 250g',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'Mantequilla Deline 250g',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                        {
                                                            name: 'AAAAAAAAAAAAAA',
                                                            converted_price: {
                                                                PRICE_VES: '4.35',
                                                            },
                                                            quantity: 2,
                                                        },
                                                    ]}
                                                />
                                            </L.TableContainer>
                                        </L.CardBody>
                                    </L.CardContainer>
                                    <L.CardContainer>
                                        <L.CardHeader></L.CardHeader>
                                        <L.CardBody></L.CardBody>
                                    </L.CardContainer>
                                </L.PaymentsContainer>
                                <L.DebtsContainer>
                                    <L.CardContainer>
                                        <L.CardHeader>
                                            <h2>Deudas</h2>
                                        </L.CardHeader>
                                    </L.CardContainer>
                                </L.DebtsContainer>
                            </L.LeftWrapper>
                            <L.RightWrapper>
                                <L.TopContainer>
                                    <L.CardContainer>
                                        <L.CardHeader>
                                            <h2>Top 5 productos</h2>
                                        </L.CardHeader>
                                    </L.CardContainer>
                                </L.TopContainer>
                            </L.RightWrapper>
                        </L.ContentWrapper>
                    )}
                </ContentContainer>
            </SeparatorWrapper>
        </Wrapper>
    );
};

export default ReportsPage;
