import { getProductsIdBySlug } from "@/data/get-productsId-by-slug";
import { notFound } from "next/navigation";
import ProductsHeader from "./components/productsHeader";
import ProductsDetails from "./components/productsDetails";

interface ProductsIdProps {
  params: Promise<{ slug: string, productId: string }>;
}

const ProductsId = async ({ params }: ProductsIdProps) => {
  const { slug, productId } = await params;
  const product = await getProductsIdBySlug(productId);
  if(!product) {
    return notFound();
  }
  if(product.restaurant.slug.toUpperCase() !== slug.toUpperCase()) {
    return notFound();
  }
  return ( 
    <div className="flex h-full flex-col">
      <ProductsHeader product={product} />
      <ProductsDetails product={product} />
    </div>
  );
}
 
export default ProductsId;