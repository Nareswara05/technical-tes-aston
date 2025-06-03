'use client';

import React from 'react';
import Input from '@/app/components/input';
import { hand } from '@/app/lib/utils/svg';
import Image from 'next/image';
import { useLoginStore } from '@/app/stores/loginStore';

export default function Login() {
    // Menggunakan custom store untuk mengelola state login
  const { form, errors, setField, login, loading } = useLoginStore();

  return (
    <div className="flex flex-col justify-center items-center w-full md:w-[50%] gap-8 px-4 md:px-12 xl:px-20 2xl:px-36">
      <div className="w-full">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-left text-textPrimary text-lg md:text-3xl">Selamat Datang</h1>
          <Image src={hand} alt="Hand Icon" className="w-12 h-12 md:w-16 md:h-16" />
        </div>
        <h1 className="font-medium text-left text-gray-500 text-sm md:text-base">
          Silakan masukkan username dan password anda untuk mengakses akun
        </h1>
      </div>

      <div className="w-full flex flex-col gap-2">
        <div className="flex flex-col gap-4 w-full">
          <Input
            label="Username"
            type="text"
            name="username"
            placeholder="Masukkan username anda"
            value={form.username}
            onChange={(e) => setField('username', e.target.value)}
            error={errors.username}
            ifPassword={false}
          />
          <Input
            label="Kata Sandi"
            type="password"
            name="password"
            placeholder="Masukkan Kata Sandi Anda"
            value={form.password}
            onChange={(e) => setField('password', e.target.value)}
            error={errors.password}
            ifPassword={true}
          />
        </div>

        <div className="w-full flex justify-start">
          <div className="flex items-center flex-row-reverse gap-2">
            <label htmlFor="rememberMe" className="text-textPrimary">Ingat Saya</label>
            <input type="checkbox" className="w-4 h-4 accent-primary" id="rememberMe" name="rememberMe" />
          </div>
        </div>
      </div>

      <button
        onClick={login}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-white hover:bg-opacity-90 disabled:opacity-60"
      >
        {/* Tampilkan state loading jika sedang memproses login */}
        {loading ? (
          <>
            <span>Memproses...</span>
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
          </>
        ) : (
          'Masuk'
        )}
      </button>
    </div>
  );
}
