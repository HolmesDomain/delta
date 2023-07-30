-- CreateTable
CREATE TABLE "Dealer" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "address" TEXT,
    "rating" TEXT,
    "yelpID" TEXT,
    "updated" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Dealer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Summary" (
    "updated" TIMESTAMP(3) NOT NULL,
    "summary" TEXT NOT NULL,
    "dealerId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Rating" (
    "source" TEXT NOT NULL,
    "dealerId" INTEGER NOT NULL,
    "rating" TEXT NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Dealer_yelpID_key" ON "Dealer"("yelpID");

-- CreateIndex
CREATE UNIQUE INDEX "Summary_dealerId_key" ON "Summary"("dealerId");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_dealerId_key" ON "Rating"("dealerId");

-- AddForeignKey
ALTER TABLE "Summary" ADD CONSTRAINT "Summary_dealerId_fkey" FOREIGN KEY ("dealerId") REFERENCES "Dealer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_dealerId_fkey" FOREIGN KEY ("dealerId") REFERENCES "Dealer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
