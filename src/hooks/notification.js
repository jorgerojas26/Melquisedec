import { useState, useCallback } from "react";
let timeout;

export const useNotification = (initialState) => {
    const [notification, setNotification] = useState(initialState);

    const showNotification = useCallback((type, text, expiration = 2000) => {
        if (timeout) clearTimeout(timeout);
        setNotification({ type, text });
        timeout = setTimeout(() => {
            setNotification(null);
        }, expiration);
    }, []);

    return { notification, showNotification };
};
