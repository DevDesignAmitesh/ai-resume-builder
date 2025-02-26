/*
  Warnings:

  - You are about to drop the column `apiDev` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `beSkills` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `db` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `feSkills` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `lang` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `versionCon` on the `Content` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Certificate" DROP CONSTRAINT "Certificate_contentId_fkey";

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "apiDev",
DROP COLUMN "beSkills",
DROP COLUMN "db",
DROP COLUMN "feSkills",
DROP COLUMN "lang",
DROP COLUMN "versionCon";

-- CreateTable
CREATE TABLE "Skills" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "items" TEXT[],
    "contentId" TEXT,

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
