//client component yang akan di render di server side
'use client';

import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CardProduct from './utils/card-product';

export default function ListProduct({
    products,
    total,
    page,
    limit,
    search,
    category,
    categoryList,
}) {
    //Merender list produk dan mengatur pagination
    const [selectedCategory, setSelectedCategory] = useState(category);
    const router = useRouter();
    const searchParams = useSearchParams();
    const totalPages = Math.ceil(total / limit);

    //fungsi untuk handle kategori yang dipilih
    const handleCategoryChange = (e) => {
        const selected = e.target.value;
        const params = new URLSearchParams(searchParams);
        if (selected) {
            params.set('category', selected);
        } else {
            params.delete('category');
        }
        router.push(`/dashboard/products?${params.toString()}`);
    };

    //fungsi untuk menyimpan kategori yang dipilih di dropdown
    useEffect(() => {
        setSelectedCategory(category);
    }, [category]);

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className='flex flex-col md:flex-row items-center gap-4 w-full'>
                    <form method="GET" action="/dashboard/products" className="w-full md:w-[40%]">
                        <input
                            type="text"
                            name="search"
                            defaultValue={search}
                            placeholder="Cari nama product atau kategori"
                            className="border p-3 rounded-xl w-full text-sm text-primary"
                        />
                    </form>
                    {/* komponen dropdown kategori untuk memilih kategori produk */}
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="p-3  border rounded-xl w-full md:w-[20%] text-sm text-textPrimary"
                    >
                        <option value="">Semua Kategori</option>
                        {categoryList.map((cat) => (
                            <option key={cat.slug} value={cat.slug}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="bg-primary min-w-max w-full md:w-fit hover:bg-blue-700 py-3 px-4 rounded-xl text-white font-medium">
                    + Tambah Produk
                </button>
            </div>

            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
                {products.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500 py-4">
                        Data tidak ditemukan
                    </div>
                ) : (
                    products.map((product) => (
                        <CardProduct key={product.id} {...product} />
                    ))
                )}
            </div>
            {/* pagination */}
            <div className="pt-6 pb-12 flex gap-2 justify-center flex-wrap">
                {page > 1 && (
                    <Link
                        href={`/dashboard/products?page=${page - 1}&search=${search}&category=${category}`}
                        className="px-3 py-2 border rounded-xl text-sm bg-white text-primary border-gray-300"
                    >
                        &lt;
                    </Link>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => Math.abs(p - page) <= 1)
                    .map((p, index) => (
                        <Link
                            key={index}
                            href={`/dashboard/products?page=${p}&search=${search}&category=${category}`}
                            className={`px-4 py-2 border rounded-xl text-sm transition ${p === page ? 'bg-primary text-white' : 'bg-white text-primary border-gray-300'
                                }`}
                        >
                            {p}
                        </Link>
                    ))}

                {page < totalPages && (
                    <Link
                        href={`/dashboard/products?page=${page + 1}&search=${search}&category=${category}`}
                        className="px-3 py-2 border rounded-xl text-sm bg-white text-primary border-gray-300"
                    >
                        &gt;
                    </Link>
                )}
            </div>
        </div>
    );
}
