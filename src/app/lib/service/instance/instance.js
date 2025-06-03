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


export default instance;
