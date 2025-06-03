"use client"
import React, { useEffect } from 'react'
import MainSidebar from './components/sidebar'
import WelcomeGreetings from './components/welcome-greetings'
import CurrentUserAPI from '@/app/lib/service/endpoint/auth/currentUserAPI';
import { useCurrentUserStore } from '@/app/stores/currentUserStore';

export default function LayoutDashboard({ children }) {
  const setUser = useCurrentUserStore((state) => state.setUser);
  // memanggil CurrentUserAPI untuk mendapatkan data pengguna saat ini dan menyimpannya di store
  useEffect(() => {
    const fetchUser = async () => {
      const user = await CurrentUserAPI();
      if (user) setUser(user);
    };
    fetchUser();
  }, [setUser]);
  return (
    <div className='flex flex-col md:flex-row w-screen overflow-y-hidden bg-bgWhite h-screen md:p-4 items-start gap-8 '>
      <MainSidebar />
      <div className="flex h-screen overflow-y-auto w-full flex-col pt-16 md:pt-0 px-4 md:px-0 gap-4 ">
        <WelcomeGreetings />
        <div className="">
          {children}
        </div>
      </div>
    </div>
  )
}
