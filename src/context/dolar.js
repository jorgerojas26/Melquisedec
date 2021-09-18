import { useState, createContext } from 'react';

export const DolarContext = createContext(null);

const DolarContextProvider = ({ children }) => {
    const [currencyRates, setCurrencyRates] = useState();

    return <DolarContext.Provider value={{ currencyRates, setCurrencyRates }}>{children}</DolarContext.Provider>;
};
export default DolarContextProvider;
