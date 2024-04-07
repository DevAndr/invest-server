-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('BINANCE', 'BYBIT', 'TINKOFF');

-- CreateTable
CREATE TABLE "Tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expireAt" TIMESTAMP(3) NOT NULL,
    "platform" "Platform" NOT NULL,

    CONSTRAINT "Tokens_pkey" PRIMARY KEY ("id")
);
