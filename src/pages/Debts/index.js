import { useState } from 'react';

import * as L from 'components/CommonLayout/main.layout';
import DebtsTable from 'components/ModuleTables/DebtsTable';
import SaleDetailsModal from 'components/ModuleModals/SaleDetailsModal';
import Toolbar from 'components/Toolbar';
import Button from 'components/Button';
import { colors } from 'styles/theme';
import { Eye } from 'phosphor-react';

const DebtsPage = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [debtDetails, setDebtDetails] = useState(null);
    const [CRUDAction, setCRUDAction] = useState(null);

    return (
        <L.Wrapper>
            <L.SeparatorWrapper>
                <L.ContentContainer>
                    <L.ToolbarContainer>
                        <Toolbar recordSelected={debtDetails}>
                            <div>
                                <Button
                                    onClick={() => setShowDetails(true)}
                                    background={colors.primary}
                                    color='white'
                                    disabled={!debtDetails}
                                >
                                    <Eye size='24' />
                                    Ver Detalles
                                </Button>
                            </div>
                        </Toolbar>
                    </L.ToolbarContainer>
                    <L.TableContainer>
                        <DebtsTable
                            onShowDetailsClick={(debtDebtails) => {
                                setDebtDetails(debtDebtails);
                                setShowDetails(true);
                            }}
                            selectedRows={debtDetails}
                            onDebtSelect={setDebtDetails}
                            shouldRefresh={CRUDAction === 'refresh'}
                            onError={() => {}}
                        />
                    </L.TableContainer>
                </L.ContentContainer>
            </L.SeparatorWrapper>
            {showDetails && (
                <SaleDetailsModal
                    show={showDetails}
                    details={debtDetails && debtDetails.sale}
                    onClose={() => setShowDetails(false)}
                    onPayment={() => setCRUDAction('refresh')}
                />
            )}
        </L.Wrapper>
    );
};

export default DebtsPage;
