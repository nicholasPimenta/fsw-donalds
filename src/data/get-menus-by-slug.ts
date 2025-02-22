import { db } from "@/lib/prisma";

export const getMenusBySlug = async ( slug: string ) => {
  const restaurantMenus = await db.restaurant.findUnique({
    where: { slug: slug },
    include: {
      menuCategories: {
        include: { products: true },
      },
    },
  });
  return restaurantMenus;
}