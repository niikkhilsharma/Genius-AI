/*
  Warnings:

  - You are about to drop the column `allRunTime` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `amountPaid` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `paidOn` on the `profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profile" DROP COLUMN "allRunTime",
DROP COLUMN "amountPaid",
DROP COLUMN "paidOn",
ADD COLUMN     "totalAmountPaid" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "profile_userId_key" ON "profile"("userId");
