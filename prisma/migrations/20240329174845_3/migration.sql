-- AlterTable
ALTER TABLE "Investment" ADD COLUMN     "postId" TEXT;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "image" BYTEA;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
