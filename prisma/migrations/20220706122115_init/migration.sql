-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('User', 'Admin');

-- CreateEnum
CREATE TYPE "UserLoginStatus" AS ENUM ('Offline', 'Active', 'Idle');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "roles" "UserRole"[] DEFAULT ARRAY['User']::"UserRole"[],
    "activityStatus" "UserLoginStatus" NOT NULL DEFAULT 'Offline',
    "password" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
