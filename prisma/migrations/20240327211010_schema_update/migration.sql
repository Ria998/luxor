/*
  Warnings:

  - You are about to drop the `Collections` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Collections";

-- CreateTable
CREATE TABLE "bids" (
    "id" SERIAL NOT NULL,
    "collection_id" SERIAL NOT NULL,
    "price" MONEY NOT NULL,
    "user_id" SERIAL NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "bids_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collections" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" MONEY NOT NULL,

    CONSTRAINT "collections_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
