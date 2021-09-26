export default function mapPaymentMethods(paymentMethodsArray = []) {
    const paymentMethods = paymentMethodsArray.map((paymentMethod) => {
        let display_name = paymentMethod.name;

        if (paymentMethod.name === 'Cash') {
            display_name = 'Efectivo';
        } else if (paymentMethod.name === 'Transfer') {
            display_name = 'Transferencia';
        }

        return {
            ...paymentMethod,
            display_name,
        };
    });
    paymentMethods.sort();

    return paymentMethods;
}
