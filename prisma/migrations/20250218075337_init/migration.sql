/*
  Warnings:

  - You are about to drop the column `education` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `githubLink` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `jobTarget` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `linkedinLink` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `projects` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `twitterLink` on the `Resume` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Resume_email_key";

-- DropIndex
DROP INDEX "Resume_phoneNumber_key";

-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "education",
DROP COLUMN "email",
DROP COLUMN "experience",
DROP COLUMN "fullName",
DROP COLUMN "githubLink",
DROP COLUMN "jobTarget",
DROP COLUMN "linkedinLink",
DROP COLUMN "phoneNumber",
DROP COLUMN "projects",
DROP COLUMN "skills",
DROP COLUMN "twitterLink",
ADD COLUMN     "preview" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "skills" TEXT[],

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "description" TEXT[],

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "duration" TEXT NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tech" TEXT[],

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ContentToResume" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ContentToResume_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ContentToResume_B_index" ON "_ContentToResume"("B");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentToResume" ADD CONSTRAINT "_ContentToResume_A_fkey" FOREIGN KEY ("A") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentToResume" ADD CONSTRAINT "_ContentToResume_B_fkey" FOREIGN KEY ("B") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
