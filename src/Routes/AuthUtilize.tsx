import axios from 'axios';

export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        throw new Error('No refresh token available');
    }

    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_BASE_URL}/auth/refresh-token`, {
            refreshToken,
        });

        if (response.data) {
            localStorage.setItem('token', response.data.accessToken);
            return response.data.accessToken;
        }
    } catch (error) {
        console.error('Failed to refresh access token', error);
        throw error;
    }
};
