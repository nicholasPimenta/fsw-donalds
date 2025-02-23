import { formatCurrency } from "@/app/helpers/format-currency";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

interface ProductsProps {
  products: Product[]
}

const Products = ({ products }: ProductsProps) => {
  const { slug } = useParams< {slug: string} >();
  const searchParams = useSearchParams();
  const orderConsumptionMethod = searchParams.get("orderConsumptionMethod")
  return ( 
    <div className="space-y-3 px-5 py-3">
      {products.map(product => (
        <Link 
        key={product.id} 
        href={`/${slug}/menu/${product.id}?orderConsumptionMethod=${orderConsumptionMethod}`} 
        className="flex items-center justify-between border-b gap-10 py-3"
        >
          {/* Lado Esquerdo */}
          <div>
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
            <p className="pt-3 text-sm font-semibold">
              {formatCurrency(product.price)}
            </p>
          </div>

          {/* Lado Direito */}
          <div className="relative min-h-[82px] min-w-[120px]">
              <Image src={product.imageUrl} alt={product.name} fill className="rounded-lg object-contain" />
          </div>
        </Link>
      ))}
    </div>
   );
}
 
export default Products;