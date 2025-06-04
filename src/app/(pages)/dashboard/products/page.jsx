import { productsAPI } from '@/app/lib/service/endpoint/product/productAPI';
import React from 'react'
import CardProduct from './components/card-product';
import Link from 'next/link';

export default async function ProductsPage({ searchParams }) {

    const page = parseInt(searchParams?.page || '1');
    const search = searchParams.search || '';
    const limit = 10;
    const skip = (page - 1) * limit;

    const { products, total } = await productsAPI({ search, limit, skip });
    const totalPages = Math.ceil(total / limit);
    return (
        <div className='w-full flex flex-col gap-4'>
            <div className='flex items-center gap-4 flex-col w-full md:flex-row justify-between'>
                <form method="GET" action="/dashboard/products" className="w-full md:w-[40%]">
                    <input
                        type="text"
                        name="search"
                        defaultValue={search}
                        placeholder="Cari nama product atau kategori"
                        className="border  p-3  rounded-xl w-full sm:w-full text-sm text-primary "
                    />
                </form>
                <button className='bg-primary w-full md:w-fit hover:bg-blue-700 py-3 px-4 rounded-xl text-white font-medium'>
                   + Tambah Produk
                </button>
            </div>
            <div className='grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-5'>
                {products.length === 0 ? (
                    <div>
                        <h1 colSpan={5} className="text-center py-4 text-gray-500">
                            Data tidak ditemukan
                        </h1>
                    </div>
                ) : products.map((product) => (
                    <CardProduct
                        id={product.id}
                        key={product.id}
                        title={product.title}
                        img={product.thumbnail}
                        price={product.price}
                        rating={product.rating}
                        stock={product.stock}
                    />
                ))}
            </div>
            <div className="pt-6 pb-12 flex gap-2 justify-center flex-wrap">
                {page > 1 && (
                    <Link
                        href={`/dashboard/products?page=${page - 1}&search=${search}`}
                        className="px-3 py-2 border rounded-xl text-sm bg-white text-primary border-gray-300"
                    >
                        &lt;
                    </Link>
                )}

                {Array.from({ length: totalPages })
                    .map((_, i) => i + 1)
                    .filter((p) => Math.abs(p - page) <= 1)
                    .map((p) => (
                        <Link
                            key={p}
                            href={`/dashboard/products?page=${p}&search=${search}`}
                            className={`px-4 py-2 border rounded-xl text-sm transition ${p === page ? 'bg-primary text-white' : 'bg-white text-primary border-gray-300'
                                }`}
                        >
                            {p}
                        </Link>
                    ))}

                {page < totalPages && (
                    <Link
                        href={`/dashboard/products?page=${page + 1}&search=${search}`}
                        className="px-3 py-2 border rounded-xl text-sm bg-white text-primary border-gray-300"
                    >
                        &gt;
                    </Link>
                )}
            </div>
        </div>
    )
}
