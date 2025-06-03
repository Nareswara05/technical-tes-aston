import Input from '@/app/components/input'
import React from 'react'
import Login from '../components/login'
import Image from 'next/image'
import { bgLogin } from '@/app/lib/utils/image'

export default function page() {
  return (
    <div className='flex justify-between flex-row items-center w-screen h-screen'>
      <Login/>
      <div className='max-w-[50%] hidden w-full h-full p-4  md:flex'>
        <Image
        src={bgLogin}
        alt="Background Login"
        className='w-full h-full object-cover rounded-2xl md:rounded-3xl'
        width={1000}
        height={1000}
        />
      </div>
    </div>

  )
}
