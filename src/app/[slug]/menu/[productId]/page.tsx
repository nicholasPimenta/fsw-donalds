import { getProductsIdBySlug } from "@/data/get-productsId-by-slug";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductsHeader from "./components/productsHeader";

interface ProductsIdProps {
  params: Promise<{ slug: string, productId: string }>;
}

const ProductsId = async ({ params }: ProductsIdProps) => {
  const { slug, productId } = await params;
  const product = await getProductsIdBySlug(productId);
  if(!product) {
    return notFound();
  }
  return ( 
    <>
      <ProductsHeader product={product} />
      <h2>ID dos produtos</h2>
      <h3>{slug}</h3>
      <p>{productId}</p>
    </>
  );
}
 
export default ProductsId;