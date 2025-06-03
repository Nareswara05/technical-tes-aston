import { create } from 'zustand';
import Swal from 'sweetalert2';
import LoginAPI from '../lib/service/endpoint/auth/loginAPI';


export const useLoginStore = create((set) => ({
    // State untuk menyimpan form data, error messages, dan loading state
    form: {
        username: '',
        password: '',
    },
    errors: {},
    loading: false,

    // Functions yang akan dipanggil jika ada perubahan pada form
    setField: (name, value) =>
        set((state) => ({
            form: { ...state.form, [name]: value },
            errors: { ...state.errors, [name]: '' },
        })),
    //Function untuk mengatur validasi form
    validate: () => {
        const { username, password } = useLoginStore.getState().form;
        const errors = {};
        if (!username) errors.username = 'Username wajib diisi';
        if (!password) errors.password = 'Password wajib diisi';
        set({ errors });
        return Object.keys(errors).length === 0;
    },
    // Function untuk mengatur loading state
    login: async () => {
        const { form } = useLoginStore.getState();
        const valid = useLoginStore.getState().validate();
        if (!valid) return;

        set({ loading: true });

        try {
            // Memanggil API login dengan data form
            const result = await LoginAPI(form);
            // Jika status 401 atau 400, tampilkan error
            if (result?.status === 401 || result?.status === 400) {
                Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                }).fire({
                    icon: 'error',
                    title: 'Terjadi kesalahan saat login. Periksa username dan password Anda.',
                });
                //jika tidak ada error tampilkan alert login berhasil
            } else {
                Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                }).fire({
                    icon: 'success',
                    title: 'Login berhasil',
                });
                // Simpan token ke localStorage dan redirect ke dashboard
                localStorage.setItem('token', result.accessToken);
                setTimeout(() => {
                    window.location.href = '/dashboard/user';
                }, 1500);
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Terjadi Kesalahan',
                text: err.message,
            });
        } finally {
            // Set loading state ke false setelah proses selesai
            set({ loading: false });
        }
    },
}));
