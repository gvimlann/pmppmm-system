/*
  Warnings:

  - You are about to drop the column `email_address` on the `Agent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Agent` DROP COLUMN `email_address`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL DEFAULT 'gvimlan@minedmind.my';
