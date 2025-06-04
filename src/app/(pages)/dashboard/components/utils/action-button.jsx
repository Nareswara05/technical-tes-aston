//client component untuk action button seperti view, edit, delete
'use client'; 
import Link from 'next/link';
import { FiEye, FiEdit2 } from 'react-icons/fi';
import { FaRegTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

export const ViewButton = ({ href }) => (
    //href yang dapat diubah sesuai kebutuhan saat dipanggil di komponen lain
    <Link
        href={href}
        className="flex w-full justify-center items-center gap-1 p-3 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-100 transition"
    >
        <FiEye className="text-blue-600" />
    </Link>
);

export const DeleteButton = ({ title, message }) => {
    //alert yang akan muncul ketika tombol delete di klik, dan dapat di ubah title sesuai kebutuhan
    async function onDelete() {
        const result = await Swal.fire({
            title: `Apa Anda yakin ingin menghapus ${title}?`,
            text: `Anda tidak akan dapat mengembalikan ${title} ini!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
        });

        if (result.isConfirmed) {
            Swal.fire('Terhapus!', `${title} telah dihapus.`, 'success');
        }
    }

    return (
        <button
            onClick={onDelete}
            className="flex w-full justify-center items-center gap-1 p-3 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-100 transition"
        >
            <FaRegTrashAlt className="text-red-600" />
            {message}
        </button>
    );
};

export const EditButton = ({ href, messsage }) => (
    <Link
        //href yang dapat mengarah ke halaman edit, bisa diubah route nya sesuai kebutuhan
        href={href}
        className="flex w-full justify-center items-center gap-1 p-3 text-sm font-medium text-yellow-600 border border-yellow-600 rounded-lg hover:bg-yellow-100 transition"
    >
        <FiEdit2 className="text-yellow-600" />
        {messsage}
    </Link>
);
