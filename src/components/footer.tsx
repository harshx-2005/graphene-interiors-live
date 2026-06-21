"use client";

import React from "react";
import Link from "next/link";
import { openQuoteModal } from "./floating-widget";

const servicesList = [
  { name: "Luxury Kitchens", href: "/services/kitchens" },
  { name: "Bedrooms & Wardrobes", href: "/services/bedrooms" },
  { name: "Media Walls", href: "/services/media-walls" },
  { name: "Premium Worktops", href: "/services/worktops" },
  { name: "Fitted Wardrobes", href: "/services/fitted-wardrobes" },
  { name: "Sliding Wardrobes", href: "/services/sliding-wardrobes" },
  { name: "Bespoke Furniture", href: "/services/bespoke-furniture" },
  { name: "Custom Designs", href: "/services/custom-designs" },
  { name: "Interior Design", href: "/services/interior-design" },
];

const seoPagesList = [
  { name: "Kitchen Fitters Leicester", href: "/kitchen-fitters-leicester" },
  { name: "Kitchen Renovations Leicester", href: "/kitchen-renovations-leicester" },
  { name: "Media Walls Leicester", href: "/media-walls-leicester" },
  { name: "Fitted Wardrobes Leicester", href: "/fitted-wardrobes-leicester" },
  { name: "Sliding Wardrobes Leicester", href: "/sliding-wardrobes-leicester" },
  { name: "Worktops Leicester", href: "/worktops-leicester" },
  { name: "Custom Furniture Leicester", href: "/custom-furniture-leicester" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-gray-300 border-t border-accent/20 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Company Identity & Accreditations */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center space-x-3 select-none">
            <div className="h-12 w-12 bg-white rounded-lg shadow-lg border border-accent/20 p-1 flex items-center justify-center overflow-hidden shrink-0">
              <img
                src="/images/logo.png"
                alt="Graphene Interiors Logo Icon"
                className="w-full h-full object-contain origin-left scale-[1.5]"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-widest text-white">
                GRAPHENE
              </span>
              <span className="text-[10px] font-sans tracking-[0.35em] text-accent font-semibold uppercase -mt-0.5">
                INTERIORS
              </span>
            </div>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed">
            Leicester's premier choice for bespoke kitchen installations, sliding wardrobes, TV media walls, and complete custom home joinery.
          </p>
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-3 text-xs">
              <i className="fa-solid fa-award text-accent text-lg shrink-0"></i>
              <span>City & Guilds Carpentry & Joinery Level 2</span>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <i className="fa-solid fa-shield-halved text-accent text-lg shrink-0"></i>
              <span>15+ Years Professional Experience</span>
            </div>
          </div>
        </div>

        {/* Quick Links / Services */}
        <div>
          <h4 className="font-serif text-lg font-semibold text-white mb-6 tracking-wide border-b border-white/5 pb-2">
            Our Services
          </h4>
          <ul className="grid grid-cols-1 gap-2.5 text-sm">
            {servicesList.map((service) => (
              <li key={service.name}>
                <Link
                  href={service.href}
                  className="hover:text-accent transition-colors block py-0.5"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Business Info & Contacts */}
        <div className="space-y-6">
          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-6 tracking-wide border-b border-white/5 pb-2">
              Contact Details
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <a href="tel:+447775099710" className="flex items-start space-x-3 hover:text-accent transition-colors">
                  <i className="fa-solid fa-phone text-accent mt-1 shrink-0"></i>
                  <span>+44 7775 099710</span>
                </a>
              </li>
              <li>
                <a href="mailto:grapheneinteriors@gmail.com" className="flex items-start space-x-3 hover:text-accent transition-colors">
                  <i className="fa-solid fa-envelope text-accent mt-1 shrink-0"></i>
                  <span className="break-all">grapheneinteriors@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <i className="fa-solid fa-location-dot text-accent mt-1 shrink-0"></i>
                <span>
                  48 Chesterfield Road<br />
                  Leicester, LE5 5LF<br />
                  United Kingdom
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-accent mb-2">Business Hours</h5>
            <div className="flex items-center space-x-2 text-xs">
              <i className="fa-solid fa-clock text-gray-400"></i>
              <span>Monday – Saturday: 9:00 AM – 6:00 PM</span>
            </div>
          </div>
        </div>

        {/* Location Google Map Window */}
        <div>
          <h4 className="font-serif text-lg font-semibold text-white mb-6 tracking-wide border-b border-white/5 pb-2">
            Find Us / Location
          </h4>
          <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-accent/20 shadow-2xl relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2404.1485699479374!2d-1.0970365842880796!3d52.63750057983693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48776101c5f3e9c7%3A0xe54d3bf9cbb87b1e!2s48%20Chesterfield%20Rd%2C%20Leicester%20LE5%205LF%2C%20UK!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Graphene Interiors Location Map"
            />
          </div>
          <div className="mt-3 flex justify-between items-center text-xs">
            <span className="text-gray-400">LE5 5LF, Leicester</span>
            <a
              href="https://maps.app.goo.gl/uP9fP2fM8T8U13r57"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline uppercase font-bold tracking-wider"
            >
              Get Directions ↗
            </a>
          </div>
        </div>

      </div>

      {/* Catchment / Local SEO Areas link bar */}
      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 py-8">
        <h5 className="text-xs font-bold uppercase tracking-widest text-accent mb-4 text-center lg:text-left">
          Local Areas We Serve in Leicester
        </h5>
        <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-xs">
          {seoPagesList.map((area) => (
            <Link
              key={area.name}
              href={area.href}
              className="text-gray-400 hover:text-accent transition-colors"
            >
              {area.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
        <div>
          © {currentYear} Graphene Interiors Ltd. All Rights Reserved. Company Registered in UK (2024).
        </div>
        <div className="flex space-x-6">
          <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          <a
            href="https://instagram.com/graphene_interiorsltd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Instagram: @graphene_interiorsltd
          </a>
        </div>
      </div>
    </footer>
  );
}
