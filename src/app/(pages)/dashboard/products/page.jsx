//halaman ssr
import { getCategoriesAPI, productsAPI } from '@/app/lib/service/endpoint/product/productAPI';
import ListProduct from './components/list-product';

export default async function ProductsPage({ searchParams }) {
    // Mengambil parameter pencarian dari URL
  const page = parseInt(searchParams?.page || '1');
  const search = searchParams?.search || '';
  const category = searchParams?.category || '';
  const limit = 10;
  const skip = (page - 1) * limit;

    // Memanggil API untuk mendapatkan data produk dan kategori
  const [{ products, total }, categories] = await Promise.all([
    productsAPI({ search, limit, skip, category }),
    getCategoriesAPI()
  ]);

  return (
    // render list produk 
    <ListProduct
      products={products}
      total={total}
      page={page}
      limit={limit}
      search={search}
      category={category}
      categoryList={categories}
    />
  );
}
