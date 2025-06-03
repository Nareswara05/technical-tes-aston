import Image from 'next/image'
import React from 'react'
import { FiEdit2, FiEye } from 'react-icons/fi';
import { GoStarFill } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";


export default function CardProduct({ img, title, price, rating, stock }) {
    return (
        <div className='w-full rounded-xl bg-white p-3 md:p-4 flex flex-col gap-4'>
            <Image
                src={img}
                alt={title}
                className='w-full h-32 object-contain rounded-md'
                width={1000}
                height={1000}
            />
            <div className='flex flex-col h-full gap-1'>
                <h2 className='text-sm font-semibold text-textPrimary '>{title}</h2>
                <div className='h-full gap-2 justify-between flex flex-col'>
                    <div className='flex flex-row justify-between items-center'>
                        <span className='text-sm font-bold text-primary'>${price}</span>
                        <span className='text-xs text-yellow-400 flex items-center gap-1'>
                            <GoStarFill className='text-xs' />
                            {rating}
                        </span>
                    </div>
                    <h2 className='text-sm font-medium text-textPrimary'>Stock {stock}</h2>
                    <div className='flex gap-2 flex-row justify-between w-full'>
                        <button
                            className="flex w-full justify-center items-center gap-1 p-3 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-100 transition"
                        >
                            <FiEye className="text-blue-600" />
                        </button>
                        <button
                            className="flex w-full justify-center items-center gap-1 p-3 text-sm font-medium text-yellow-600 border border-yellow-600 rounded-lg hover:bg-yellow-100 transition"
                        >
                            <FiEdit2 className="text-yellow-600" />
                        </button>

                        <button
                            className="flex w-full justify-center items-center gap-1 p-3 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-100 transition"
                        >
                            <FaRegTrashAlt className="text-red-600" />
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
