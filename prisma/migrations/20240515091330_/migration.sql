/*
  Warnings:

  - You are about to drop the column `runTimeUsed` on the `profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profile" DROP COLUMN "runTimeUsed",
ADD COLUMN     "totalRuntime" DOUBLE PRECISION NOT NULL DEFAULT 0;
