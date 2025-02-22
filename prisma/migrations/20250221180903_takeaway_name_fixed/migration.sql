/*
  Warnings:

  - The values [TAKEABAY] on the enum `OrderConsumptionMethod` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderConsumptionMethod_new" AS ENUM ('TAKEAWAY', 'DINE_IN');
ALTER TABLE "Order" ALTER COLUMN "consumptionMethod" TYPE "OrderConsumptionMethod_new" USING ("consumptionMethod"::text::"OrderConsumptionMethod_new");
ALTER TYPE "OrderConsumptionMethod" RENAME TO "OrderConsumptionMethod_old";
ALTER TYPE "OrderConsumptionMethod_new" RENAME TO "OrderConsumptionMethod";
DROP TYPE "OrderConsumptionMethod_old";
COMMIT;
