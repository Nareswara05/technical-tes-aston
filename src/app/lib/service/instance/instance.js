import axios from "axios";

const instance = axios.create({
    // membuat base url untuk dipanggil secara global
    baseURL: 'https://dummyjson.com',
    headers: {
        "Content-Type": "application/json",
        // mengambil token dari localStorage saat authorization dibutuhkan
        'Authorization': `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}`,
        Accept: "application/json",
    },
});

//jika token expired maka otomatis akan menghapus token dari localStorage dan cookies, lalu redirect ke halaman login
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            
            setTimeout(() => {
                // menghapus token dari cookies dan localStorage
                document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                localStorage.removeItem('token');
        
                window.location.href = '/auth/login';
            }, 2000); 
        }
        return Promise.reject(error);
    }
);



export default instance;
