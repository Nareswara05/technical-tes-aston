"use client";

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import Input from '@/app/components/input';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function EditProduct({ product, id }) {
    const router = useRouter();

    //state untuk menyimpan data form edit produk
    const [form, setForm] = useState({
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
        weight: product.weight,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        const result = await Swal.fire({
            title: `Apa Anda yakin ingin mengedit data ini??`,
            text: `Pastikan data yang Anda masukkan sudah benar sebelum menyimpan perubahan. Jika ada kesalahan, Anda dapat mengeditnya kembali. Setelah disimpan, perubahan tidak dapat dibatalkan.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
        });

        if (result.isConfirmed) {
            Swal.fire('Berhasil!', `Data Berhasil Diubah!`, 'success');
        }
    };

    return (
        <div className="w-full bg-white p-4 rounded-xl mx-auto">
            <Link
                href={`/dashboard/products/${id}`}
                className="inline-flex items-center mb-6 gap-2 px-4 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 transition text-sm font-medium"
            >
                <FiArrowLeft />
                Kembali
            </Link>
            <h1 className="text-2xl text-textPrimary font-semibold mb-4">Edit Produk</h1>
            <div className='flex flex-col gap-3 mb-5'>
                <Input
                    label="Judul Produk"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Masukkan nama produk"
                />
                <Input
                    label="Deskripsi"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Masukkan deskripsi produk"
                />
                <Input
                    label="Harga"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Masukkan harga"
                />
                <Input
                    label="Stok"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="Masukkan stok"
                />
                <Input
                    label="Berat (gram)"
                    name="weight"
                    value={form.weight}
                    onChange={handleChange}
                    placeholder="Masukkan berat"
                />
            </div>

            <button
                onClick={handleSubmit}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition"
            >
                Simpan Perubahan
            </button>
        </div>
    );
}