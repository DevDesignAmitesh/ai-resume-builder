/*
  Warnings:

  - You are about to drop the column `skills` on the `Content` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Content" DROP COLUMN "skills",
ADD COLUMN     "apiDev" TEXT[],
ADD COLUMN     "beSkills" TEXT[],
ADD COLUMN     "db" TEXT[],
ADD COLUMN     "feSkills" TEXT[],
ADD COLUMN     "lang" TEXT[],
ADD COLUMN     "versionCon" TEXT[];
