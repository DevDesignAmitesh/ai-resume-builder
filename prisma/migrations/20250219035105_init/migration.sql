/*
  Warnings:

  - You are about to drop the column `github` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `Content` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "github" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "linkedin" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "github",
DROP COLUMN "linkedin";
