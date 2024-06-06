/*
  Warnings:

  - You are about to drop the column `availableRunTime` on the `profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profile" DROP COLUMN "availableRunTime",
ADD COLUMN     "runTimeUsed" DOUBLE PRECISION NOT NULL DEFAULT 0;
