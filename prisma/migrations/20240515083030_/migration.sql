-- AlterTable
ALTER TABLE "profile" ALTER COLUMN "amountPaid" SET DEFAULT 0,
ALTER COLUMN "amountPaid" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "runTimeGranted" SET DEFAULT 0,
ALTER COLUMN "runTimeGranted" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "runTimeUsed" SET DEFAULT 0,
ALTER COLUMN "runTimeUsed" SET DATA TYPE DOUBLE PRECISION;