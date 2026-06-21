"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { openQuoteModal } from "./floating-widget";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

const serviceLinks = [
  { name: "Kitchens", href: "/services/kitchens" },
  { name: "Bedrooms & Wardrobes", href: "/services/bedrooms" },
  { name: "Media Walls", href: "/services/media-walls" },
  { name: "Luxury Worktops", href: "/services/worktops" },
  { name: "Fitted Wardrobes", href: "/services/fitted-wardrobes" },
  { name: "Sliding Wardrobes", href: "/services/sliding-wardrobes" },
  { name: "Bespoke Furniture", href: "/services/bespoke-furniture" },
  { name: "Interior Design", href: "/services/interior-design" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 bg-primary/95 backdrop-blur-md py-4 shadow-xl border-b border-accent/15"
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group select-none">
            <div className="h-10 w-10 md:h-12 md:w-12 bg-white rounded-lg shadow-lg border border-accent/20 p-1 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-accent overflow-hidden shrink-0">
              <img
                src="/images/logo.png"
                alt="Graphene Interiors Logo Icon"
                className="w-full h-full object-contain origin-left scale-[1.5]"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg md:text-xl font-bold tracking-widest text-white group-hover:text-accent transition-colors">
                GRAPHENE
              </span>
              <span className="text-[9px] font-sans tracking-[0.35em] text-accent font-semibold uppercase -mt-0.5">
                INTERIORS
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-sm font-medium tracking-wider transition-colors hover:text-accent ${
                pathname === "/" ? "text-accent" : "text-gray-300"
              }`}
            >
              Home
            </Link>
            
            <Link 
              href="/about" 
              className={`text-sm font-medium tracking-wider transition-colors hover:text-accent ${
                pathname === "/about" ? "text-accent" : "text-gray-300"
              }`}
            >
              About Us
            </Link>

            {/* Services Dropdown Trigger */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <button 
                onClick={() => setServicesDropdown(!servicesDropdown)}
                className={`text-sm font-medium tracking-wider transition-colors hover:text-accent flex items-center space-x-1 cursor-pointer ${
                  pathname.startsWith("/services") ? "text-accent" : "text-gray-300"
                }`}
              >
                <span>Services</span>
                <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 ${servicesDropdown ? "rotate-180" : ""}`}></i>
              </button>

              <AnimatePresence>
                {servicesDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-primary border border-accent/25 rounded-2xl shadow-2xl p-4 glass-panel-dark grid grid-cols-1 gap-1"
                  >
                    {serviceLinks.map((service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        className={`px-4 py-2 rounded-lg text-xs tracking-wider transition-colors hover:bg-white/5 hover:text-accent ${
                          pathname === service.href ? "text-accent font-semibold" : "text-gray-300"
                        }`}
                      >
                        {service.name}
                      </Link>
                    ))}
                    <div className="border-t border-white/10 my-2 pt-2 text-center">
                      <Link 
                        href="/services" 
                        className="text-[10px] font-bold tracking-widest text-accent hover:underline block"
                      >
                        VIEW ALL SERVICES
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              href="/portfolio" 
              className={`text-sm font-medium tracking-wider transition-colors hover:text-accent ${
                pathname === "/portfolio" ? "text-accent" : "text-gray-300"
              }`}
            >
              Portfolio
            </Link>

            <Link 
              href="/contact" 
              className={`text-sm font-medium tracking-wider transition-colors hover:text-accent ${
                pathname === "/contact" ? "text-accent" : "text-gray-300"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center space-x-6">
            <a 
              href="tel:+447775099710"
              className="flex items-center space-x-2 text-sm text-gray-300 hover:text-accent transition-colors font-medium font-sans"
            >
              <i className="fa-solid fa-phone text-accent animate-pulse"></i>
              <span>+44 7775 099710</span>
            </a>
            
            <button
              onClick={openQuoteModal}
              className="bg-accent hover:bg-accent-hover text-primary font-semibold text-xs tracking-widest uppercase px-6 py-3 rounded-lg border border-accent/20 transition-all shadow-md cursor-pointer hover:shadow-lg"
            >
              Get Free Quote
            </button>
          </div>

          {/* Mobile Hamburguer Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white hover:text-accent transition-colors p-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <i className="fa-solid fa-xmark text-2xl"></i> : <i className="fa-solid fa-bars text-2xl"></i>}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/95 backdrop-blur-lg z-30 lg:hidden flex flex-col justify-center px-8"
          >
            <nav className="flex flex-col space-y-6 text-center my-auto">
              <Link 
                href="/" 
                className="font-serif text-2xl text-white hover:text-accent transition-colors tracking-wide"
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="font-serif text-2xl text-white hover:text-accent transition-colors tracking-wide"
              >
                About Us
              </Link>
              
              <div className="border-y border-white/5 py-4 max-h-[30vh] overflow-y-auto">
                <span className="text-[10px] font-bold tracking-[0.2em] text-accent block mb-3 uppercase">
                  Our Luxury Services
                </span>
                <div className="grid grid-cols-2 gap-2 text-center text-sm font-sans text-gray-400">
                  {serviceLinks.map((service) => (
                    <Link key={service.name} href={service.href} className="hover:text-white py-1">
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link 
                href="/portfolio" 
                className="font-serif text-2xl text-white hover:text-accent transition-colors tracking-wide"
              >
                Portfolio
              </Link>
              <Link 
                href="/contact" 
                className="font-serif text-2xl text-white hover:text-accent transition-colors tracking-wide"
              >
                Contact
              </Link>
            </nav>

            <div className="mt-auto mb-12 flex flex-col items-center space-y-4">
              <a 
                href="tel:+447775099710"
                className="flex items-center space-x-2 text-lg text-white font-medium"
              >
                <i className="fa-solid fa-phone text-accent"></i>
                <span>+44 7775 099710</span>
              </a>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setTimeout(openQuoteModal, 200);
                }}
                className="w-full bg-accent hover:bg-accent-hover text-primary font-bold tracking-widest uppercase py-4 rounded-xl shadow-lg border border-accent/20 cursor-pointer text-sm"
              >
                Get Free Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
