/*
  Warnings:

  - You are about to drop the column `totalRuntime` on the `profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profile" DROP COLUMN "totalRuntime",
ADD COLUMN     "runtimeRecieved" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalAmountUsed" DOUBLE PRECISION NOT NULL DEFAULT 0;
