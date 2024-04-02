/*
  Warnings:

  - You are about to drop the `ProfileOnPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProfileOnPost" DROP CONSTRAINT "ProfileOnPost_postId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileOnPost" DROP CONSTRAINT "ProfileOnPost_profileId_fkey";

-- DropTable
DROP TABLE "ProfileOnPost";
