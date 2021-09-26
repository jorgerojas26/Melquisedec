const Selector = ({ paymentList = [], onChange, value }) => {
    return (
        <select value={value} onChange={onChange}>
            {paymentList.map((payment, index) => {
                return (
                    <option key={payment.id} value={payment.id}>
                        {payment.display_name}
                    </option>
                );
            })}
        </select>
    );
};

export default Selector;
