import React, {useEffect, useState} from 'react';
import {fetchCoins} from "../api/coin-api";

export const useCoinFetch = (currency: string, perPage: number, page: number) => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchCoins(currency, perPage, page);
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currency, perPage, page]);

    return { data, isLoading, error };
};