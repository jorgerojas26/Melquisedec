import { useState, useMemo, useEffect } from 'react';

import { getRecentSupplyings } from 'api/product_variants';

import Table from 'components/Table';

import { COLUMNS } from './columns.js';

const RecentSupplyingsTable = ({ product_variant_id, onLoad }) => {
    const memoizedColumns = useMemo(() => COLUMNS, []);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchRecentSupplyings = async () => {
            if (product_variant_id) {
                setLoading(true);
                const response = await getRecentSupplyings({ page: 1, count: 5, product_variant_id });
                setData(response);
                onLoad(response.records);
                setLoading(false);
            }
        };

        fetchRecentSupplyings();
    }, [product_variant_id]);

    return <Table loading={loading} data={data.records} columns={memoizedColumns} capitalize={[0]} />;
};

export default RecentSupplyingsTable;
