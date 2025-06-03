import instance from "../../instance/instance";

export async function productsAPI({ limit = 6, skip = 0, search = '' }) {
    try {
      const params = new URLSearchParams();
      params.append('limit', limit);
      params.append('skip', skip);
  
      let url = '';
      if (search) {
        url = `/products/search?q=${search}&limit=${limit}&skip=${skip}`;
      } else {
        url = `/products?${params.toString()}`;
      }
  
      const res = await instance.get(url);
      const products = res.data.products || res.data;
      const total = res.data.total || products.length;
  
      return { products, total };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
  