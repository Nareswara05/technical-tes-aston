import { usersAPI } from '@/app/lib/service/endpoint/user/userAPI';
import Link from 'next/link';
import { FiEye } from 'react-icons/fi';

export default async function DashboardUserPage({ searchParams }) {

  // Mengambil parameter pencarian dari URL
  const page = parseInt(searchParams?.page || '1');
  const search = searchParams?.search || '';
  const limit = 6;
  const skip = (page - 1) * limit;
  // Memanggil API untuk mendapatkan data pengguna
  const { users, total } = await usersAPI({ limit, skip, search });
  const totalPages = Math.ceil(total / limit);


  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <form method="GET" action="/dashboard/user" className="w-full sm:w-auto">
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Cari nama atau email"
              className="border  px-3 py-2 rounded-xl w-full sm:w-80 text-sm text-primary"
            />
          </form>
        </div>
      </div>

      <div className="w-full overflow-x-auto min-w-[4px]">
        <div className="min-w-[700px] overflow-hidden">
          <table className="w-full text-sm border border-gray-200 rounded-xl">
            <thead className="bg-gray-50 text-primary text-left overflow-x-hidden">
              <tr>
                <th className="px-4 py-3 border whitespace-nowrap">Nama Lengkap</th>
                <th className="px-4 py-3 border whitespace-nowrap">Email</th>
                <th className="px-4 py-3 border whitespace-nowrap">Gender</th>
                <th className="px-4 py-3 border whitespace-nowrap">Tanggal Lahir</th>
                <th className="px-4 py-3 border whitespace-nowrap">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    Data tidak ditemukan
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-b last:border-b-0">
                    <td className="px-4 py-3 whitespace-nowrap text-textPrimary">{user.firstName}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-textPrimary">{user.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-textPrimary capitalize">{user.gender || 'N/A'}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-textPrimary">{user.birthDate}</td>
                    <td className="px-4 py-3 text-center space-x-3 text-sm">
                      <Link
                        href={`/dashboard/user/${user.id}`}
                        className="flex items-center gap-1 p-2 w-fit font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-100 transition"
                      >
                        <FiEye className="text-blue-600" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex gap-2 justify-center flex-wrap">
        {page > 1 && (
          <Link
            href={`/dashboard/user?page=${page - 1}&search=${search}`}
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
              href={`/dashboard/user?page=${p}&search=${search}`}
              className={`px-4 py-2 border rounded-xl text-sm transition ${
                p === page ? 'bg-primary text-white' : 'bg-white text-primary border-gray-300'
              }`}
            >
              {p}
            </Link>
          ))}

        {page < totalPages && (
          <Link
            href={`/dashboard/user?page=${page + 1}&search=${search}`}
            className="px-3 py-2 border rounded-xl text-sm bg-white text-primary border-gray-300"
          >
            &gt;
          </Link>
        )}
      </div>
    </div>
  );
}
