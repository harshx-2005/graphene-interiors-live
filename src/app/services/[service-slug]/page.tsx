import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Phone, ArrowLeft, Award, Shield, Clock } from "lucide-react";
import ImageProtected from "@/components/image-protected";
import { openQuoteModal } from "@/components/floating-widget";
import { FreeQuoteForm } from "@/components/lead-forms";

const servicesData: Record<string, {
  title: string;
  headline: string;
  image: string;
  description: string;
  bullets: string[];
  benefits: string[];
}> = {
  "kitchens": {
    title: "Luxury Fitted Kitchens & Renovations Leicester",
    headline: "Bespoke Fitted Kitchens & Complete Kitchen Renovations Built Around Your Lifestyle",
    image: "/images/projects/modern_kitchen_grey.jpg",
    description: "We design, supply, and professionally install premium kitchens tailored to your lifestyle. From handleless gloss-finish cabinet doors and custom-built islands with waterfall quartz worktop edges to complete end-to-end renovations—including structural plastering, moving plumbing feeds, Gas Safe certified cooker fittings, and NICEIC certified wiring—our Leicester joinery team handles every minor detail with expert craftsmanship.",
    bullets: [
      "Bespoke layout design incorporating island seating, sink runs, and integrated appliances",
      "Premium soft-close drawer runs and German-engineered Blum or Hettich hinges",
      "Full project management including plumbing, Gas Safe installations, and electrical wiring",
      "Professional carpentry and joinery ensuring cabinets, worktops, and trims align flush"
    ],
    benefits: [
      "Bespoke luxury designs",
      "Full renovation & fitting",
      "German soft-close hinges",
      "5-Year installation warranty"
    ]
  },
  "kitchen-renovations": {
    title: "Kitchen Renovations Leicester",
    headline: "Complete End-to-End Kitchen Transformations",
    image: "/images/projects/modern_kitchen_grey.jpg",
    description: "A full kitchen renovation requires more than cabinet fitting. We manage the entire project lifecycle. We tear down old structures, perform structural plastering, move plumbing feeds, wire NICEIC electrical points, lay underfloor heating, and tile splashbacks.",
    bullets: [
      "Full site cleanup and removal of old partition walls",
      "Gas Safe certified plumbing for stove hubs and boilers",
      "NICEIC electrical wiring for ceiling spotlights and ovens",
      "Plastering, painting, and custom porcelain floor tiling"
    ],
    benefits: [
      "Gas Safe Certified work",
      "NICEIC certified electrics",
      "Full project coordination",
      "15+ Years renovation experience"
    ]
  },
  "fitted-wardrobes": {
    title: "Bespoke Fitted Wardrobes Leicester (Hinged & Sliding)",
    headline: "Custom Shaker, Modern Hinged & Silent Sliding Wardrobe Closets",
    image: "/images/projects/walkin_wardrobe_corner_angle2.jpg",
    description: "Maximize every square inch of your bedroom storage. Our bespoke fitted wardrobes are custom-built to fit flush against your plaster walls, wrapping around sloped ceilings, irregular chimney breasts, and tight alcoves to leave zero wasted space. Whether you prefer classic shaker doors, high-gloss hinged cabinets, walk-in closets, or contemporary sliding mirrored glass panels running on premium silent tracks, we deliver the perfect solution.",
    bullets: [
      "Bespoke bedroom framing custom-built around sloped ceilings and chimney breasts",
      "A range of styles including classic shaker doors, flat gloss fronts, and oak accents",
      "Premium sliding glass, tinted mirror, or board panels on silent, heavy-duty track runs",
      "Custom internal configurations: shoe racks, pull-out dressing drawers, and LED lighting"
    ],
    benefits: [
      "Hinged & sliding options",
      "Zero wasted corner space",
      "Bespoke internal shelving",
      "City & Guilds precision fit"
    ]
  },
  "sliding-wardrobes": {
    title: "Sliding Wardrobes Leicester",
    headline: "Mirrored & Frosted Glass Sliding Wardrobes",
    image: "/images/projects/sliding_wardrobe_dark.jpg",
    description: "Slide open your storage space with absolute ease. Our sliding wardrobes use premium heavy-duty bottom track runs that glide silently. Styled with mirrored glass panels, they reflect daylight to make bedrooms feel twice as large.",
    bullets: [
      "Frosted glass, plain color board, or tinted mirrors",
      "Perimeter LED strip lighting channels built into the framing",
      "Anti-dust sealing strips to keep clothing fresh",
      "Custom internal dresser drawer setups with soft-close slides"
    ],
    benefits: [
      "Space-saving sliding panels",
      "Heavy duty silent runners",
      "Perimeter LED strip backing",
      "Frosted glass & mirror options"
    ]
  },
  "bedrooms": {
    title: "Luxury Fitted Bedrooms Leicester",
    headline: "Bespoke Bedroom Cabinetry & Styling Layouts",
    image: "/images/projects/bedroom_grey_concrete.jpg",
    description: "We create cohesive bedroom layouts. From floor-to-ceiling sliding closets and bedside floating drawer tables to integrated make-up dressing vanity tables, we design custom suites that look like high-end boutique hotels.",
    bullets: [
      "Fitted vanity desk tables with warm backlit mirrors",
      "Matching nightstands and storage chest drawers",
      "Custom headboard wall paneling in matching wood grains",
      "Under-bed storage drawers and custom wardrobe fittings"
    ],
    benefits: [
      "Integrated dressing tables",
      "Cohesive nightstand packages",
      "Custom timber panel backing",
      " Leicester LE5 local supply"
    ]
  },
  "media-walls": {
    title: "TV Media Walls Leicester",
    headline: "Stunning Living Room Feature Media Walls",
    image: "/images/projects/media_wall_beige.jpg",
    description: "Make your entertainment layout a striking focal point. Our bespoke media walls incorporate fully hidden cable conduits, soundbar recesses, floating storage drawer units, and linear electric fireplace cutouts.",
    bullets: [
      "Solid timber framing built flush against your living room wall",
      "Concealed HDMI and power cable conduits behind paneling",
      "Acoustic slat panels or paint-grade smooth plaster boards",
      "Integrated showcase shelving with remote warm LED backing"
    ],
    benefits: [
      "Concealed cable routing",
      "Linear fireplace slots",
      "Warm showcase lighting",
      "Custom soundbar styling"
    ]
  },
  "worktops": {
    title: "Luxury Worktops Leicester",
    headline: "Premium Quartz & Granite Worktops fitted",
    image: "/images/projects/kitchen_grey_angle2.jpg",
    description: "A premium worktop coordinates a luxury kitchen. We supply and professionally fit premium Quartz and Granite surfaces featuring undermount sinks, custom draining grooves, and waterfall cladding edges for kitchen islands.",
    bullets: [
      "Precise laser templating at your Leicester home",
      "Waterfall side cladding profiles for modern islands",
      "Matching quartz splashback cladding and windowsills",
      "Polished undermount sink cutouts and drainer groves"
    ],
    benefits: [
      "Seamless joint bonding",
      "Stain & scratch resistant",
      " waterfall island edges",
      "Direct wholesale trade rates"
    ]
  },
  "bespoke-furniture": {
    title: "Bespoke Furniture Leicester",
    headline: "Hand-Crafted Cabinets & Unique Timber Joinery",
    image: "/images/projects/fitted_wardrobe_desk.jpg",
    description: "Looking for a unique piece of furniture? We craft bespoke items in our Leicester joinery workshop including shoe organizer bench seating, floating alcove drawers, vanity desks, and custom console units.",
    bullets: [
      "Solid timber and high-density fiberboard construction",
      "Sprayed with durable professional lacquered paint colors",
      "Custom size configurations fitting irregular corners",
      "Concealed soft-close hardware on all doors and drawers"
    ],
    benefits: [
      "100% Custom dimensions",
      "Hardwearing sprayed lacquer",
      "Unique alcove storage solutions",
      "Solid drawer box carpentry"
    ]
  },
  "custom-designs": {
    title: "Custom Joinery Designs Leicester",
    headline: "Turning Sketches into High-Grade Carpentry",
    image: "/images/projects/bedroom_beige_dressing_angle2.jpg",
    description: "No matter how complex your storage ideas are, Arshad can design a practical solution. We map out under-stairs drawers, attic sloped-roof closets, and fireplace alcove cupboards, turning sketches into functional joinery.",
    bullets: [
      "Bespoke 3D modeling to coordinate designs",
      "Fitting joinery to sloped attic roofs and awkward angles",
      "Heavy duty runners and concealed push-to-open hinges",
      "Custom materials: Oak veneer, painted MDF, acrylic gloss"
    ],
    benefits: [
      "3D Visual layout designs",
      "Awkward space optimization",
      "Oak veneer & gloss options",
      "Free site templates"
    ]
  },
  "interior-design": {
    title: "Interior Design Services Leicester",
    headline: "Cohesive Material Planning & Room Layouts",
    image: "/images/projects/modern_kitchen_grey.jpg",
    description: "Coordinate your complete renovation layout. We advise on material combinations, cabinet colors, coordinate worktop splashbacks, plan ambient LED placement, and advise on floor tiles to deliver a cohesive luxury aesthetic.",
    bullets: [
      "Bespoke material pairing consultations",
      "Electrical coordinate layouts for spotlights and LEDs",
      "Floor plans mapping out optimal walking spaces",
      "Premium cabinet color selection and handle matching"
    ],
    benefits: [
      "Material mood planning",
      "Lighting placement maps",
      "Cohesive luxury styling",
      " Leicester site planning visit"
    ]
  }
};

interface PageProps {
  params: Promise<{ "service-slug": string }>;
}

export async function generateStaticParams() {
  return [
    { "service-slug": "kitchens" },
    { "service-slug": "kitchen-renovations" },
    { "service-slug": "fitted-wardrobes" },
    { "service-slug": "sliding-wardrobes" },
    { "service-slug": "bedrooms" },
    { "service-slug": "media-walls" },
    { "service-slug": "worktops" },
    { "service-slug": "bespoke-furniture" },
    { "service-slug": "custom-designs" },
    { "service-slug": "interior-design" },
  ];
}

export default async function ServiceDetailPage({ params }: PageProps) {
  // Unwrap the params promise using await
  const resolvedParams = await params;
  const slug = resolvedParams["service-slug"];
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  return (
    <div className="relative font-sans text-text-charcoal bg-white min-h-screen">
      
      {/* Service Header Section */}
      <section className="bg-primary text-white py-16 relative overflow-hidden border-b border-accent/20">
        <div className="absolute inset-0 opacity-15">
          <ImageProtected
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 space-y-4">
          <Link
            href="/services"
            className="inline-flex items-center space-x-2 text-xs text-accent hover:underline uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Services</span>
          </Link>
          <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight">{service.title}</h1>
          <p className="text-gray-300 font-light text-sm md:text-base max-w-2xl leading-relaxed">
            {service.headline}
          </p>
        </div>
      </section>

      {/* Main Content & Form Details */}
      <section className="py-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Side: Service Description */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="space-y-4">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">Luxury Supply & Fit Solutions</h2>
            <p className="text-sm font-light leading-relaxed text-text-charcoal">
              {service.description}
            </p>
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden border border-accent/25 shadow-xl">
            <ImageProtected
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-primary">What Our Service Includes</h3>
            <ul className="space-y-3">
              {service.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-xs font-light leading-relaxed">
                  <span className="bg-accent/15 text-accent p-1 rounded-full shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Right Side: Lead Form & Fast Facts Card */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Quote Card */}
          <div className="bg-white border border-gray-150 rounded-3xl p-6 md:p-8 shadow-xl">
            <h3 className="font-serif text-xl font-bold text-primary mb-3">Enquire About This Service</h3>
            <p className="text-xs text-text-charcoal font-light mb-5">
              Fill out your postcode and details for a free, fully itemized price estimate.
            </p>
            <FreeQuoteForm />
          </div>

          {/* Trust/Credentials Panel */}
          <div className="bg-secondary border border-gray-150 rounded-2xl p-6 space-y-5">
            <h4 className="font-serif text-sm font-bold text-primary uppercase tracking-wider">
              Installation Details
            </h4>
            <div className="space-y-4 text-xs font-light">
              <div className="flex items-center space-x-3">
                <Award className="w-5 h-5 text-accent shrink-0" />
                <span><strong>City & Guilds Carpentry</strong> Level 2 Quality</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-accent shrink-0" />
                <span><strong>10+ Years</strong> Experienced Fitters</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-accent shrink-0" />
                <span><strong>Free 3D Design layouts</strong> on booked orders</span>
              </div>
            </div>
            <div className="border-t border-gray-200/50 pt-4 text-center">
              <a
                href="tel:+447438199369"
                className="text-xs font-bold text-primary hover:text-accent transition-colors block"
              >
                Direct Call: +44 7438 199369
              </a>
            </div>
          </div>

        </div>

      </section>

    </div>
  );
}
