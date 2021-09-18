const Selector = ({ paymentList = [], onChange, value }) => {
    return (
        <select value={value} onChange={onChange}>
            {paymentList.map((payment, index) => {
                return (
                    <option key={index} value={payment.cod}>
                        {payment.name}
                    </option>
                );
            })}
        </select>
    );
};

export default Selector;
