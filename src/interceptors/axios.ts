import axios from 'axios';

const refreshAccessToken = async () => {
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

axios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await refreshAccessToken();
                axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed', refreshError);
                // Handle the error, e.g., logout user 
            }
        }
        return Promise.reject(error);
    }
);
