-- AlterTable
ALTER TABLE `Donor` MODIFY `status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'EXPIRED') NOT NULL DEFAULT 'PENDING';
