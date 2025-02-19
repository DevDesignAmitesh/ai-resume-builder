-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resume" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "githubLink" TEXT,
    "linkedinLink" TEXT,
    "twitterLink" TEXT,
    "experience" TEXT,
    "education" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "projects" TEXT NOT NULL,
    "jobTarget" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Resume_email_key" ON "Resume"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Resume_phoneNumber_key" ON "Resume"("phoneNumber");

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
