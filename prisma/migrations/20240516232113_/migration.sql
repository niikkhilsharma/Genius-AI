/*
  Warnings:

  - You are about to drop the column `userId` on the `profile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "profile_userId_key";

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "userId";
