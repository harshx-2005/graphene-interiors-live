"use client";

import React, { useState, useTransition } from "react";
import { Save, Loader2, Contact } from "lucide-react";
import { updateContactAction } from "@/actions/content";
import { InputField, TextareaField } from "@/components/admin/form-inputs";
import { useToast } from "@/components/providers";

interface ContactFormProps {
  initialData: {
    businessName: string;
    phone: string;
    email: string;
    whatsApp: string;
    address: string;
    googleMapsEmbedUrl: string;
    googleMapsLink: string;
    openingHoursJson: string;
    socialLinksJson: string;
  };
}

export default function ContactForm({ initialData }: ContactFormProps) {
  const { success, error: toastError } = useToast();
  const [isPending, startTransition] = useTransition();

  // Basic Fields
  const [businessName, setBusinessName] = useState(initialData.businessName);
  const [phone, setPhone] = useState(initialData.phone);
  const [email, setEmail] = useState(initialData.email);
  const [whatsApp, setWhatsApp] = useState(initialData.whatsApp);
  const [address, setAddress] = useState(initialData.address);
  const [googleMapsEmbedUrl, setGoogleMapsEmbedUrl] = useState(initialData.googleMapsEmbedUrl);
  const [googleMapsLink, setGoogleMapsLink] = useState(initialData.googleMapsLink);

  // Social Links state
  const parseSocial = () => {
    try {
      return JSON.parse(initialData.socialLinksJson) || {};
    } catch (e) {
      return {};
    }
  };
  const [socials, setSocials] = useState<any>(parseSocial());

  const handleSocialChange = (key: string, val: string) => {
    setSocials({ ...socials, [key]: val });
  };

  // Opening Hours state
  const parseHours = () => {
    try {
      return JSON.parse(initialData.openingHoursJson) || [];
    } catch (e) {
      return [];
    }
  };
  const [hours, setHours] = useState<any[]>(parseHours());

  const handleHoursChange = (idx: number, key: string, val: string) => {
    const next = [...hours];
    next[idx][key] = val;
    setHours(next);
  };

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("businessName", businessName);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("whatsApp", whatsApp);
    formData.append("address", address);
    formData.append("googleMapsEmbedUrl", googleMapsEmbedUrl);
    formData.append("googleMapsLink", googleMapsLink);
    formData.append("openingHoursJson", JSON.stringify(hours));
    formData.append("socialLinksJson", JSON.stringify(socials));

    startTransition(async () => {
      const res = await updateContactAction(formData);
      if (res.success) {
        success("Contact details updated successfully!");
      } else {
        toastError(res.error || "Failed to update details.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 font-sans max-w-4xl text-gray-200">
      
      {/* 1. Core Contact details */}
      <div className="bg-[#0d1222] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
        <h3 className="text-white font-serif text-lg font-bold flex items-center gap-2">
          <Contact className="w-5 h-5 text-accent" />
          <span>Core Contact Coordinates</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Business Name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
          />
          <InputField
            label="Phone Hotline Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputField
            label="WhatsApp Number / Contact URL Link"
            value={whatsApp}
            onChange={(e) => setWhatsApp(e.target.value)}
            required
          />
        </div>

        <TextareaField
          label="Postal Street Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>

      {/* 2. Opening hours */}
      <div className="bg-[#0d1222] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
        <h3 className="text-white font-serif text-lg font-bold">Business Hours</h3>
        <p className="text-gray-400 text-xs font-light">Specify days and opening durations shown in contact grids.</p>

        <div className="space-y-4">
          {hours.map((item, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#090c16] border border-white/5 p-4 rounded-xl">
              <InputField
                label="Days Group"
                value={item.day}
                onChange={(e) => handleHoursChange(idx, "day", e.target.value)}
                required
              />
              <InputField
                label="Duration Hours"
                value={item.hours}
                onChange={(e) => handleHoursChange(idx, "hours", e.target.value)}
                required
              />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Social connections */}
      <div className="bg-[#0d1222] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
        <h3 className="text-white font-serif text-lg font-bold">Social Media Profiles</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Instagram URL Link"
            value={socials.instagram || ""}
            onChange={(e) => handleSocialChange("instagram", e.target.value)}
            placeholder="https://instagram.com/..."
          />
          <InputField
            label="WhatsApp Direct Chat URL"
            value={socials.whatsapp || ""}
            onChange={(e) => handleSocialChange("whatsapp", e.target.value)}
            placeholder="https://wa.me/..."
          />
        </div>
      </div>

      {/* 4. Google Maps Embed and links */}
      <div className="bg-[#0d1222] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
        <h3 className="text-white font-serif text-lg font-bold">Google Maps Coordinates</h3>
        
        <InputField
          label="Google Maps Embed URL (iframe src link)"
          value={googleMapsEmbedUrl}
          onChange={(e) => setGoogleMapsEmbedUrl(e.target.value)}
          required
        />
        <InputField
          label="Google Maps Direct Link URL (Get Directions)"
          value={googleMapsLink}
          onChange={(e) => setGoogleMapsLink(e.target.value)}
          required
        />
      </div>

      {/* Submit Action */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-xl transition-all disabled:opacity-50 cursor-pointer"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Contact Changes</span>
            </>
          )}
        </button>
      </div>

    </form>
  );
}
