'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import Input from '@/app/components/input';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function AddProduct() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    weight: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    weight: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error saat diketik
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = 'Judul produk wajib diisi';
    if (!form.description.trim()) newErrors.description = 'Deskripsi wajib diisi';
    if (!form.price.trim()) newErrors.price = 'Harga wajib diisi';
    if (!form.stock.trim()) newErrors.stock = 'Stok wajib diisi';
    if (!form.weight.trim()) newErrors.weight = 'Berat wajib diisi';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Produk baru akan ditambahkan.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Ya, tambah!',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      try {
       //fetch API akan dilakukan disini

        Swal.fire('Berhasil!', 'Produk berhasil ditambahkan.', 'success');
        router.push('/dashboard/products');
      } catch (err) {
        Swal.fire('Gagal!', 'Terjadi kesalahan saat menambahkan produk.', 'error');
      }
    }
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl mx-auto">
      <Link
        href="/dashboard/products"
        className="inline-flex items-center mb-6 gap-2 px-4 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 transition text-sm font-medium"
      >
        <FiArrowLeft />
        Kembali
      </Link>

      <h1 className="text-2xl text-textPrimary font-semibold mb-4">Tambah Produk Baru</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-5">
        <Input
          label="Judul Produk"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Masukkan nama produk"
          error={errors.title}
        />
        <Input
          label="Deskripsi"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Masukkan deskripsi produk"
          error={errors.description}
        />
        <Input
          label="Harga"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Masukkan harga"
          error={errors.price}
        />
        <Input
          label="Stok"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Masukkan stok"
          error={errors.stock}
        />
        <Input
          label="Berat (gram)"
          name="weight"
          value={form.weight}
          onChange={handleChange}
          placeholder="Masukkan berat"
          error={errors.weight}
        />

        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition"
        >
          Tambah Produk
        </button>
      </form>
    </div>
  );
}
