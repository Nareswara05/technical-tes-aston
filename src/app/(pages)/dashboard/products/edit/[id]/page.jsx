import productsDetailAPI from "@/app/lib/service/endpoint/product/productDetailAPI";
import EditProduct from "../components/edit-product";

export default async function EditProductPage({ params }) {
  const { id } = params;
  const product = await productsDetailAPI({ id });

  return <EditProduct id={id} product={product} />;
}