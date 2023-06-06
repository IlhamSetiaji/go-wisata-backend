/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `email_verify_tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `email_verify_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `email_verify_tokens` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `email_verify_tokens_email_key` ON `email_verify_tokens`(`email`);
