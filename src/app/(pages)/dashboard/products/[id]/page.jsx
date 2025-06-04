import Image from 'next/image';
import { GoStarFill } from 'react-icons/go';
import productsDetailAPI from '@/app/lib/service/endpoint/product/productDetailAPI';
import Link from 'next/link';
import { FiArrowLeft, FiEdit } from 'react-icons/fi';
import { MdDelete, MdDeleteOutline } from "react-icons/md";
import Swal from 'sweetalert2';
import { DeleteButton, EditButton } from '../../components/utils/action-button';




export default async function ProductDetailPage({ params}) {
    const { id } = params;
    const product = await productsDetailAPI({ id });

   

    return (
        <div className="w-full text-sm text-textPrimary">
            <Link
                href="/dashboard/products"
                className="inline-flex items-center mb-6 gap-2 px-4 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 transition text-sm font-medium"
            >
                <FiArrowLeft />
                Kembali ke Daftar
            </Link>
            {product ? (
                <div className="flex flex-col gap-6 bg-white  rounded-xl overflow-hidden lg:flex-row">
                    {/* Left: Images */}
                    <div className="w-full lg:w-1/2 bg-gray-50 p-4 flex flex-col items-center justify-center">
                        <Image
                            src={product.thumbnail}
                            alt={product.title}
                            width={100000}
                            height={100000}
                            className="w-full h-auto object-contain max-h-[400px] rounded-md"
                        />
                        {/* Optional thumbnails/slider here */}
                    </div>

                    {/* Right: Product Info */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-between p-4 md:p-6">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900 leading-snug mb-2">
                                {product.title}
                            </h1>
                            <div className="flex items-center gap-1 text-yellow-500 mb-3">
                                {[...Array(Math.floor(product.rating))].map((_, i) => (
                                    <GoStarFill key={i} className="w-4 h-4" />
                                ))}
                                {product.rating % 1 !== 0 && (
                                    <div className="relative w-4 h-4">
                                        <GoStarFill className="text-yellow-300 absolute inset-0" />
                                        <div
                                            className="absolute top-0 left-0 overflow-hidden"
                                            style={{ width: `${(product.rating % 1) * 100}%` }}
                                        >
                                            <GoStarFill className="text-yellow-500" />
                                        </div>
                                    </div>
                                )}
                                <span className="text-xs text-gray-500 ml-2">({product.rating} / 5)</span>
                            </div>
                            <p className="text-gray-600 mb-4 leading-snug">
                                {product.description}
                            </p>
                            <div className="text-2xl font-bold text-green-600 mb-4">
                                ${product.price}
                            </div>

                            <ul className="space-y-1 text-sm text-gray-700 mb-6">
                                <li><b>Stok:</b> <span className={product.stock > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>{product.stock > 0 ? 'Tersedia' : 'Habis'} ({product.stock} Unit)</span></li>
                                <li><b>Kategori:</b> {product.category}</li>
                                <li><b>Merk:</b> {product.brand}</li>
                                <li><b>SKU:</b> {product.sku}</li>
                                <li><b>Berat:</b> {product.weight}g</li>
                                <li><b>Dimensi:</b> {product.dimensions?.width || '-'} x {product.dimensions?.height || '-'} x {product.dimensions?.depth || '-'} cm</li>
                            </ul>
                            <hr className='w-full mb-4' />
                            <div className='flex flex-col gap-3 sm:flex-row items-center w-full md:gap-6'>
                                <EditButton
                                messsage={'Edit Produk'}
                                />
                                <DeleteButton
                                title={'Produk'}
                                message ={'Hapus Produk'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-10 bg-white  rounded-xl text-red-500">
                    Produk tidak ditemukan.
                </div>
            )}

            {product && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                    {/* Informasi Tambahan */}
                    <div className="bg-white  rounded-xl p-4 md:p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                            Informasi Tambahan
                        </h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <li><b>Status:</b>{' '}<span className={product.availabilityStatus === 'In Stock' ? 'text-green-600' : 'text-red-600'}>{product.availabilityStatus}</span></li>
                            <li><b>Garansi:</b> {product.warrantyInformation || '-'}</li>
                            <li><b>Pengiriman:</b> {product.shippingInformation || '-'}</li>
                            <li><b>Kebijakan Retur:</b> {product.returnPolicy || '-'}</li>
                            <li><b>Minimal Pembelian:</b> {product.minimumOrderQuantity || '-'}</li>
                            <li><b>Barcode:</b> {product.meta?.barcode || '-'}</li>
                            <li className="col-span-full">
                                <p className="font-semibold mb-1">QR Code:</p>
                                {product.meta?.qrCode ? (
                                    <div className="w-24 h-24 p-1  rounded bg-white">
                                        <Image src={product.meta.qrCode} alt="QR Code" width={100} height={100} className="w-full h-full object-contain" />
                                    </div>
                                ) : (
                                    <div className="w-24 h-24 flex items-center justify-center border border-dashed border-gray-300 rounded text-gray-400 text-xs">
                                        Tidak Ada
                                    </div>
                                )}
                            </li>
                        </ul>
                    </div>

                    {/* Ulasan Pembeli */}
                    <div className="bg-white  rounded-xl p-4 md:p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                            Ulasan Pembeli ({product.reviews?.length || 0})
                        </h2>
                        {product.reviews && product.reviews.length > 0 ? (
                            <div className="space-y-4">
                                {product.reviews.map((review, i) => (
                                    <div key={i} className="text-sm text-gray-700 border-b border-gray-100 pb-3 last:border-none">
                                        <div className="flex gap-1 text-yellow-500 mb-1">
                                            {[...Array(review.rating)].map((_, j) => (
                                                <GoStarFill key={j} className="w-3.5 h-3.5" />
                                            ))}
                                        </div>
                                        <p className="italic mb-1">"{review.comment}"</p>
                                        <p className="text-xs text-gray-500">
                                            - <span className="font-medium">{review.reviewerName}</span>,{' '}
                                            {new Date(review.date).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">Belum ada ulasan untuk produk ini.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
