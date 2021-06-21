import axios from 'axios';

axios.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.status === 500) {
            console.log('jelouda');
            return {
                data: {
                    error: {
                        message: 'El servidor se encuentra offline',
                    },
                },
            };
        } else if (!error.response.data.error) {
            console.log('jelouda2');
            return {
                data: {
                    error: {
                        message: error.message,
                    },
                },
            };
        } else {
            console.log('jelouda3');
            return {
                data: error.response.data,
            };
        }
    }
);
