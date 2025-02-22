import { notFound } from "next/navigation";
import RestaurantsHeader from "./components/header";
import RestaurantCategories from "./components/categories";
import { db } from "@/lib/prisma";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ orderConsumptionMethod: string }>;
}

const isConsumptionMethodValid = (orderConsumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(orderConsumptionMethod.toUpperCase());
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { orderConsumptionMethod } = await searchParams;
  if (!isConsumptionMethodValid(orderConsumptionMethod)) {
    return notFound();
  }
  const restaurant = await db.restaurant.findUnique({
    where: { slug: slug },
    include: {
      menuCategories: {
        include: { products: true },
      },
    },
  });
  if (!restaurant) {
    return notFound();
  }
  return (
    <div>
      <RestaurantsHeader restaurant={restaurant} />
      <RestaurantCategories restaurant={restaurant} />
    </div>
  );
};

export default RestaurantMenuPage;
