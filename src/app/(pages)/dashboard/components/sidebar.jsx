"use client";

import Link from 'next/link';
import React from 'react';
import { GoPerson } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";
import { usePathname } from 'next/navigation';
import { CiLogout } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import { useSidebarStore } from '@/app/stores/sidebarStore';
import Swal from 'sweetalert2';

export default function MainSidebar() {
    const pathname = usePathname();
    const { isOpen, toggleSidebar, closeSidebar } = useSidebarStore();

    const menuItems = [
        { id: 1, label: "Data Pengguna", href: "/dashboard/user", icon: <GoPerson size={20} /> },
        { id: 2, label: "Data Produk", href: "/dashboard/products", icon: <IoCartOutline size={20} /> },
    ];

    const handleLogout = () => {
        // Hapus cookie
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "role_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // Redirect ke halaman login
        window.location.href = '/auth/login';
    };

    const confirmLogout = async () => {
        const result = await Swal.fire({
            title: `Apa Anda yakin ingin keluar?`,
            text: `Anda harus masuk kembali untuk mengakses halaman ini. Pastikan Anda telah menyimpan semua perubahan sebelum keluar.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Keluar!',
            cancelButtonText: 'Batal',
        });

        if (result.isConfirmed) {
            handleLogout();
        }

    }

    return (
        <>
            <div className={`md:hidden fixed z-50 top-0 left-0 w-full bg-white flex items-center justify-start p-4 border-b-2 ${isOpen ? 'hidden' : 'block'}`}>
                <button onClick={toggleSidebar}>
                    <FiMenu size={28} className="text-textPrimary" />
                </button>
            </div>

            {isOpen && (
                <div
                    onClick={closeSidebar}
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                />
            )}

            <div className={`
                fixed z-50 top-0 left-0 h-full w-[50%] max-w-xs bg-primary px-4 py-8 md:rounded-2xl flex flex-col justify-between 
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 md:static md:w-[30%] lg:w-[25%] 2xl:w-[20%]
            `}>
                <div className='flex flex-col gap-4'>
                    <h2 className="text-sm font-medium text-white">MENU UTAMA</h2>
                    <ul className="w-full mt-3 flex flex-col gap-2">
                        {menuItems.map((item) => (
                            <Link href={item.href} key={item.id} onClick={closeSidebar}>
                                <li
                                    className={`gap-3 flex items-center rounded-full p-4 cursor-pointer overflow-hidden text-white ${pathname === item.href ? "bg-white bg-opacity-10" : "hover:shadow-lg"}`}
                                >
                                    <div>{item.icon}</div>
                                    <span className='text-base font-normal truncate'>{item.label}</span>
                                </li>
                            </Link>
                        ))}
                    </ul>
                    <hr className='w-full' />
                </div>

                <button onClick={confirmLogout}>
                    <li className="gap-3 flex items-center rounded-full border hover:bg-white hover:bg-opacity-5 border-white p-4 cursor-pointer text-white">
                        <CiLogout size={20} />
                        <span className='text-base font-normal truncate'>Keluar</span>
                    </li>
                </button>
            </div>
        </>
    );
}
