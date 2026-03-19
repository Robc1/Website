-- CreateTable
CREATE TABLE "Habit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "unit" TEXT NOT NULL DEFAULT 'Day',
    "frequency" INTEGER NOT NULL DEFAULT 1,
    "days" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT 'blue',
    "completion" INTEGER NOT NULL DEFAULT 0,
    "monthProgress" INTEGER NOT NULL DEFAULT 0,
    "yearProgress" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
