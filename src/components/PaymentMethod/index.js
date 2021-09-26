import Selector from './Selector';
import POS from './POS';
import Transfer from './Transfer';
import Cash from './Cash';

const PaymentMethods = { Selector, POS, Transfer, Cash, Paypal: 'div' };

export const paymentList = [
    { cod: 'Cash', name: 'Efectivo' },
    { cod: 'Transfer', name: 'Transferencia' },
    { cod: 'POS', name: 'POS' },
];

export default PaymentMethods;
