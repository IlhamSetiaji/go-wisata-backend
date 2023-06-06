/*
  Warnings:

  - The primary key for the `email_verify_tokens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `email_verify_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `email_verify_tokens` table. All the data in the column will be lost.
  - The primary key for the `password_reset_tokens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `password_reset_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `password_reset_tokens` table. All the data in the column will be lost.
  - Added the required column `email` to the `email_verify_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `password_reset_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `email_verify_tokens` DROP FOREIGN KEY `email_verify_tokens_userId_fkey`;

-- DropForeignKey
ALTER TABLE `password_reset_tokens` DROP FOREIGN KEY `password_reset_tokens_userId_fkey`;

-- AlterTable
ALTER TABLE `email_verify_tokens` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `userId`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `password_reset_tokens` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `userId`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;
