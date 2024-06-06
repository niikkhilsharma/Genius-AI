/*
  Warnings:

  - You are about to drop the column `userId` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the `costing` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "profile_userId_key";

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "userId",
ADD COLUMN     "requestRunning" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "runTimeUsed" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "costing";
