/*
  Warnings:

  - You are about to drop the column `runTimeGranted` on the `profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profile" DROP COLUMN "runTimeGranted",
ADD COLUMN     "allRunTime" DOUBLE PRECISION[] DEFAULT ARRAY[]::DOUBLE PRECISION[],
ADD COLUMN     "apiCallCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "availableRunTime" DOUBLE PRECISION NOT NULL DEFAULT 0;
