import { notFound } from "next/navigation";
import RestaurantsHeader from "./components/header";
import RestaurantCategories from "./components/categories";
import { getMenusBySlug } from "@/data/get-menus-by-slug";

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
  const restaurant = await getMenusBySlug(slug);
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
