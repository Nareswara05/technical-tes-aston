import instance from "../../instance/instance";

export default async function productsDetailAPI({id}) {
    try {
        // Memanggil API untuk mendapatkan detail produk berdasarkan ID
        const res = await instance.get(`/products/${id}`);
        return res.data;
    } catch (error) {
        console.error("Terjadi kesalahan saat mengambil detail produk:", error);
        throw error;
    }
}