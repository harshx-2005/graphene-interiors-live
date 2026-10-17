import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Admin User
  const adminEmail = "admin@example.com";
  const existingUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingUser) {
    const passwordHash = await bcrypt.hash("admin@123", 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash,
      },
    });
    console.log("Admin user created (admin@example.com / admin@123)");
  } else {
    console.log("Admin user already exists");
  }

  // 2. Homepage Content
  const homepageStats = [
    { value: "10+", label: "Years Experienced Fitters" },
    { value: "Level 2", label: "City & Guilds Joiners" },
    { value: "5 Star", label: "Client Rating" }
  ];

  const homepageFeatures = [
    {
      title: "Direct Trading / Best Value",
      desc: "No middle-man markup. We procure fixtures at trade prices and transfer the savings directly to you."
    },
    {
      title: "City & Guilds Level 2",
      desc: "Our fitters have qualified joinery backgrounds to ensure cabinets, worktops, and trims align flush."
    },
    {
      title: "Lifetime Hardware Warranty",
      desc: "We utilize Hettich and Blum soft-close fittings to promise decades of durable usage."
    },
    {
      title: "Leicester Based & Trusted",
      desc: "Responsive local joiners. If you ever need adjustments, we are just a quick phone call away."
    }
  ];

  await prisma.homepageContent.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      heroTitle: "Transforming Houses Into Beautiful Living Spaces",
      heroSubtitle: "Leicester's Master Joiners",
      heroDescription: "Premium Kitchens, Bespoke Wardrobes, Media Walls & Full Interior Transformations across Leicester and the Midlands.",
      heroBackgroundType: "image",
      heroBackgroundImage: "/images/projects/hero_wood_kitchen.jpg",
      heroBackgroundVideo: "/videos/manufacturing.mp4",
      statsJson: JSON.stringify(homepageStats),
      featuresJson: JSON.stringify(homepageFeatures),
      ctaTitle: "Let's Build Your Dream Home Interiors",
      ctaDescription: "Book your free design visit or consult with Arshad today. Our Leicester joinery shop constructs bespoke units designed around you.",
    },
  });
  console.log("Homepage content seeded");

  // 3. About Page Content
  const aboutAchievements = [
    "City & Guilds Carpentry & Joinery Level 2 Certification",
    "10+ Years Active On-Site Installation Experience in the Midlands",
    "Official UK Limited Incorporation (Active from 2024)",
    "Own factory and professional machinery",
    "Onsite cutting for precise, flush fitments",
    "Separate showroom to view collections"
  ];

  const aboutValues = [
    {
      title: "City & Guilds Qualified",
      desc: "Every cut, joint, and trim is performed by certified level 2 joiners. We do not compromise on structural carpentry details."
    },
    {
      title: "Honest Trade Pricing",
      desc: "We cut out the sales reps. By sourcing materials directly and designing on-site, we deliver luxury results without retail price markup."
    },
    {
      title: "Family Care & Attentiveness",
      desc: "As Arshad's review notes, we are dedicated to listening to our clients and bringing their unique home visions to life seamlessly."
    },
    {
      title: "5-Year Guarantee",
      desc: "We stand behind our installations. Our cabinets and sliding mechanisms carry structural guarantees to offer peace of mind."
    }
  ];

  await prisma.aboutContent.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      heading: "Driven by Passion, Built for Leicestershire Families",
      description: "Founded by veteran joiner Arshad, Graphene Interiors Ltd was incorporated in 2024 to bring premium quality interior carpentry directly to Leicester homes. We specialize in supply-and-fit kitchens, sliding wardrobe sets, and bespoke custom units. Our company operates on a simple principle: outstanding value for money. We bypass retail sales staff and flat-pack kit limitations. Instead, we use trade-only cabinet suppliers, hand-fit custom drawers, and create bespoke spaces with a truly high-end, luxury finish.",
      imagesJson: JSON.stringify(["/images/projects/sliding_wardrobe_dark.jpg"]),
      videosJson: JSON.stringify(["/videos/manufacturing.mp4"]),
      achievementsJson: JSON.stringify(aboutAchievements),
      mission: "To eliminate wasted space. We construct fitted joinery that matches the contour of Leicester properties, ensuring maximum storage depth and visual elegance at a fraction of high-street showroom prices.",
      vision: "To be recognized as Leicester's top-tier brand for luxury kitchen renovations and bespoke wardrobes, noted for Arshad's signature attentiveness and unmatched structural durability.",
    },
  });
  console.log("About content seeded");

  // 4. Contact Information
  const contactOpeningHours = [
    { day: "Monday – Saturday", hours: "9:00 AM – 6:00 PM" },
    { day: "Sunday", hours: "Closed" }
  ];

  const contactSocialLinks = {
    instagram: "https://instagram.com/graphene_interiorsltd",
    whatsapp: "https://wa.me/447438199369",
    facebook: "",
  };

  await prisma.contactInfo.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      businessName: "Graphene Interiors Ltd",
      phone: "+44 7438 199369",
      email: "grapheneinteriors@gmail.com",
      whatsApp: "+44 7438 199369",
      address: "48 Chesterfield Road, Leicester, LE5 5LF, United Kingdom",
      googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2404.1485699479374!2d-1.0970365842880796!3d52.63750057983693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48776101c5f3e9c7%3A0xe54d3bf9cbb87b1e!2s48%20Chesterfield%20Rd%2C%20Leicester%20LE5%205LF%2C%20UK!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk",
      googleMapsLink: "https://maps.app.goo.gl/XA3LVLXqt3mLuN7A6",
      openingHoursJson: JSON.stringify(contactOpeningHours),
      socialLinksJson: JSON.stringify(contactSocialLinks),
    },
  });
  console.log("Contact info seeded");

  // 5. Website Settings
  const defaultTheme = {
    primaryColor: "#111827",
    secondaryColor: "#F8F8F8",
    accentColor: "#748f6e",
    darkMode: true
  };

  await prisma.websiteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      logoUrl: "/images/logo.png",
      faviconUrl: "/images/logo.jpg",
      footerCopyright: "Graphene Interiors Ltd. All Rights Reserved. Company Registered in UK (2024).",
      themeSettingsJson: JSON.stringify(defaultTheme),
      analyticsId: "",
    },
  });
  console.log("Website settings seeded");

  // 6. Global SEO Settings
  await prisma.seoSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      title: "Graphene Interiors Ltd | Luxury Kitchens & Bespoke Fitted Wardrobes Leicester",
      description: "UK-based luxury interiors and renovation company specializing in custom kitchens, wardrobes, sliding wardrobes, media walls, and worktops in Leicester. 15+ years experience. City & Guilds qualified.",
      keywords: "kitchen fitters Leicester, luxury kitchens Leicester, fitted wardrobes Leicester, sliding wardrobes Leicester, media walls Leicester, bespoke furniture Leicester, interior renovations Leicester, Graphene Interiors",
      canonical: "https://www.grapheneinteriors.com",
      ogImage: "/images/projects/modern_kitchen_beige.jpg",
      robots: "index, follow",
      schemaJsonLd: "",
      sitemap: "",
      robotsTxt: "",
    },
  });
  console.log("SEO settings seeded");

  // 7. Services
  const initialServices = [
    {
      slug: "kitchens",
      title: "Luxury Kitchens",
      headline: "Bespoke Fitted Kitchens & Complete Kitchen Renovations Built Around Your Lifestyle",
      shortDescription: "Bespoke high-end kitchen installations and full renovation transformations, covering plumbing, gas, electrical, and master joinery.",
      description: "We design, supply, and professionally install premium kitchens tailored to your lifestyle. From handleless gloss-finish cabinet doors and custom-built islands with waterfall quartz worktop edges to complete end-to-end renovations, moving plumbing feeds, Gas Safe certified cooker fittings, and NICEIC certified wiring—our Leicester joinery team handles every minor detail with expert craftsmanship.",
      image: "/images/projects/kitchen_beige_angle3.jpg",
      galleryJson: JSON.stringify(["/images/projects/modern_kitchen_grey.jpg", "/images/projects/modern_kitchen_beige.jpg"]),
      video: "/videos/manufacturing.mp4",
      bulletsJson: JSON.stringify([
        "Bespoke layout design incorporating island seating, sink runs, and integrated appliances",
        "Premium soft-close drawer runs and German-engineered Blum or Hettich hinges",
        "Full project management including plumbing, Gas Safe installations, and electrical wiring",
        "Professional carpentry and joinery ensuring cabinets, worktops, and trims align flush"
      ]),
      benefitsJson: JSON.stringify([
        "Bespoke luxury designs",
        "Full renovation & fitting",
        "German soft-close hinges",
        "5-Year installation warranty"
      ]),
      seoTitle: "Luxury Fitted Kitchens & Renovations Leicester | Graphene Interiors Ltd",
      seoDescription: "We design, supply, and professionally install premium kitchens tailored to your lifestyle in Leicester.",
      order: 0,
    },
    {
      slug: "kitchen-renovations",
      title: "Full Kitchen Renovations",
      headline: "Complete End-to-End Kitchen Transformations",
      shortDescription: "Complete kitchen teardowns and transformations. We handle plumbing, gas fitting, tiling, plastering, and custom joinery.",
      description: "A full kitchen renovation requires more than cabinet fitting. We manage the entire project lifecycle. We tear down old structures, perform structural plastering, move plumbing feeds, wire NICEIC electrical points, lay underfloor heating, and tile splashbacks.",
      image: "/images/projects/modern_kitchen_grey.jpg",
      galleryJson: JSON.stringify(["/images/projects/modern_kitchen_grey.jpg"]),
      video: null,
      bulletsJson: JSON.stringify([
        "Full site cleanup and removal of old partition walls",
        "Gas Safe certified plumbing for stove hubs and boilers",
        "NICEIC electrical wiring for ceiling spotlights and ovens",
        "Plastering, painting, and custom porcelain floor tiling"
      ]),
      benefitsJson: JSON.stringify([
        "Gas Safe Certified work",
        "NICEIC certified electrics",
        "Full project coordination",
        "15+ Years renovation experience"
      ]),
      seoTitle: "Kitchen Renovations Leicester | Complete Kitchen Redesigns",
      seoDescription: "A full kitchen renovation requires more than cabinet fitting. We manage the entire project lifecycle in Leicester.",
      order: 1,
    },
    {
      slug: "fitted-wardrobes",
      title: "Fitted Wardrobes",
      headline: "Custom Shaker, Modern Hinged & Silent Sliding Wardrobe Closets",
      shortDescription: "Classic shaker and contemporary fitted wardrobe closets custom-measured to align flush against Leicester bedroom walls.",
      description: "Maximize every square inch of your bedroom storage. Our bespoke fitted wardrobes are custom-built to fit flush against your plaster walls, wrapping around sloped ceilings, irregular chimney breasts, and tight alcoves to leave zero wasted space. Whether you prefer classic shaker doors, high-gloss hinged cabinets, walk-in closets, or contemporary sliding mirrored glass panels running on premium silent tracks, we deliver the perfect solution.",
      image: "/images/projects/walkin_wardrobe_corner_angle2.jpg",
      galleryJson: JSON.stringify(["/images/projects/fitted_wardrobe_desk.jpg"]),
      video: null,
      bulletsJson: JSON.stringify([
        "Bespoke bedroom framing custom-built around sloped ceilings and chimney breasts",
        "A range of styles including classic shaker doors, flat gloss fronts, and oak accents",
        "Premium sliding glass, tinted mirror, or board panels on silent, heavy-duty track runs",
        "Custom internal configurations: shoe racks, pull-out dressing drawers, and LED lighting"
      ]),
      benefitsJson: JSON.stringify([
        "Hinged & sliding options",
        "Zero wasted corner space",
        "Bespoke internal shelving",
        "City & Guilds precision fit"
      ]),
      seoTitle: "Bespoke Fitted Wardrobes Leicester (Hinged & Sliding)",
      seoDescription: "Maximize every square inch of your bedroom storage with custom fitted wardrobes in Leicester.",
      order: 2,
    },
    {
      slug: "sliding-wardrobes",
      title: "Sliding Wardrobes",
      headline: "Mirrored & Frosted Glass Sliding Wardrobes",
      shortDescription: "Contemporary sliding panel systems in mirrored glass or frosted panels, maximizing walking room in smaller spaces.",
      description: "Slide open your storage space with absolute ease. Our sliding wardrobes use premium heavy-duty bottom track runs that glide silently. Styled with mirrored glass panels, they reflect daylight to make bedrooms feel twice as large.",
      image: "/images/projects/sliding_wardrobe_dark.jpg",
      galleryJson: JSON.stringify(["/images/projects/sliding_wardrobe_dark.jpg"]),
      video: null,
      bulletsJson: JSON.stringify([
        "Frosted glass, plain color board, or tinted mirrors",
        "Perimeter LED strip lighting channels built into the framing",
        "Custom internal dresser drawer setups with soft-close slides"
      ]),
      benefitsJson: JSON.stringify([
        "Space-saving sliding panels",
        "Heavy duty silent runners",
        "Perimeter LED strip backing",
        "Frosted glass & mirror options"
      ]),
      seoTitle: "Sliding Wardrobes Leicester | Graphene Interiors Ltd",
      seoDescription: "Slide open your storage space with absolute ease with mirrored sliding wardrobes in Leicester.",
      order: 3,
    },
    {
      slug: "bedrooms",
      title: "Bedrooms",
      headline: "Bespoke Bedroom Cabinetry & Styling Layouts",
      shortDescription: "Complete bedroom cabinetry fitouts, including side drawer units, dressing tables, headboard paneling, and storage.",
      description: "We create cohesive bedroom layouts. From floor-to-ceiling sliding closets and bedside floating drawer tables to integrated make-up dressing vanity tables, we design custom suites that look like high-end boutique hotel rooms.",
      image: "/images/projects/bedroom_grey_concrete.jpg",
      galleryJson: JSON.stringify(["/images/projects/bedroom_grey_concrete.jpg"]),
      video: null,
      bulletsJson: JSON.stringify([
        "Fitted vanity desk tables with warm backlit mirrors",
        "Matching nightstands and storage chest drawers",
        "Custom headboard wall paneling in matching wood grains",
        "Under-bed storage drawers and custom wardrobe fittings"
      ]),
      benefitsJson: JSON.stringify([
        "Integrated dressing tables",
        "Cohesive nightstand packages",
        "Custom timber panel backing",
        "Leicester LE5 local supply"
      ]),
      seoTitle: "Luxury Fitted Bedrooms Leicester | Graphene Interiors Ltd",
      seoDescription: "We create cohesive bedroom layouts and custom furniture suites in Leicester.",
      order: 4,
    },
    {
      slug: "media-walls",
      title: "TV Media Walls",
      headline: "Stunning Living Room Feature Media Walls",
      shortDescription: "Premium living room transformations integrating large screens, linear fireplaces, acoustic slat paneling, and storage.",
      description: "Make your entertainment layout a striking focal point. Our bespoke media walls incorporate fully hidden cable conduits, soundbar recesses, floating storage drawer units, and linear electric fireplace cutouts.",
      image: "/images/projects/media_wall_woodslat.jpg",
      galleryJson: JSON.stringify(["/images/projects/media_wall_beige.jpg"]),
      video: null,
      bulletsJson: JSON.stringify([
        "Concealed HDMI and power cable conduits behind paneling",
        "Integrated showcase shelving with remote warm LED backing"
      ]),
      benefitsJson: JSON.stringify([
        "Concealed cable routing",
        "Linear fireplace slots",
        "Warm showcase lighting",
        "Custom soundbar styling"
      ]),
      seoTitle: "TV Media Walls Leicester | Bespoke Entertainment Features",
      seoDescription: "Make your entertainment layout a striking focal point with custom TV media walls in Leicester.",
      order: 5,
    },
    {
      slug: "worktops",
      title: "Luxury Worktops",
      headline: "Premium Quartz & Granite Worktops fitted",
      shortDescription: "Custom quartz worktop cladding and unique custom furniture built to order by Level 2 qualified carpenters.",
      description: "A premium worktop coordinates a luxury kitchen. We supply and professionally fit premium Quartz and Granite surfaces featuring undermount sinks, custom draining grooves, and waterfall cladding edges for kitchen islands.",
      image: "/images/projects/modern_kitchen_grey.jpg",
      galleryJson: JSON.stringify(["/images/projects/kitchen_grey_angle2.jpg"]),
      video: null,
      bulletsJson: JSON.stringify([
        "Precise laser templating at your Leicester home",
        "Waterfall side cladding profiles for modern islands",
        "Matching quartz splashback cladding and windowsills",
        "Polished undermount sink cutouts and drainer groves"
      ]),
      benefitsJson: JSON.stringify([
        "Seamless joint bonding",
        "Stain & scratch resistant",
        "Waterfall island edges",
        "Direct wholesale trade rates"
      ]),
      seoTitle: "Luxury Worktops Leicester | Quartz & Granite Installation",
      seoDescription: "We supply and professionally fit premium Quartz and Granite surfaces in Leicester.",
      order: 6,
    },
    {
      slug: "bespoke-furniture",
      title: "Bespoke Furniture",
      headline: "Hand-Crafted Cabinets & Unique Joinery",
      shortDescription: "Individually styled cabinetry, window benches, floating shelves, and timber drawer sets tailored to Leicester homes.",
      description: "Looking for a unique piece of furniture? We craft bespoke items in our Leicester joinery workshop including shoe organizer bench seating, floating alcove drawers, vanity desks, and custom console units.",
      image: "/images/projects/fitted_wardrobe_desk.jpg",
      galleryJson: JSON.stringify(["/images/projects/fitted_wardrobe_desk.jpg"]),
      video: null,
      bulletsJson: JSON.stringify([
        "Solid and high-density fiberboard construction",
        "Sprayed with durable professional lacquered paint colors",
        "Custom size configurations fitting irregular corners",
        "Concealed soft-close hardware on all doors and drawers"
      ]),
      benefitsJson: JSON.stringify([
        "100% Custom dimensions",
        "Hardwearing sprayed lacquer",
        "Unique alcove storage solutions",
        "Solid drawer box carpentry"
      ]),
      seoTitle: "Bespoke Furniture Leicester | Hand-Crafted Joinery",
      seoDescription: "We craft bespoke items in our Leicester joinery workshop including vanity desks and cabinets.",
      order: 7,
    },
    {
      slug: "custom-designs",
      title: "Custom Designs",
      headline: "Turning Sketches into High-Grade Carpentry",
      shortDescription: "Tailored carpentry projects based on hand sketches, adapting storage to irregular ceiling lines and chimney breasts.",
      description: "No matter how complex your storage ideas are, Arshad can design a practical solution. We map out under-stairs drawers, attic sloped-roof closets, and fireplace alcove cupboards, turning sketches into functional joinery.",
      image: "/images/projects/sliding_wardrobe_green.jpg",
      galleryJson: JSON.stringify(["/images/projects/sliding_wardrobe_green.jpg"]),
      video: null,
      bulletsJson: JSON.stringify([
        "Bespoke 3D modeling to coordinate designs",
        "Fitting joinery to sloped attic roofs and awkward angles",
        "Heavy duty runners and concealed push-to-open hinges",
        "Custom materials: Oak veneer, painted MDF, acrylic gloss"
      ]),
      benefitsJson: JSON.stringify([
        "3D Visual layout designs",
        "Awkward space optimization",
        "Oak veneer & gloss options",
        "Free site templates"
      ]),
      seoTitle: "Custom Joinery Designs Leicester | Graphene Interiors Ltd",
      seoDescription: "We map out under-stairs drawers, attic sloped-roof closets, turning sketches into functional joinery.",
      order: 8,
    },
    {
      slug: "interior-design",
      title: "Interior Design",
      headline: "Cohesive Material Planning & Room Layouts",
      shortDescription: "Complete color palette alignment, materials consultation, and layout optimization services for full home transformations.",
      description: "Coordinate your complete renovation layout. We advise on material combinations, cabinet colors, coordinate worktop splashbacks, plan ambient LED placement, and advise on floor tiles to deliver a cohesive luxury aesthetic.",
      image: "/images/projects/modern_kitchen_grey.jpg",
      galleryJson: JSON.stringify(["/images/projects/modern_kitchen_grey.jpg"]),
      video: null,
      bulletsJson: JSON.stringify([
        "Bespoke material pairing consultations",
        "Electrical coordinate layouts for spotlights and LEDs",
        "Floor plans mapping out optimal walking spaces",
        "Premium cabinet color selection and handle matching"
      ]),
      benefitsJson: JSON.stringify([
        "Material mood planning",
        "Lighting placement maps",
        "Cohesive luxury styling",
        "Leicester site planning visit"
      ]),
      seoTitle: "Interior Design Services Leicester | Material Mood Planning",
      seoDescription: "Coordinate your complete renovation layout, material combinations, and lighting placement.",
      order: 9,
    }
  ];

  for (const s of initialServices) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: s,
    });
  }
  console.log("Services seeded");

  // 8. Portfolio Projects
  const initialProjects = [
    {
      projectName: "Premium Gloss Beige Kitchen",
      categoryJson: JSON.stringify(["kitchens", "worktops"]),
      location: "Leicester",
      description: "Leicester high-gloss kitchen with a massive waterfall quartz island, custom ceiling-recessed hood, and matching marble-look polished tiling.",
      beforeImagesJson: JSON.stringify(["/images/projects/before_kitchen_renovation.jpg"]),
      afterImagesJson: JSON.stringify(["/images/projects/modern_kitchen_beige.jpg"]),
      videosJson: JSON.stringify(["/videos/manufacturing.mp4"]),
      completionDate: "2024-05",
      isFeatured: true,
      details: "Quartz cladding, integrated Gas stove, crystal chandelier, ambient LED undershelf lighting.",
      order: 0,
    },
    {
      projectName: "Mirrored Black Sliding Wardrobe",
      categoryJson: JSON.stringify(["wardrobes"]),
      location: "Leicester",
      description: "Premium floor-to-ceiling dark sliding panels featuring a central glass mirror and custom integrated perimeter LED channel lighting.",
      beforeImagesJson: JSON.stringify(["/images/projects/before_understairs.jpg"]),
      afterImagesJson: JSON.stringify(["/images/projects/sliding_wardrobe_dark.jpg"]),
      videosJson: JSON.stringify([]),
      completionDate: "2024-06",
      isFeatured: true,
      details: "Soft-close sliding rails, internal custom drawers, perimeter LED diffusers.",
      order: 1,
    },
    {
      projectName: "Modern Handless Grey Kitchen",
      categoryJson: JSON.stringify(["kitchens", "worktops"]),
      location: "Leicester",
      description: "Contemporary high-gloss grey kitchen layout with breakfast bar, built-in microwave and oven stack, and double skylight setup.",
      beforeImagesJson: JSON.stringify([]),
      afterImagesJson: JSON.stringify(["/images/projects/modern_kitchen_grey.jpg"]),
      videosJson: JSON.stringify([]),
      completionDate: "2024-04",
      isFeatured: true,
      details: "Integrated appliances, quartz breakfast bar, custom cabinetry fitted under architectural sloped ceilings.",
      order: 2,
    },
    {
      projectName: "Master Bedroom Dressing Suite",
      categoryJson: JSON.stringify(["wardrobes", "interiors"]),
      location: "Leicester",
      description: "Bespoke fitted bedroom shaker wardrobes wrapped around a dedicated center makeup vanity table with warm backlit shelving.",
      beforeImagesJson: JSON.stringify([]),
      afterImagesJson: JSON.stringify(["/images/projects/fitted_wardrobe_desk.jpg"]),
      videosJson: JSON.stringify([]),
      completionDate: "2024-03",
      isFeatured: false,
      details: "Muted beige shaker doors, warm showcase LED strips, integrated drawers.",
      order: 3,
    },
    {
      projectName: "Frosted Glass Sliding Wardrobe",
      categoryJson: JSON.stringify(["wardrobes"]),
      location: "Leicester",
      description: "Contemporary light green frosted glass panels paired with a central mirror panel, fitted flush with side display shelving.",
      beforeImagesJson: JSON.stringify([]),
      afterImagesJson: JSON.stringify(["/images/projects/sliding_wardrobe_green.jpg"]),
      videosJson: JSON.stringify([]),
      completionDate: "2024-07",
      isFeatured: false,
      details: "Three-way track mechanism, custom shelving cabinet unit.",
      order: 4,
    }
  ];

  for (const p of initialProjects) {
    await prisma.portfolioProject.create({
      data: p
    });
  }
  console.log("Portfolio projects seeded");

  // 9. Testimonials
  const initialTestimonials = [
    {
      clientName: "Verified Leicester Customer",
      position: "Leicester (Kitchen Supply & Fitout)",
      review: "I recently had my kitchen supplied and fitted by Graphene Kitchens, and I could not be more pleased with the experience. Arshad was exceptionally helpful, professional, and attentive throughout the entire process. He ensured that our vision was fully understood and brought to life seamlessly, without any issues along the way. The quality of both the service and the final result exceeded our expectations. What stood out most was the outstanding value for money.",
      rating: 5,
      order: 0,
      isVisible: true,
    },
    {
      clientName: "S. Patel",
      position: "LE5 Leicester Customer",
      review: "Arshad designed and built a bespoke sliding mirrored wardrobe in our master bedroom. The LED strip work is beautiful and makes the room feel like a high-end boutique hotel.",
      rating: 5,
      order: 1,
      isVisible: true,
    },
    {
      clientName: "David L.",
      position: "Leicester Forest East Customer",
      review: "The media wall built by Graphene is perfect. Cable management is fully hidden and the linear fireplace look is amazing. Exceptional carpentry work.",
      rating: 5,
      order: 2,
      isVisible: true,
    }
  ];

  for (const t of initialTestimonials) {
    await prisma.testimonial.create({
      data: t,
    });
  }
  console.log("Testimonials seeded");

  // 10. FAQs
  const initialFaqs = [
    {
      question: "What services does Graphene Interiors Ltd offer?",
      answer: "We specialize in custom kitchens, full kitchen renovations, fitted and sliding wardrobes, bedroom cabinets, media walls, bespoke living room furniture, luxury worktops, and comprehensive interior carpentry transformations.",
      order: 0,
    },
    {
      question: "Are your fitters qualified?",
      answer: "Yes, our team consists of professional fitters with 10+ years of experience. Our work is directed by City & Guilds Carpentry & Joinery Level 2 qualified craftsmen.",
      order: 1,
    },
    {
      question: "Where are you based and what areas do you serve?",
      answer: "We are based at 48 Chesterfield Road, Leicester, LE5 5LF. We serve homeowners across Leicester, Leicestershire, and surrounding Midlands areas.",
      order: 2,
    },
    {
      question: "How long is the typical lead time for a custom kitchen or wardrobe?",
      answer: "Lead times range from 4 to 6 weeks from design approval to delivery and installation. Custom materials or premium custom joinery might extend this window, which we clarify during ordering.",
      order: 3,
    },
    {
      question: "Do you supply the materials or do we buy them?",
      answer: "We provide complete end-to-end supply and fit services. We design, source high-grade MFC & MDF/quartz/fittings directly from top UK manufacturers (ensuring trade pricing), and carry out the professional installation.",
      order: 4,
    }
  ];

  for (const f of initialFaqs) {
    await prisma.faq.create({
      data: f,
    });
  }
  console.log("FAQs seeded");

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
