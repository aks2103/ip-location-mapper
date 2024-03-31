import axios from 'axios';

const API_KEY = 'c8fbec910d24e9';
const BASE_URL = 'https://ipinfo.io';

const getIpAddress = async () => {
    try {
        const response = await axios.get(`${BASE_URL}?token=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return null;
    }
};

export { getIpAddress };
