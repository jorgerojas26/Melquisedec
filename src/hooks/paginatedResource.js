import { useState, useEffect, useCallback } from 'react';

export const usePaginatedResource = ({ page, filter, fetching }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchResource = useCallback(async () => {
        setLoading(true);
        const data = await fetching({ page, filter });
        if (data.error) {
            setError({ path: null, message: data.error.message });
            setLoading(false);
            return;
        }
        setData(data);
        setLoading(false);
    }, [page, filter, fetching]);

    useEffect(() => {
        fetchResource();
    }, [page, filter, fetchResource]);

    return { data, loading, error, fetchResource };
};
