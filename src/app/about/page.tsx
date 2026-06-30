"use client";

import React from "react";
import Link from "next/link";
import { Award, Shield, Hammer, Clock, User, Heart, Star, Sparkles } from "lucide-react";
import ImageProtected from "@/components/image-protected";
import { openQuoteModal } from "@/components/floating-widget";

const companyValues = [
  {
    icon: Hammer,
    title: "City & Guilds Qualified",
    desc: "Every cut, joint, and trim is performed by certified level 2 joiners. We do not compromise on structural carpentry details."
  },
  {
    icon: Shield,
    title: "Honest Trade Pricing",
    desc: "We cut out the sales reps. By sourcing materials directly and designing on-site, we deliver luxury results without retail price markup."
  },
  {
    icon: Heart,
    title: "Family Care & Attentiveness",
    desc: "As Arshad's review notes, we are dedicated to listening to our clients and bringing their unique home visions to life seamlessly."
  },
  {
    icon: Star,
    title: "5-Year Guarantee",
    desc: "We stand behind our installations. Our cabinets and sliding mechanisms carry structural guarantees to offer peace of mind."
  }
];

export default function AboutPage() {
  return (
    <div className="relative font-sans text-text-charcoal bg-white">
      
      {/* Page Header banner */}
      <section className="bg-primary text-white py-20 border-b border-accent/25 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <ImageProtected
            src="/images/projects/sliding_wardrobe_dark.jpg"
            alt="Luxury Interiors backdrop"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">ABOUT GRAPHENE INTERIORS</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white">Our Story & Craft</h1>
          <p className="text-gray-300 font-light max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Leicester's trusted experts in bespoke kitchens, sliding wardrobes, and media walls. Directed by Level 2 qualified carpenters with 15+ years experience.
          </p>
        </div>
      </section>

      {/* Intro & Credentials */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Story copy */}
        <div className="space-y-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent block">Precision Carpentry</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">
            Driven by Passion, Built for Leicestershire Families
          </h2>
          <p className="text-sm font-light leading-relaxed">
            Founded by veteran joiner Arshad, Graphene Interiors Ltd was incorporated in 2024 to bring premium quality interior carpentry directly to Leicester homes. We specialize in supply-and-fit kitchens, sliding wardrobe sets, and bespoke custom units.
          </p>
          <p className="text-sm font-light leading-relaxed">
            Our company operates on a simple principle: outstanding value for money. We bypass retail sales staff and flat-pack kit limitations. Instead, we use trade-only cabinet suppliers, hand-fit custom drawers, and utilize heavy-duty track runs to deliver bespoke spaces that look and feel worth £5,000 to £10,000.
          </p>

          <div className="bg-secondary border border-gray-150 p-6 rounded-2xl space-y-4">
            <h4 className="font-serif text-base font-bold text-primary flex items-center space-x-2">
              <Award className="w-5 h-5 text-accent" />
              <span>Qualifications & Facilities</span>
            </h4>
            <ul className="space-y-2 text-xs font-light text-text-charcoal pl-7 list-disc">
              <li>City & Guilds Carpentry & Joinery Level 2 Certification</li>
              <li>10+ Years Active On-Site Installation Experience in the Midlands</li>
              <li>Official UK Limited Incorporation (Active from 2024)</li>
              <li>Own factory and professional machinery</li>
              <li>Onsite cutting for precise, flush fitments</li>
              <li>Separate showroom to view collections</li>
            </ul>
          </div>
        </div>

        {/* Story visual */}
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-accent/25 bg-primary">
          <video
            className="w-full h-full object-cover select-none pointer-events-none"
            src="/videos/manufacturing.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
        </div>

      </section>

      {/* Mission & Vision Banner */}
      <section className="bg-secondary py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent">OUR MISSION</span>
            <h3 className="font-serif text-2xl font-bold text-primary">Unlocking Storage & Style</h3>
            <p className="text-xs font-light leading-relaxed text-text-charcoal">
              To eliminate wasted space. We construct fitted joinery that matches the contour of Leicester properties, ensuring maximum storage depth and visual elegance at a fraction of high-street showroom prices.
            </p>
          </div>
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent">OUR VISION</span>
            <h3 className="font-serif text-2xl font-bold text-primary">Setting the Luxury Benchmark</h3>
            <p className="text-xs font-light leading-relaxed text-text-charcoal">
              To be recognized as Leicester's top-tier brand for luxury kitchen renovations and bespoke wardrobes, noted for Arshad's signature attentiveness and unmatched structural durability.
            </p>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent block mb-2">How We Work</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">Our Core Values</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {companyValues.map((value, idx) => {
            const Icon = value.icon;
            return (
              <div key={idx} className="bg-white border border-gray-150 p-8 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow">
                <div className="bg-accent/15 text-accent p-3.5 rounded-xl inline-block">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-primary">{value.title}</h4>
                <p className="text-xs font-light text-text-charcoal leading-relaxed">{value.desc}</p>
              </div>
            );
          })}
        </div>
      </section>



      {/* Customer Commitment CTA */}
      <section className="py-24 max-w-5xl mx-auto px-6 text-center space-y-6">
        <Sparkles className="w-10 h-10 text-accent mx-auto" />
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary">Our Promise to You</h2>
        <p className="text-sm font-light text-text-charcoal leading-relaxed max-w-2xl mx-auto">
          We treat every kitchen fitout and fitted wardrobe project as if it were for our own home. You will receive transparent pricing, tidy work sites, and communication directly with Arshad throughout.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={openQuoteModal}
            className="bg-accent hover:bg-accent-hover text-primary font-bold tracking-widest uppercase px-8 py-4 rounded-lg shadow-md cursor-pointer text-xs"
          >
            Request Free Design Consult
          </button>
          <Link
            href="/contact"
            className="bg-primary hover:bg-primary/95 text-white font-bold tracking-widest uppercase px-8 py-4 rounded-lg shadow-md border border-accent/20 text-xs"
          >
            Contact Leicester Office
          </Link>
        </div>
      </section>

    </div>
  );
}
