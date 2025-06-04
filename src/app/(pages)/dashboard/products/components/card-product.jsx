import Image from 'next/image'
import React from 'react'
import { FiEdit2, FiEye } from 'react-icons/fi';
import { GoStarFill } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import Link from 'next/link';
import { DeleteButton, EditButton, ViewButton } from '../../components/utils/action-button';


export default function CardProduct({ img, title, price, rating, stock, id }) {
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
                        <span className='text-xs font-bold text-yellow-400 flex items-center gap-1'>
                            <GoStarFill className='text-xs' />
                            {rating}
                        </span>
                    </div>
                    <h2 className='text-sm font-medium text-textPrimary'>Stock {stock}</h2>
                    <div className='flex gap-2 flex-row justify-between w-full'>
                        <ViewButton
                            href={`/dashboard/products/${id}`}
                        />
                        <EditButton />
                        <DeleteButton
                            title={'produk'}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}
