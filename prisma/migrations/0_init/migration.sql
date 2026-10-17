-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomepageContent" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "heroTitle" TEXT NOT NULL,
    "heroSubtitle" TEXT NOT NULL,
    "heroDescription" TEXT NOT NULL,
    "heroBackgroundType" TEXT NOT NULL,
    "heroBackgroundImage" TEXT NOT NULL,
    "heroBackgroundVideo" TEXT NOT NULL,
    "statsJson" TEXT NOT NULL,
    "featuresJson" TEXT NOT NULL,
    "ctaTitle" TEXT NOT NULL,
    "ctaDescription" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomepageContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutContent" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "heading" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imagesJson" TEXT NOT NULL,
    "videosJson" TEXT NOT NULL,
    "achievementsJson" TEXT NOT NULL,
    "mission" TEXT NOT NULL,
    "vision" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "galleryJson" TEXT NOT NULL,
    "video" TEXT,
    "seoTitle" TEXT NOT NULL,
    "seoDescription" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "bulletsJson" TEXT NOT NULL,
    "benefitsJson" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortfolioProject" (
    "id" SERIAL NOT NULL,
    "projectName" TEXT NOT NULL,
    "categoryJson" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "beforeImagesJson" TEXT NOT NULL,
    "afterImagesJson" TEXT NOT NULL,
    "videosJson" TEXT NOT NULL,
    "completionDate" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "details" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortfolioProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryItem" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GalleryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" SERIAL NOT NULL,
    "clientName" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "image" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faq" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactInfo" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "businessName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsApp" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "googleMapsEmbedUrl" TEXT NOT NULL,
    "googleMapsLink" TEXT NOT NULL,
    "openingHoursJson" TEXT NOT NULL,
    "socialLinksJson" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeoSettings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "keywords" TEXT NOT NULL,
    "canonical" TEXT NOT NULL,
    "ogImage" TEXT NOT NULL,
    "robots" TEXT NOT NULL,
    "schemaJsonLd" TEXT NOT NULL,
    "sitemap" TEXT,
    "robotsTxt" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SeoSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebsiteSettings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "logoUrl" TEXT NOT NULL,
    "faviconUrl" TEXT NOT NULL,
    "footerCopyright" TEXT NOT NULL,
    "themeSettingsJson" TEXT NOT NULL,
    "analyticsId" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WebsiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

