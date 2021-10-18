import { useState, useEffect, useCallback } from 'react';

export const usePaginatedResource = ({ page = 1, filter = '', fetching, count, fetchOnMount = true }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchResource = useCallback(async () => {
        setLoading(true);
        const data = await fetching({ page, filter, count });
        if (data.error) {
            setError({ path: null, message: data.error.message });
            setLoading(false);
            return;
        }
        setData(data);
        setLoading(false);
    }, [page, filter, fetching, count]);

    useEffect(() => {
        if (fetchOnMount) fetchResource();
    }, [page, filter, fetchResource, count, fetchOnMount]);

    return { data, setData, loading, error, fetchResource };
};
