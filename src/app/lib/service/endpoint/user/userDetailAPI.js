import instance from "../../instance/instance";

export default async function userDetailAPI({id}) {
    try {
        const res = await instance.get(`/users/${id}`);
        return res.data;
    } catch (error) {
        console.error("Terjadi kesalahan saat mengambil detail pengguna:", error);
        throw error;
    }
}