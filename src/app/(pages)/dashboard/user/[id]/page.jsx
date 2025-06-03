import userDetailAPI from '@/app/lib/service/endpoint/user/userDetailAPI';
import Link from 'next/link';
import { FiArrowLeft, FiMail, FiMapPin, FiBriefcase, FiUser } from 'react-icons/fi';
import Image from 'next/image';

export default async function UserDetailPage({ params }) {
    //mengambil id berdasarkan params dari URL
    const { id } = params;
    const user = await userDetailAPI({ id });

    // Jika user tidak ditemukan, tampilkan pesan
    if (!user) {
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-semibold text-gray-800">Pengguna tidak ditemukan</h1>
                <Link
                    href="/dashboard/user"
                    className="mt-4 inline-flex items-center gap-1 text-blue-600 hover:underline text-sm"
                >
                    <FiArrowLeft className="text-base" />
                    Kembali ke daftar user
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full mx-auto p-6 bg-white border border-gray-200 rounded-2xl">
                <Link
                    href="/dashboard/user"
                    className="inline-flex items-center mb-6 gap-2 px-4 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 transition text-sm font-medium"
                >
                    <FiArrowLeft />
                    Kembali ke Daftar
                </Link>
            <div className="flex flex-col items-start gap-3 text-center mb-6">
                <Image
                    src={user.image}
                    alt="Avatar"
                    width={96}
                    height={96}
                    className="rounded-full object-cover border"
                />
                <div className='flex flex-col items-start'>
                    <h1 className="text-2xl font-semibold text-gray-800">{user.firstName} {user.lastName}</h1>
                    <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                </div>
            </div>

            {/* Info */}
            <div className="space-y-3 text-sm text-gray-700">
                <Detail label="Email" icon={<FiMail />} value={user.email} />
                <Detail label="Username" icon={<FiUser />} value={user.username} />
            </div>

            {/* Lokasi */}
            <div className="border-t mt-6 pt-4 text-sm text-gray-700">
                <h2 className="font-semibold text-gray-800 flex items-center gap-1 mb-1"><FiMapPin /> Alamat</h2>
                <p>{user.address.address}, {user.address.city}, {user.address.state}, {user.address.country} {user.address.postalCode}</p>
            </div>

            {/* Perusahaan */}
            <div className="border-t mt-6 pt-4 text-sm text-gray-700">
                <h2 className="font-semibold text-gray-800 flex items-center gap-1 mb-1"><FiBriefcase /> Pekerjaan</h2>
                <p>{user.company.title} @ {user.company.name}</p>
                <p><strong>Departemen:</strong> {user.company.department}</p>
            </div>

            {/* Back Button */}

        </div>
    );
}

// reusable detail component
function Detail({ label, value, icon }) {
    return (
        <div className="flex items-start gap-2">
            {icon && <span className="text-gray-500">{icon}</span>}
            <span className="w-24 font-medium text-gray-600">{label}</span>
            <span className=" font-medium text-gray-600">:</span>
            <span className="text-gray-900 break-words">{value}</span>
        </div>
    );
}
