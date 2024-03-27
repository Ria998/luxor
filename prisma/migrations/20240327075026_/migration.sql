-- CreateTable
CREATE TABLE "Collections" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "test4" BIGINT NOT NULL DEFAULT 32,

    CONSTRAINT "Collections_pkey" PRIMARY KEY ("id")
);
