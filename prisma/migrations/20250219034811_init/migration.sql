/*
  Warnings:

  - You are about to drop the column `preview` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Resume` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "github" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "linkedin" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "preview",
DROP COLUMN "title";
