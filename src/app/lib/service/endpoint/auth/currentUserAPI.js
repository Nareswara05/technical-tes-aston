import instance from "@/app/lib/service/instance/instance";

export default async function CurrentUserAPI() {
    try {
        const res = await instance.get('/auth/me');
        return res.data;
    } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data pengguna:", error);
        throw error;
    }
}