import { useState, createContext } from "react";

export const DolarContext = createContext(null);

const DolarContextProvider = ({ children }) => {
    const [dolarValue, setDolarValue] = useState();

    return <DolarContext.Provider value={{ dolarValue, setDolarValue }}>{children}</DolarContext.Provider>;
};
export default DolarContextProvider;
