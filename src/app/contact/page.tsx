"use client";

import React from "react";
import { Phone, Mail, MapPin, Clock, FileText } from "lucide-react";
import ImageProtected from "@/components/image-protected";
import { FreeQuoteForm } from "@/components/lead-forms";

export default function ContactPage() {
  return (
    <div className="relative font-sans text-text-charcoal bg-white min-h-screen">
      
      {/* Page Header */}
      <section className="bg-primary text-white py-16 text-center border-b border-accent/20">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">GET IN TOUCH</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Contact Graphene Interiors</h1>
          <p className="text-gray-300 font-light max-w-xl mx-auto text-xs md:text-sm">
            Leicester based joiners & kitchen installers. Reach out directly or book your free initial site consultation.
          </p>
        </div>
      </section>

      {/* Main Grid Details */}
      <section className="py-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Side: Contact Information & Google Map Embed */}
        <div className="lg:col-span-6 space-y-10">
          
          <div className="space-y-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">Office & Joinery Details</h2>
            <p className="text-sm font-light leading-relaxed text-text-charcoal">
              Have questions about your project or need a quote? Reach out to Arshad directly via phone or WhatsApp, or visit our Chesterfield Road coordinates.
            </p>

            <ul className="space-y-6 text-sm">
              <li className="flex items-start space-x-4">
                <div className="bg-accent/15 text-accent p-3 rounded-xl shrink-0 mt-1">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-base">Phone Hotline</h4>
                  <a href="tel:+447438199369" className="text-text-charcoal hover:text-accent font-medium mt-0.5 block text-sm">
                    +44 7438 199369
                  </a>
                  <span className="text-xs text-gray-500 font-light block">Direct call</span>
                </div>
              </li>

              <li className="flex items-start space-x-4">
                <div className="bg-[#25D366]/10 text-[#25D366] p-3 rounded-xl shrink-0 mt-1">
                  <i className="fa-brands fa-whatsapp text-xl w-5 h-5 flex items-center justify-center"></i>
                </div>
                <div>
                  <h4 className="font-bold text-primary text-base">WhatsApp Chat</h4>
                  <a 
                    href="https://wa.me/447438199369" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-charcoal hover:text-[#25D366] font-medium mt-0.5 block text-sm"
                  >
                    Chat on WhatsApp (Click here)
                  </a>
                  <span className="text-xs text-gray-500 font-light block">Share project sketches and dimensions</span>
                </div>
              </li>

              <li className="flex items-start space-x-4">
                <div className="bg-accent/15 text-accent p-3 rounded-xl shrink-0 mt-1">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-base">Email Inquiries</h4>
                  <a href="mailto:grapheneinteriors@gmail.com" className="text-text-charcoal hover:text-accent font-medium mt-0.5 block text-sm">
                    grapheneinteriors@gmail.com
                  </a>
                  <span className="text-xs text-gray-500 font-light block">General trade & supply requests</span>
                </div>
              </li>

              <li className="flex items-start space-x-4">
                <div className="bg-accent/15 text-accent p-3 rounded-xl shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-base">Leicester Office</h4>
                  <p className="text-text-charcoal font-light leading-relaxed mt-0.5 text-sm">
                    48 Chesterfield Road<br />
                    Leicester, LE5 5LF<br />
                    United Kingdom
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-4">
                <div className="bg-accent/15 text-accent p-3 rounded-xl shrink-0 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-base">Business Hours</h4>
                  <p className="text-text-charcoal font-light leading-relaxed mt-0.5 text-sm">
                    Monday – Saturday: 9:00 AM – 6:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Large Google Map window */}
          <div className="space-y-4 pt-4">
            <h3 className="font-serif text-lg font-bold text-primary">Location Map</h3>
            <div className="w-full aspect-video rounded-2xl overflow-hidden border border-accent/25 shadow-xl relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2404.1485699479374!2d-1.0970365842880796!3d52.63750057983693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48776101c5f3e9c7%3A0xe54d3bf9cbb87b1e!2s48%20Chesterfield%20Rd%2C%20Leicester%20LE5%205LF%2C%20UK!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Graphene Interiors Large Contact Map"
              />
            </div>
          </div>

        </div>

        {/* Right Side: Quote/Lead Form */}
        <div className="lg:col-span-6">
          <div className="bg-white border border-gray-150 rounded-3xl p-6 md:p-10 shadow-2xl space-y-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-primary flex items-center space-x-2">
                <FileText className="w-6 h-6 text-accent" />
                <span>Request Your Free Estimate</span>
              </h3>
              <p className="text-xs text-text-charcoal font-light mt-1.5 leading-relaxed">
                Provide your room requirements, postcode, and a budget range. We will formulate an estimation and call/message you to finalize options.
              </p>
            </div>
            <FreeQuoteForm />
          </div>
        </div>

      </section>

    </div>
  );
}
