import { useState, useEffect } from 'react';

export const useClients = (initialState) => {
    const [clientList, setClientList] = useState(initialState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setClientList([
            {
                id: '1',
                name: 'Jorge Rojas',
                ced: '24233306',
                phoneNumber: '04124192604',
                createdAt: new Date().toLocaleString('es-VE'),
            },
            {
                id: '2',
                name: 'Diana Camero',
                ced: '25664798',
                phoneNumber: '04124192604',
                createdAt: new Date().toLocaleString('es-VE'),
            },
            {
                id: '3',
                name: 'Esteban Rojas',
                ced: '35478965',
                phoneNumber: '04124192604',
                createdAt: new Date().toLocaleString('es-VE'),
            },
            {
                id: '4',
                name: 'Jorge Rojas',
                ced: '24233306',
                phoneNumber: '04124192604',
                createdAt: new Date().toLocaleString('es-VE'),
            },
            {
                id: '5',
                name: 'Jorge Rojas',
                ced: '24233306',
                phoneNumber: '04124192604',
                createdAt: new Date().toLocaleString('es-VE'),
            },
            {
                id: '6',
                name: 'Jorge Rojas',
                ced: '24233306',
                phoneNumber: '04124192604',
                createdAt: new Date().toLocaleString('es-VE'),
            },
            {
                id: '7',
                name: 'Jorge Rojas',
                ced: '24233306',
                phoneNumber: '04124192604',
                createdAt: new Date().toLocaleString('es-VE'),
            },
            {
                id: '8',
                name: 'Jorge Rojas',
                ced: '24233306',
                phoneNumber: '04124192604',
                createdAt: new Date().toLocaleString('es-VE'),
            },
            {
                id: '9',
                name: 'Jorge Rojas',
                ced: '24233306',
                phoneNumber: '04124192604',
                createdAt: new Date().toLocaleString('es-VE'),
            },
            {
                id: '10',
                name: 'Jorge Rojas',
                ced: '24233306',
                phoneNumber: '04124192604',
                createdAt: new Date().toLocaleString('es-VE'),
            },
            {
                id: '11',
                name: 'Jorge Rojas',
                ced: '24233306',
                phoneNumber: '04124192604',
                createdAt: new Date().toLocaleString('es-VE'),
            },
            {
                id: '12',
                name: 'Jorge Rojas',
                ced: '24233306',
                phoneNumber: '04124192604',
                createdAt: new Date().toLocaleString('es-VE'),
            },
            {
                id: '13',
                name: 'Jorge Rojas',
                ced: '24233306',
                phoneNumber: '04124192604',
                createdAt: new Date().toLocaleString('es-VE'),
            },
            {
                id: '14',
                name: 'Jorge Rojas',
                ced: '24233306',
                phoneNumber: '04124192604',
                createdAt: new Date().toLocaleString('es-VE'),
            },
            {
                id: '15',
                name: 'Jorge Rojas',
                ced: '24233306',
                phoneNumber: '04124192604',
                createdAt: new Date().toLocaleString('es-VE'),
            },
        ]);
        setLoading(false);
    }, []);

    return { clientList, loading };
};
