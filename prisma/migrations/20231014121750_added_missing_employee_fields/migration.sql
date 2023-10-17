/*
  Warnings:

  - Added the required column `title` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "quote" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;
