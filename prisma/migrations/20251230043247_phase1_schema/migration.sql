/*
  Warnings:

  - You are about to drop the `Decision` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "OutcomeType" AS ENUM ('positive', 'neutral', 'negative');

-- DropTable
DROP TABLE "Decision";

-- CreateTable
CREATE TABLE "decisions" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "chosen" TEXT NOT NULL,
    "confidence" INTEGER NOT NULL,
    "reasoning" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "decisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outcomes" (
    "id" TEXT NOT NULL,
    "decisionId" TEXT NOT NULL,
    "type" "OutcomeType" NOT NULL,
    "description" TEXT NOT NULL,
    "timeCost" INTEGER,
    "lesson" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "outcomes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_replays" (
    "id" TEXT NOT NULL,
    "decisionId" TEXT NOT NULL,
    "analysis" TEXT NOT NULL,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_replays_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "decisions_userId_idx" ON "decisions"("userId");

-- CreateIndex
CREATE INDEX "outcomes_decisionId_idx" ON "outcomes"("decisionId");

-- CreateIndex
CREATE INDEX "ai_replays_decisionId_idx" ON "ai_replays"("decisionId");

-- AddForeignKey
ALTER TABLE "decisions" ADD CONSTRAINT "decisions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outcomes" ADD CONSTRAINT "outcomes_decisionId_fkey" FOREIGN KEY ("decisionId") REFERENCES "decisions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_replays" ADD CONSTRAINT "ai_replays_decisionId_fkey" FOREIGN KEY ("decisionId") REFERENCES "decisions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
