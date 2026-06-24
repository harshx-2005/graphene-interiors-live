import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, Star, Shield, Award, MapPin, Phone, HelpCircle } from "lucide-react";
import ImageProtected from "@/components/image-protected";
import { FreeQuoteForm } from "@/components/lead-forms";
import { openQuoteModal } from "@/components/floating-widget";

const localSeoData: Record<string, {
  title: string;
  headline: string;
  subheadline: string;
  image: string;
  aboutText: string;
  bullets: string[];
  keywords: string[];
}> = {
  "kitchen-fitters-leicester": {
    title: "Expert Kitchen Fitters Leicester | Graphene Interiors Ltd",
    headline: "Professional Kitchen Fitting & Installation Across Leicester",
    subheadline: "Get a high-end luxury kitchen fitted by qualified Level 2 carpenters with 15+ years experience.",
    image: "/images/projects/modern_kitchen_beige.jpg",
    aboutText: "Looking for reliable local kitchen fitters in Leicester? Graphene Interiors Ltd specializes in professional assembly and fitting of custom luxury kitchens. Our City & Guilds qualified carpenters ensure cabinetry is flush and solid.",
    bullets: [
      "Fitted by certified Level 2 Carpentry & Joinery fitters",
      "Seamless quartz worktop cladding and undermount sink fits",
      "Soft-close drawer installations and premium hinge settings",
      "Complete Leicester-wide catchment area service"
    ],
    keywords: ["kitchen fitters Leicester", "kitchen installers Leicester", "Leicester kitchen fitting"]
  },
  "kitchen-renovations-leicester": {
    title: "Kitchen Renovations Leicester | Complete Kitchen Redesigns",
    headline: "Luxury Kitchen Renovations & Remodeling in Leicester",
    subheadline: "Complete transformations. We manage tearing out, plumbing, electrics, plastering, and cabinetry.",
    image: "/images/projects/modern_kitchen_grey.jpg",
    aboutText: "Turn your old kitchen into a premium high-gloss masterpiece. We coordinate the full kitchen renovation process in Leicestershire. We supervise certified gas engineers and electricians to make fitting simple.",
    bullets: [
      "Full project management from teardown to structural fit",
      "Gas Safe certified pipe modifications and NICEIC electrics",
      "Waterfall island quartz worktops and matching splashbacks",
      "5-Year comprehensive installation guarantee"
    ],
    keywords: ["kitchen renovations Leicester", "kitchen remodeling Leicester", "modern kitchens Leicester"]
  },
  "media-walls-leicester": {
    title: "Bespoke TV Media Walls Leicester | Feature Wall Installers",
    headline: "Premium TV Media Walls Fitted in Leicestershire",
    subheadline: "Modern living room transformations incorporating TVs, acoustic slats, and electric fireplaces.",
    image: "/images/projects/fitted_wardrobe_desk.jpg",
    aboutText: "Elevate your living room layout. We construct bespoke TV media walls in Leicester LE5, framing units around linear fireplace heaters and acoustic oak slats, with fully concealed cabling.",
    bullets: [
      "Concealed HDMI, audio, and network cabling conduits",
      "Custom display shelving with warm LED backdrop channels",
      "Framed fireplace cutout sizing and floating storage drawers",
      "Bespoke layout design to fit your living room dimensions"
    ],
    keywords: ["media walls Leicester", "TV media walls Leicester", "bespoke media walls"]
  },
  "fitted-wardrobes-leicester": {
    title: "Bespoke Fitted Wardrobes Leicester | Bedroom Closets",
    headline: "Custom Fitted Wardrobes & Storage in Leicester",
    subheadline: "Maximize storage space with shaker or contemporary closets built flush against walls.",
    image: "/images/projects/fitted_wardrobe_desk.jpg",
    aboutText: "Don't settle for freestanding wardrobes that leave gaps. Graphene Interiors constructs fitted bedroom wardrobes flush against alcoves, chimney breasts, and sloped ceiling profiles.",
    bullets: [
      "Measured and cut on-site for a flush, gap-free fit",
      "Custom drawers, trouser rails, and internal LED wardrobes",
      "Contemporary shaker doors or gloss cabinet styles",
      "Bespoke vanity and dressing table coordinates"
    ],
    keywords: ["fitted wardrobes Leicester", "bedroom wardrobes Leicester", "custom wardrobes"]
  },
  "sliding-wardrobes-leicester": {
    title: "Sliding Mirrored Wardrobes Leicester | Custom Sliding Panels",
    headline: "Luxury Sliding Wardrobes Fitted in Leicester",
    subheadline: "Sleek mirrored and frosted glass panels that glide silently, saving bedroom space.",
    image: "/images/projects/sliding_wardrobe_dark.jpg",
    aboutText: "Perfect for bedrooms where door clearance is tight. We supply and fit custom sliding wardrobes in Leicester, using heavy-duty tracks and premium anti-dust buffer seals for durability.",
    bullets: [
      "Premium glass panel finishes, tinted mirrors, and gloss boards",
      "High-durability silent track rollers with lifelong warranties",
      "Perimeter LED strip lighting channels built into the framing",
      "Maximize floor layout space with flush-run sliding doors"
    ],
    keywords: ["sliding wardrobes Leicester", "mirrored wardrobes Leicester", "sliding closet doors"]
  },
  "worktops-leicester": {
    title: "Luxury Kitchen Worktops Leicester | Quartz & Granite",
    headline: "Quartz, Granite & Timber Worktops in Leicester",
    subheadline: "Supply, templating, and precise cutting of premium stone surfaces at trade rates.",
    image: "/images/projects/modern_kitchen_beige.jpg",
    aboutText: "A luxury worktop completes a premium kitchen. We coordinate the laser templating, cutting, and joint polishing of premium Quartz and Granite slabs in Leicester LE5, direct to trade rates.",
    bullets: [
      "Seamless undermount kitchen sink cutouts and drainer groves",
      "Durable heat-resistant, stain-proof Quartz surfaces",
      " waterfall island edge profiles and breakfast bar lips",
      "Oak veneer and solid hardwood cladding profiles"
    ],
    keywords: ["kitchen worktops Leicester", "quartz worktops Leicester", "granite worktops Leicester"]
  },
  "interior-design-leicester": {
    title: "Premium Interior Design Leicester | Graphene Interiors Ltd",
    headline: "Luxury Home Interior Transformations in Leicester",
    subheadline: "Mood planning, color coordinates, and joinery layout layout.",
    image: "/images/projects/modern_kitchen_grey.jpg",
    aboutText: "Create a cohesive layout for your home renovation. Graphene Interiors coordinates color schemes, cabinet handles, quartz splashbacks, and architectural lighting layouts for full Leicester renovations.",
    bullets: [
      "Material pairing consultations at our Leicester office",
      "Spotlight and LED coordinate maps for room layouts",
      "Cohesive bedroom-kitchen structural planning",
      "Exceptional visual aesthetics for premium results"
    ],
    keywords: ["interior design Leicester", "home renovation Leicester", "interior designer Leicester"]
  },
  "custom-furniture-leicester": {
    title: "Bespoke Custom Furniture Leicester | Master Carpentry",
    headline: "Hand-Crafted Custom Joinery & Furniture Leicester",
    subheadline: "Individually constructed shoe benches, display alcoves, and vanity tables.",
    image: "/images/projects/sliding_wardrobe_green.jpg",
    aboutText: "Can't find furniture that fits your house? Graphene Interiors constructs custom units, alcove cupboards, window seats, and storage drawers built exactly around your dimensions.",
    bullets: [
      "100% custom-sized timber frames sprayed to coordinate room colors",
      "Push-to-open soft hinges and durable cabinet construction",
      "Alcove shelving solutions suited for Leicester brick chimney bases",
      "Directed by level 2 City & Guilds qualified carpenters"
    ],
    keywords: ["custom furniture Leicester", "bespoke joinery Leicester", "carpenter Leicester"]
  }
};

interface LocalSeoPageProps {
  params: Promise<{ "local-seo-slug": string }>;
}

export async function generateStaticParams() {
  return [
    { "local-seo-slug": "kitchen-fitters-leicester" },
    { "local-seo-slug": "kitchen-renovations-leicester" },
    { "local-seo-slug": "media-walls-leicester" },
    { "local-seo-slug": "fitted-wardrobes-leicester" },
    { "local-seo-slug": "sliding-wardrobes-leicester" },
    { "local-seo-slug": "worktops-leicester" },
    { "local-seo-slug": "interior-design-leicester" },
    { "local-seo-slug": "custom-furniture-leicester" },
  ];
}

export default async function LocalSeoLandingPage({ params }: LocalSeoPageProps) {
  // Resolve params promise using await
  const resolvedParams = await params;
  const slug = resolvedParams["local-seo-slug"];
  const pageData = localSeoData[slug];

  if (!pageData) {
    notFound();
  }

  return (
    <div className="relative font-sans text-text-charcoal bg-white min-h-screen">
      
      {/* Dynamic Header */}
      <section className="bg-primary text-white py-16 relative overflow-hidden border-b border-accent/20">
        <div className="absolute inset-0 opacity-15">
          <ImageProtected
            src={pageData.image}
            alt={pageData.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">LEICESTER LOCAL SERVICE</span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight">{pageData.headline}</h1>
          <p className="text-gray-300 font-light text-sm md:text-base max-w-2xl leading-relaxed">
            {pageData.subheadline}
          </p>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="py-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Content Column */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="space-y-4">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">Your Local Leicester Specialists</h2>
            <p className="text-sm font-light leading-relaxed text-text-charcoal">
              {pageData.aboutText}
            </p>
            <p className="text-sm font-light leading-relaxed text-text-charcoal">
              We manage all dimensions, supply high-quality timber materials, coordinate trade pricing, and provide expert installation. You work directly with Arshad and our Leicester-based joiners, ensuring value for money.
            </p>
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden border border-accent/25 shadow-xl">
            <ImageProtected
              src={pageData.image}
              alt={pageData.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-primary">Why Choose Graphene Interiors in Leicester</h3>
            <ul className="space-y-3">
              {pageData.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-xs font-light leading-relaxed">
                  <span className="bg-accent/15 text-accent p-1 rounded-full shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Local Area Trust Bar */}
          <div className="bg-secondary border border-gray-150 rounded-2xl p-6 grid grid-cols-2 gap-4 text-center">
            <div className="p-3">
              <span className="block text-2xl font-serif font-bold text-accent">2+ Years</span>
              <span className="text-[9px] font-bold text-text-charcoal uppercase tracking-wider">Experience</span>
            </div>
            <div className="p-3">
              <span className="block text-2xl font-serif font-bold text-accent">5 Stars</span>
              <span className="text-[9px] font-bold text-text-charcoal uppercase tracking-wider">Google Review Rating</span>
            </div>
          </div>

        </div>

        {/* Lead Capture Form Column */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="bg-white border border-gray-150 rounded-3xl p-6 md:p-8 shadow-xl space-y-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-primary">Get a Free Estimate</h3>
              <p className="text-xs text-text-charcoal font-light mt-1">
                Enter your details to request a free design consultation.
              </p>
            </div>
            <FreeQuoteForm />
          </div>

          {/* Leicester Direct Coordinates */}
          <div className="bg-primary text-white border border-accent/25 rounded-2xl p-6 space-y-4 font-sans">
            <h4 className="font-serif text-base font-bold text-accent">Leicester Contact Desk</h4>
            <ul className="space-y-3 text-xs font-light">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>48 Chesterfield Road, Leicester, LE5 5LF</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <a href="tel:+447438199369" className="hover:text-accent font-semibold">+44 7438 199369</a>
              </li>
            </ul>
            <div className="border-t border-white/10 pt-4 flex justify-between items-center text-[10px]">
              <span className="text-gray-400">Monday – Saturday</span>
              <span className="text-accent font-semibold">9:00 AM – 6:00 PM</span>
            </div>
          </div>

        </div>

      </section>

    </div>
  );
}
