import instance from "../../instance/instance";

export async function usersAPI({ limit = 6, skip = 0, search = '' }) {
    try {
        // Mengatur nilai default untuk limit dan skip jika tidak diberikan
        const params = new URLSearchParams();
        params.append('limit', limit);
        params.append('skip', skip);

        // Membuat URL berdasarkan parameter yang diberikan
        let url = '';
        if (search) {
            url = `/users/search?q=${search}&limit=${limit}&skip=${skip}`;
        } else {
            url = `/users?${params.toString()}`;
        }
        // Mengambil data pengguna dari API
        const res = await instance.get(url);
        const users = res.data.users || res.data;
        const total = res.data.total || users.length;

        return { users, total };
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}
