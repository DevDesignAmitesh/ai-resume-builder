/*
  Warnings:

  - You are about to drop the column `orderId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "liveLink" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "orderId";
