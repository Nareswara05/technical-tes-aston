"use client";
import { hand } from '@/app/lib/utils/svg';
import { useCurrentUserStore } from '@/app/stores/currentUserStore';
import Image from 'next/image';
import React from 'react';

export default function WelcomeGreetings() {
    // Menggunakan store untuk mendapatkan data pengguna saat ini
    const user = useCurrentUserStore((state) => state.user);
    const isLoading = user === null;


    return (
        <div className='flex items-center gap-2'>
            {isLoading ? (
                <>
                    <div className="w-48 h-8 md:w-64 md:h-10 bg-gray-200 animate-pulse rounded"></div>
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 animate-pulse rounded-full" />
                </>
            ) : (
                <>
                    {/* Jika data pengguna sudah tersedia, tampilkan pesan selamat datang berdasarkan nama pengguna */}
                    <h1 className="font-bold text-left text-textPrimary text-xl md:text-3xl">
                        Selamat Datang, <span className='text-primary'>{user?.firstName} {user?.lastName}</span>
                    </h1>
                    <Image src={hand} alt="Hand Icon" className="w-12 h-12 md:w-16 md:h-16" />
                </>
            )}
        </div>
    );
}
