import axios from 'axios';

axios.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response.status === 500) {
            return {
                data: {
                    error: {
                        message: 'El servidor se encuentra offline',
                    },
                },
            };
        } else if (!error.response.data.error) {
            return {
                data: {
                    error: {
                        message: error.message,
                    },
                },
            };
        } else {
            return {
                data: error.response.data,
            };
        }
    }
);
