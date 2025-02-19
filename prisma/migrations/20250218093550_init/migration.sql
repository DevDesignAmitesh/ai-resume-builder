/*
  Warnings:

  - You are about to drop the `_ContentToResume` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ContentToResume" DROP CONSTRAINT "_ContentToResume_A_fkey";

-- DropForeignKey
ALTER TABLE "_ContentToResume" DROP CONSTRAINT "_ContentToResume_B_fkey";

-- DropTable
DROP TABLE "_ContentToResume";

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
