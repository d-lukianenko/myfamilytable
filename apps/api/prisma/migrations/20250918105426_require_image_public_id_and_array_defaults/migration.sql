/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Recipe` table. All the data in the column will be lost.
  - The `tips` column on the `Recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `imagePublicId` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Recipe" DROP COLUMN "imageUrl",
ADD COLUMN     "imagePublicId" TEXT NOT NULL,
DROP COLUMN "tips",
ADD COLUMN     "tips" TEXT[] DEFAULT ARRAY[]::TEXT[];
