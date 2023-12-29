/*
  Warnings:

  - Added the required column `totalSlices` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rooms" ADD COLUMN     "totalSlices" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "slicesEaten" INTEGER NOT NULL DEFAULT 0;
