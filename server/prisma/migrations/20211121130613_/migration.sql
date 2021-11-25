/*
  Warnings:

  - You are about to drop the column `suspended` on the `Agent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Agent` DROP COLUMN `suspended`,
    ADD COLUMN `status` ENUM('ACTIVE', 'SUSPENDED') NOT NULL DEFAULT 'ACTIVE';
