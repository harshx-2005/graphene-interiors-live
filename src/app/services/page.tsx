"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check, Sparkles, Phone } from "lucide-react";
import ImageProtected from "@/components/image-protected";
import { openQuoteModal } from "@/components/floating-widget";

const allServices = [
  {
    slug: "kitchens",
    title: "Luxury Kitchens",
    desc: "Bespoke high-end kitchen installations featuring custom gloss cabinets, breakfast islands, and custom hardware integrations.",
    benefits: ["Hand-fitted joinery", "German soft-close hinges", "Premium storage racks"],
    image: "/images/projects/modern_kitchen_beige.jpg",
  },
  {
    slug: "kitchen-renovations",
    title: "Full Kitchen Renovations",
    desc: "Complete kitchen teardowns and transformations. We handle plumbing, gas fitting, tiling, plastering, and custom joinery.",
    benefits: ["Full project management", "Gas Safe/NICEIC contractors", "Integrated lighting"],
    image: "/images/projects/modern_kitchen_grey.jpg",
  },
  {
    slug: "fitted-wardrobes",
    title: "Fitted Wardrobes",
    desc: "Classic shaker and contemporary fitted wardrobe closets custom-measured to align flush against Leicester bedroom walls.",
    benefits: ["Floor-to-ceiling framing", "Custom shelf arrays", "Integrated vanity options"],
    image: "/images/projects/fitted_wardrobe_desk.jpg",
  },
  {
    slug: "sliding-wardrobes",
    title: "Sliding Wardrobes",
    desc: "Contemporary sliding panel systems in mirrored glass or frosted panels, maximizing walking room in smaller spaces.",
    benefits: ["Anti-dust sliding tracks", "Space-maximizing panels", "Ambient LED borders"],
    image: "/images/projects/sliding_wardrobe_dark.jpg",
  },
  {
    slug: "bedrooms",
    title: "Bedrooms",
    desc: "Complete bedroom cabinetry fitouts, including side drawer units, dressing tables, headboard paneling, and storage.",
    benefits: ["Bespoke dressing tables", "Matching drawer chests", "Acoustic wood backing"],
    image: "/images/projects/bedroom_grey_concrete.jpg",
  },
  {
    slug: "media-walls",
    title: "TV Media Walls",
    desc: "Stunning living room feature walls displaying large TV screens, electric fireplaces, and display shelving.",
    benefits: ["Hidden cable management", "Integrated LED channels", "Custom storage bays"],
    image: "/images/projects/media_wall_beige.jpg",
  },
  {
    slug: "worktops",
    title: "Luxury Worktops",
    desc: "Slab supply and fitting of premium Quartz, Granite, and Solid Oak surfaces with custom waterfall edges.",
    benefits: ["Seamless undermount sinks", "Stain-resistant Quartz", "Waterfall edge profiles"],
    image: "/images/projects/kitchen_grey_angle2.jpg",
  },
  {
    slug: "bespoke-furniture",
    title: "Bespoke Furniture",
    desc: "Individually styled cabinetry, window benches, floating shelves, and timber drawer sets tailored to Leicester homes.",
    benefits: ["Durable lacquer coatings", "Solid joinery framing", "Custom size fittings"],
    image: "/images/projects/fitted_wardrobe_desk.jpg",
  },
  {
    slug: "custom-designs",
    title: "Custom Designs",
    desc: "Tailored carpentry projects based on hand sketches, adapting storage to irregular ceiling lines and chimney breasts.",
    benefits: ["Bespoke 3D representations", "Optimized space fitting", "Unique styling cues"],
    image: "/images/projects/sliding_wardrobe_green.jpg",
  },
  {
    slug: "interior-design",
    title: "Interior Design",
    desc: "Complete color palette alignment, materials consultation, and layout optimization services for full home transformations.",
    benefits: ["Material mood boards", "Lighting layout mockups", "Cohesive interior planning"],
    image: "/images/projects/modern_kitchen_grey.jpg",
  },
];

export default function ServicesPage() {
  return (
    <div className="relative font-sans text-text-charcoal bg-white min-h-screen">
      
      {/* Page Header */}
      <section className="bg-primary text-white py-16 text-center border-b border-accent/20">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">WHAT WE SPECIALIZE IN</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Our Luxury Service Offerings</h1>
          <p className="text-gray-300 font-light max-w-xl mx-auto text-xs md:text-sm">
            Handmade in Leicestershire. We offer a full spectrum of joinery, kitchen fitting, wardrobe installation, and interior renovative solutions.
          </p>
        </div>
      </section>

      {/* Services List Grid */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allServices.map((service) => (
            <div
              key={service.slug}
              className="bg-secondary border border-gray-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Visual */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <ImageProtected
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-primary/95 text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded border border-white/10 z-20">
                    Hand-crafted
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4">
                  <h3 className="font-serif text-xl font-bold text-primary">{service.title}</h3>
                  <p className="text-xs text-text-charcoal font-light leading-relaxed">{service.desc}</p>
                  
                  <ul className="space-y-1.5 pt-2">
                    {service.benefits.map((b) => (
                      <li key={b} className="flex items-center space-x-2 text-xs font-light text-text-charcoal">
                        <Check className="w-4 h-4 text-accent shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-6 border-t border-gray-150 flex items-center justify-between">
                <Link
                  href={`/services/${service.slug}`}
                  className="text-xs font-bold text-primary hover:text-accent uppercase tracking-wider flex items-center space-x-1.5"
                >
                  <span>Explore Service</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={openQuoteModal}
                  className="bg-primary hover:bg-accent text-white hover:text-primary px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Get Quote
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Trust CTA Section */}
      <section className="bg-secondary py-20 border-t border-gray-150 text-center space-y-6">
        <Sparkles className="w-10 h-10 text-accent mx-auto" />
        <h2 className="font-serif text-3xl font-bold text-primary">Need a Fully Custom Fitout?</h2>
        <p className="text-sm text-text-charcoal max-w-lg mx-auto font-light leading-relaxed">
          We draft custom layouts and construct units around chimney breasts and sloped ceilings. Talk to Arshad about your specific layout.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={openQuoteModal}
            className="bg-accent hover:bg-accent-hover text-primary font-bold tracking-widest uppercase px-6 py-3.5 rounded-lg shadow-md cursor-pointer text-xs"
          >
            Book Free Consultation
          </button>
          <a
            href="tel:+447438199369"
            className="bg-white hover:bg-gray-50 text-primary border border-gray-200 font-bold tracking-widest uppercase px-6 py-3.5 rounded-lg shadow-md flex items-center space-x-2 text-xs"
          >
            <Phone className="w-4 h-4 text-accent" />
            <span>Call Now</span>
          </a>
        </div>
      </section>

    </div>
  );
}
