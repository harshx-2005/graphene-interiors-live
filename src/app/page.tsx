"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  Award, 
  Shield, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Star, 
  ChevronRight, 
  Clock, 
  Hammer,
  HelpCircle,
  FileText
} from "lucide-react";
import ImageProtected from "@/components/image-protected";
import BeforeAfterSlider from "@/components/before-after-slider";
import { openQuoteModal } from "@/components/floating-widget";
import { FreeQuoteForm } from "@/components/lead-forms";

// Custom Instagram SVG component to bypass Turbopack import issues
const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Slide images for Hero section
const heroSlides = [
  "/images/projects/modern_kitchen_beige.jpg",
  "/images/projects/sliding_wardrobe_dark.jpg",
  "/images/projects/modern_kitchen_grey.jpg",
  "/images/projects/fitted_wardrobe_desk.jpg",
  "/images/projects/sliding_wardrobe_green.jpg",
];

const servicesList = [
  {
    title: "Luxury Kitchens",
    desc: "Fully bespoke kitchen spaces crafted with state-of-the-art materials, custom cabinetry, and ambient lighting.",
    benefits: ["Hand-fitted units", "Premium German hinges", "Integrated smart lighting"],
    image: "/images/projects/modern_kitchen_beige.jpg",
    link: "/services/kitchens",
  },
  {
    title: "Fitted & Sliding Wardrobes",
    desc: "Custom storage solutions maximizing bedroom layouts with contemporary sliding glass doors and internal dressing drawers.",
    benefits: ["Soft-close slides", "Frosted & mirrored finishes", "Bespoke internal shelving"],
    image: "/images/projects/sliding_wardrobe_dark.jpg",
    link: "/services/sliding-wardrobes",
  },
  {
    title: "TV Media Walls",
    desc: "Premium living room transformations integrating large screens, linear fireplaces, acoustic slat paneling, and storage.",
    benefits: ["Concealed cabling", "Custom LED backing", "Floating storage bays"],
    image: "/images/projects/fitted_wardrobe_desk.jpg", // Wardrobe/desk with LED
    link: "/services/media-walls",
  },
  {
    title: "Bespoke Joinery & Worktops",
    desc: "Custom quartz worktop cladding and unique custom furniture built to order by Level 2 qualified carpenters.",
    benefits: ["Seamless marble-look cladding", "Solid oak drawer construction", "Durable finishes"],
    image: "/images/projects/modern_kitchen_grey.jpg",
    link: "/services/worktops",
  },
];

const faqs = [
  {
    q: "What services does Graphene Interiors Ltd offer?",
    a: "We specialize in custom kitchens, full kitchen renovations, fitted and sliding wardrobes, bedroom cabinets, media walls, bespoke living room furniture, luxury worktops, and comprehensive interior carpentry transformations."
  },
  {
    q: "Are your fitters qualified and insured?",
    a: "Yes, our team consists of professional fitters with 15+ years of experience. Our work is directed by City & Guilds Carpentry & Joinery Level 2 qualified craftsmen, and we hold full liability insurance."
  },
  {
    q: "Where are you based and what areas do you serve?",
    a: "We are based at 48 Chesterfield Road, Leicester, LE5 5LF. We serve homeowners across Leicester, Leicestershire, and surrounding Midlands areas."
  },
  {
    q: "How long is the typical lead time for a custom kitchen or wardrobe?",
    a: "Lead times range from 4 to 8 weeks from design approval to delivery and installation. Custom materials or premium custom joinery might extend this window, which we clarify during ordering."
  },
  {
    q: "Do you supply the materials or do we buy them?",
    a: "We provide complete end-to-end supply and fit services. We design, source high-grade timber/quartz/fittings directly from top UK manufacturers (ensuring trade pricing), and carry out the professional installation."
  },
  {
    q: "What is your consultation and quoting process?",
    a: "Our consultations are completely free. We visit your home to discuss ideas, measure the space, outline options, and provide a fully costed quote within 48 hours."
  },
  {
    q: "Do you offer 3D design visualizations?",
    a: "Yes, for kitchen and bedroom projects, we create high-definition 3D design models so you can visualize cabinet colors, handles, lighting, and layout before build starts."
  },
  {
    q: "Do you handle plumbing and electrical works for kitchen renovations?",
    a: "Yes, we handle the complete renovation including carpentry, plumbing, gas works, electrical wiring, tiling, and luxury lighting, using certified Gas Safe and NICEIC subcontractors."
  },
  {
    q: "Do you provide guarantees on your installations?",
    a: "Absolutely. We stand behind our joinery with a 5-year installation guarantee, and all hinges, runners, and structural components carry lifetime manufacturer warranties."
  },
  {
    q: "How much does a custom sliding wardrobe cost?",
    a: "Cost depends on width, choice of sliding panels (glass, mirror, board), and interior configurations. Entry-level 2-door custom units start around £1,800 fitted, while massive 4-door systems with interior drawers range from £3,500 – £5,000+."
  },
  {
    q: "What types of kitchen worktops do you install?",
    a: "We supply and install premium Quartz, Granite, Solid Wood (Oak/Walnut), and heavy-duty luxury Laminate worktops, featuring custom undermount sink cuts and waterfall edge islands."
  },
  {
    q: "Can you retrofit new doors to our existing kitchen cabinets?",
    a: "Yes. If your cabinet frames are structurally solid, we can perform a kitchen facelift by replacing cabinet fronts, drawers, worktops, and lighting, saving you up to 50% compared to a full replacement."
  },
  {
    q: "What drawer runners and hinges do you use?",
    a: "We use only premium soft-close drawer runners and cabinet hinges from industry-leading brands like Blum and Hettich to ensure decades of silent, smooth operation."
  },
  {
    q: "When did Graphene Interiors incorporate?",
    a: "Graphene Interiors Ltd was officially incorporated in 2024, building on over 15 years of active, hands-on joinery experience in Leicestershire."
  },
  {
    q: "How can I book a free home consultation?",
    a: "You can book directly using the form on our contact page, clicking the 'Book Consultation' triggers on the site, or sending a quick text/photo on WhatsApp at +44 7775 099710."
  }
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [sliderCategory, setSliderCategory] = useState<"kitchen" | "wardrobe">("kitchen");

  // Hero Background Slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[92vh] flex items-center justify-center overflow-hidden bg-primary">
        {/* Slideshow Images */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.45, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="relative w-full h-full"
            >
              <ImageProtected
                src={heroSlides[currentSlide]}
                alt="Luxury Interior Showcase"
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          {/* Ambient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="inline-flex items-center space-x-2 bg-accent/20 border border-accent/30 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-accent mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Leicester's Master Joiners</span>
            </span>

            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              Transforming Houses Into <br className="hidden md:inline" />
              <span className="text-accent">Beautiful Living Spaces</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
              Luxury Kitchens, Bespoke Wardrobes, Media Walls & Full Interior Transformations across Leicester and the Midlands.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <button
                onClick={openQuoteModal}
                className="w-full sm:w-auto bg-accent hover:bg-accent-hover text-primary font-bold tracking-widest uppercase px-8 py-4 rounded-lg shadow-xl border border-accent/20 transition-transform hover:-translate-y-0.5 cursor-pointer text-sm"
              >
                Get Free Quote
              </button>
              
              <a
                href="tel:+447775099710"
                className="w-full sm:w-auto bg-primary/80 hover:bg-primary text-white border border-white/20 font-bold tracking-widest uppercase px-8 py-4 rounded-lg shadow-xl flex items-center justify-center space-x-2.5 transition-transform hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4 text-accent animate-pulse" />
                <span>Call +44 7775 099710</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Hero Trust Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-primary/80 backdrop-blur-md border-t border-white/5 py-5 z-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex items-center justify-center space-x-2 text-white/90 text-xs md:text-sm font-semibold tracking-wider">
              <Award className="w-5 h-5 text-accent" />
              <span>15+ YEARS EXPERIENCE</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-white/90 text-xs md:text-sm font-semibold tracking-wider">
              <Hammer className="w-5 h-5 text-accent" />
              <span>CITY & GUILDS QUALIFIED</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-white/90 text-xs md:text-sm font-semibold tracking-wider">
              <Clock className="w-5 h-5 text-accent" />
              <span>FREE CONSULTATIONS</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-white/90 text-xs md:text-sm font-semibold tracking-wider">
              <MapPin className="w-5 h-5 text-accent" />
              <span>LEICESTER BASED</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST INDICATORS SECTION */}
      <section className="bg-secondary py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="font-serif text-3xl font-bold text-primary mb-3">
                Leicester's Certified Carpentry Specialists
              </h2>
              <p className="text-sm text-text-charcoal leading-relaxed">
                Incorporated in 2024, **Graphene Interiors Ltd** fuses time-honored joinery methods with state-of-the-art designs. We hand-craft custom units from premium fixtures to ensure outstanding value for money.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-md w-44">
                <span className="block text-3xl font-serif font-bold text-accent mb-1">15+</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-charcoal">Years Fitting Joinery</span>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-md w-44">
                <span className="block text-3xl font-serif font-bold text-accent mb-1">Level 2</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-charcoal">City & Guilds Joiners</span>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-md w-44">
                <div className="flex justify-center text-accent mb-1.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-charcoal">5 Star Client Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES GRID SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent block mb-2">Luxury Transformations</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4">Our Premium Offerings</h2>
            <p className="text-sm text-text-charcoal leading-relaxed font-light">
              We cover everything from individual bespoke units to full kitchen and bathroom renovations, delivering precision and care in every detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicesList.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-secondary border border-gray-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="relative h-64 md:h-72 w-full overflow-hidden">
                  <ImageProtected
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="font-serif text-2xl font-semibold text-primary">{service.title}</h3>
                  <p className="text-sm text-text-charcoal leading-relaxed font-light">{service.desc}</p>
                  
                  <ul className="space-y-1.5 pt-2">
                    {service.benefits.map((b) => (
                      <li key={b} className="flex items-center space-x-2 text-xs text-text-charcoal font-medium">
                        <Check className="w-4 h-4 text-accent" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 flex justify-between items-center">
                    <Link
                      href={service.link}
                      className="text-xs font-bold tracking-widest text-primary hover:text-accent transition-colors uppercase flex items-center space-x-1.5"
                    >
                      <span>Explore Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                    <button 
                      onClick={openQuoteModal}
                      className="bg-primary group-hover:bg-accent text-white group-hover:text-primary px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center space-x-2 bg-primary hover:bg-primary/95 text-white font-bold tracking-widest uppercase px-8 py-4 rounded-lg shadow-md border border-accent/15 cursor-pointer text-xs"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. ABOUT COMPANY SECTION */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual Column */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-accent/25 shadow-2xl">
              <ImageProtected
                src="/images/projects/fitted_wardrobe_desk.jpg"
                alt="Arshad Joinery Craftsmanship"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/20" />
              <div className="absolute bottom-6 left-6 right-6 bg-primary/90 backdrop-blur-md p-6 rounded-2xl text-white border border-white/10">
                <span className="text-accent font-bold text-xs uppercase tracking-widest block mb-1">Our Core Commitment</span>
                <p className="text-xs leading-relaxed text-gray-300 font-light">
                  "Brother Arshad ensured that our vision was fully understood and brought to life seamlessly... The quality of both the service and the final result exceeded our expectations."
                </p>
              </div>
            </div>

            {/* Copy Column */}
            <div className="space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent block">The Graphene Story</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary">
                Uncompromising Quality. <br />
                Exceptional Value.
              </h2>
              <p className="text-sm text-text-charcoal leading-relaxed font-light">
                Founded by expert fitter **Arshad**, Graphene Interiors Ltd brings over 15 years of joinery and carpentry experience to Leicester homes. Holding a **City & Guilds Level 2 Qualification** in Carpentry and Joinery, we deliver stunning kitchen layouts and wardrobe units built to fit precisely.
              </p>
              <p className="text-sm text-text-charcoal leading-relaxed font-light">
                Unlike generic retailers who mark up flat-pack systems, we manage raw materials directly, supply premium soft-close fixtures, and construct bespoke storage solutions, offering unparalleled value for money.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-accent/15 rounded-lg p-2 text-accent mt-0.5">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary">5-Year Guarantee</h4>
                    <p className="text-xs text-text-charcoal font-light">Complete structural protection.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-accent/15 rounded-lg p-2 text-accent mt-0.5">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary">Premium Fitting</h4>
                    <p className="text-xs text-text-charcoal font-light">City & Guilds level precision.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="text-xs font-bold tracking-widest text-primary hover:text-accent transition-colors uppercase flex items-center space-x-2"
                >
                  <span>Learn More About Arshad</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROJECTS SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent block mb-2">Our Work Showcase</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary">Featured Client Installations</h2>
            </div>
            <Link
              href="/portfolio"
              className="text-xs font-bold tracking-widest text-accent hover:underline uppercase flex items-center space-x-2"
            >
              <span>View Full Gallery</span>
              <ChevronRight className="w-4.5 h-4.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md group">
              <ImageProtected src="/images/projects/modern_kitchen_beige.jpg" alt="Gloss Beige Kitchen" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 bg-gradient-to-t from-primary/90 to-transparent">
                <div>
                  <span className="text-[9px] font-bold tracking-widest text-accent uppercase">Leicester Renovation</span>
                  <h4 className="font-serif text-white text-lg font-semibold">High-Gloss Beige Luxury Kitchen</h4>
                </div>
              </div>
            </div>
            
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md group">
              <ImageProtected src="/images/projects/sliding_wardrobe_dark.jpg" alt="Dark Wardrobe LED" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 bg-gradient-to-t from-primary/90 to-transparent">
                <div>
                  <span className="text-[9px] font-bold tracking-widest text-accent uppercase">Bedroom Fitout</span>
                  <h4 className="font-serif text-white text-lg font-semibold">Mirrored Black Sliding Wardrobe with LEDs</h4>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md group">
              <ImageProtected src="/images/projects/modern_kitchen_grey.jpg" alt="Gloss Grey Kitchen" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 bg-gradient-to-t from-primary/90 to-transparent">
                <div>
                  <span className="text-[9px] font-bold tracking-widest text-accent uppercase">Kitchen Fitting</span>
                  <h4 className="font-serif text-white text-lg font-semibold">Modern High-Gloss Grey Kitchen Island</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BEFORE & AFTER SHOWCASE */}
      <section className="py-24 bg-secondary">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent block mb-2">Visual Transformations</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4">Before & After Slider</h2>
            <p className="text-sm text-text-charcoal leading-relaxed font-light">
              Interactive comparison. Drag the central handle left and right to inspect the dramatic changes we deliver.
            </p>
            
            {/* Category Selector Tabs */}
            <div className="inline-flex bg-white p-1.5 rounded-xl border border-gray-150 shadow-sm mt-8">
              <button
                onClick={() => setSliderCategory("kitchen")}
                className={`px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  sliderCategory === "kitchen" ? "bg-primary text-white" : "text-text-charcoal hover:bg-gray-50"
                }`}
              >
                Kitchen Renovation
              </button>
              <button
                onClick={() => setSliderCategory("wardrobe")}
                className={`px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  sliderCategory === "wardrobe" ? "bg-primary text-white" : "text-text-charcoal hover:bg-gray-50"
                }`}
              >
                Sliding Wardrobe
              </button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {sliderCategory === "kitchen" ? (
              <BeforeAfterSlider
                beforeImage="/images/projects/before_kitchen.png"
                afterImage="/images/projects/modern_kitchen_beige.jpg"
                beforeAlt="Dated 90s kitchen with worn wooden cabinets"
                afterAlt="Modern high-gloss beige kitchen fitted by Graphene Interiors"
              />
            ) : (
              <BeforeAfterSlider
                beforeImage="/images/projects/before_wardrobe.png"
                afterImage="/images/projects/sliding_wardrobe_dark.jpg"
                beforeAlt="Cluttered and chipping plain white closet"
                afterAlt="Custom sliding mirrored wardrobe with ambient LED strip lights"
              />
            )}
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE US SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left side checklist */}
            <div className="space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent block">Our Edge</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary">Why Homeowners Trust Graphene Interiors</h2>
              <p className="text-sm text-text-charcoal font-light leading-relaxed">
                When you hire us, you work directly with Brother Arshad and our in-house fitting team. We stand by our details:
              </p>

              <div className="space-y-4 pt-2">
                {[
                  { title: "Direct Trading / Best Value", desc: "No middle-man markup. We procure fixtures at trade prices and transfer the savings directly to you." },
                  { title: "City & Guilds Level 2", desc: "Our fitters have qualified joinery backgrounds to ensure cabinets, doors, and worktops fit seamlessly." },
                  { title: "Lifetime Hardware Warranty", desc: "We utilize Hettich and Blum soft-close fittings to promise decades of durable usage." },
                  { title: "Leicester Based & Trusted", desc: "Responsive local joiners. If you ever need adjustments, we are just a quick phone call away." }
                ].map((item) => (
                  <div key={item.title} className="flex items-start space-x-3.5">
                    <div className="bg-accent text-primary p-1.5 rounded-full mt-1">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-primary">{item.title}</h4>
                      <p className="text-xs text-text-charcoal font-light leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side stats & card overlay */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-accent/20 shadow-2xl">
              <ImageProtected src="/images/projects/sliding_wardrobe_green.jpg" alt="Frosted sliding doors wardrobe" fill className="object-cover" />
              <div className="absolute inset-0 bg-primary/20" />
              <div className="absolute top-6 left-6 bg-accent text-primary px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Leicester LE5 Fitted
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. CUSTOMER REVIEWS SECTION */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent block mb-2">Verified Testimonials</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4">What Our Clients Say</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Featured Review */}
            <div className="lg:col-span-2 bg-white border border-accent/25 rounded-3xl p-8 md:p-12 shadow-md relative">
              <div className="flex text-accent space-x-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
              </div>
              <p className="font-serif text-lg md:text-xl text-primary italic leading-relaxed mb-6 font-light">
                "I recently had my kitchen supplied and fitted by Graphene Kitchens, and I could not be more pleased with the experience. **Brother Arshad was exceptionally helpful, professional, and attentive** throughout the entire process. He ensured that our vision was fully understood and brought to life seamlessly, without any issues along the way.

                The quality of both the service and the final result exceeded our expectations. What stood out most was the outstanding value for money."
              </p>
              <div>
                <span className="block font-serif text-base font-bold text-primary">Verified Leicester Customer</span>
                <span className="text-xs text-text-charcoal font-light">Leicester (Kitchen Supply & Fitout)</span>
              </div>
            </div>

            {/* Additional Reviews */}
            <div className="space-y-8 flex flex-col justify-between">
              <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm">
                <div className="flex text-accent space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-xs text-text-charcoal leading-relaxed font-light mb-4">
                  "Arshad designed and built a bespoke sliding mirrored wardrobe in our master bedroom. The LED strip work is beautiful and makes the room feel like a luxury boutique hotel."
                </p>
                <span className="block text-xs font-bold text-primary">S. Patel</span>
                <span className="text-[10px] text-text-charcoal font-light">LE5 Leicester Customer</span>
              </div>

              <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm">
                <div className="flex text-accent space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-xs text-text-charcoal leading-relaxed font-light mb-4">
                  "The media wall built by Graphene is perfect. Cable management is fully hidden and the linear fireplace look is amazing. Exceptional carpentry work."
                </p>
                <span className="block text-xs font-bold text-primary">David L.</span>
                <span className="text-[10px] text-text-charcoal font-light">Leicester Forest East Customer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PROCESS TIMELINE */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent block mb-2">Our Workflow</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4">How We Bring Your Design To Life</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              { num: "01", title: "Home Visit & Consult", desc: "We discuss layouts, take exact measurements, and review catalogs at your house." },
              { num: "02", title: "Detailed 3D Design", desc: "We design a 3D mock representation of your new kitchen cabinets or wardrobes for review." },
              { num: "03", title: "Timber Crafting", desc: "Arshad and the joiners craft your components using quality premium timber materials." },
              { num: "04", title: "Fitting & Installation", desc: "We fit, test, clean up, and hand over your luxury space, backed by our 5-year guarantee." }
            ].map((step, idx) => (
              <div key={step.num} className="relative bg-secondary border border-gray-150 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <span className="absolute top-6 right-6 font-serif text-4xl font-bold text-accent/25">{step.num}</span>
                <h4 className="font-serif text-lg font-bold text-primary mb-3 mt-6">{step.title}</h4>
                <p className="text-xs text-text-charcoal leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. INSTAGRAM GALLERY */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Instagram className="w-8 h-8 text-accent mx-auto mb-3" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent block mb-2">Social Feed</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2">@graphene_interiorsltd</h2>
            <p className="text-xs text-text-charcoal">Follow us on Instagram to see our latest Leicester installations.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "/images/projects/modern_kitchen_beige.jpg",
              "/images/projects/sliding_wardrobe_dark.jpg",
              "/images/projects/modern_kitchen_grey.jpg",
              "/images/projects/fitted_wardrobe_desk.jpg"
            ].map((img, i) => (
              <a
                key={i}
                href="https://instagram.com/graphene_interiorsltd"
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square overflow-hidden rounded-xl border border-gray-200/50 shadow-sm group block"
              >
                <ImageProtected src={img} alt="Instagram Post Showcase" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FAQ SECTION */}
      <section className="py-24 bg-white" id="faq-section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent block mb-2">Got Questions?</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index} 
                  className="border border-gray-150 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full text-left px-6 py-5 bg-secondary hover:bg-gray-100/60 flex justify-between items-center transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-semibold text-primary font-sans flex items-start space-x-3">
                      <HelpCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span>{faq.q}</span>
                    </span>
                    <span className={`text-xl font-bold text-accent transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-white"
                      >
                        <div className="px-6 py-4 text-xs text-text-charcoal leading-relaxed font-light border-t border-gray-100">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12. CONTACT CTA SECTION */}
      <section className="py-24 bg-secondary border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column info */}
            <div className="space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent block">Start Your Project</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary leading-tight">
                Let's Build Your <br />Dream Home Interiors
              </h2>
              <p className="text-sm text-text-charcoal font-light leading-relaxed">
                Book your free design visit or consult with Arshad today. Our Leicester joinery shop constructs bespoke units designed around you.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-xs text-text-charcoal">
                    **Office / Joinery Shop:** 48 Chesterfield Road, Leicester, LE5 5LF
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-xs text-text-charcoal">
                    **Direct Carpentry Hot line:** +44 7775 099710
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column Form Container */}
            <div className="bg-white border border-gray-150 rounded-3xl p-6 md:p-8 shadow-xl">
              <h3 className="font-serif text-xl font-bold text-primary mb-4 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-accent" />
                <span>Get a Free Price Estimate</span>
              </h3>
              <FreeQuoteForm />
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
