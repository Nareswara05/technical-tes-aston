// src/app/lib/service/endpoint/product/productAPI.js
import instance from '../../instance/instance';

export async function productsAPI({ limit = 10, skip = 0, search = '', category = '' }) {
  try {
    let url = '';

    // Membuat URL berdasarkan parameter yang diberikan
    if (search) {
      url = `/products/search?q=${search}&limit=${limit}&skip=${skip}`;
    } else if (category) {
      url = `/products/category/${category}?limit=${limit}&skip=${skip}`;
    } else {
      url = `/products?limit=${limit}&skip=${skip}`;
    }

    // Mengambil data produk dari API
    const res = await instance.get(url);
    const products = res.data.products || res.data;
    const total = res.data.total || products.length;

    return { products, total };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

//fungsi untuk memanggil list API category
export async function getCategoriesAPI() {
  try {
    const res = await instance.get('/products/categories');
    return res.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}
