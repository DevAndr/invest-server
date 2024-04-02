-- CreateTable
CREATE TABLE "ProfileOnPost" (
    "postId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfileOnPost_postId_key" ON "ProfileOnPost"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileOnPost_profileId_key" ON "ProfileOnPost"("profileId");

-- AddForeignKey
ALTER TABLE "ProfileOnPost" ADD CONSTRAINT "ProfileOnPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileOnPost" ADD CONSTRAINT "ProfileOnPost_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
