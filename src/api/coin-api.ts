const BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchCoins = async (currency: string, perPage: number, page: number) => {
    const response = await fetch(`${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};