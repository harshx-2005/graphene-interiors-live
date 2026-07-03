"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle, Upload } from "lucide-react";

// Form Validation Schema
const quoteFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number (min 10 digits)"),
  email: z.string().email("Please enter a valid email address"),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget range"),
  address: z.string().min(5, "Please enter your project address"),
  message: z.string().optional(),
  contactMethod: z.enum(["phone", "whatsapp", "email"]),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

export function FreeQuoteForm({ onSuccess }: { onSuccess?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [whatsappLink, setWhatsappLink] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      contactMethod: "phone",
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: QuoteFormValues) => {
    setIsSubmitting(true);
    try {
      const serviceName = {
        kitchens: "Kitchens",
        bedrooms: "Bedrooms / Wardrobes",
        "media-walls": "Media Walls",
        worktops: "Worktops",
        renovations: "Full Renovations",
        bespoke: "Bespoke Furniture",
        "interior-design": "Interior Design"
      }[data.service] || data.service;

      const budgetName = {
        "under-5k": "Under £5,000",
        "5k-10k": "£5,000 – £10,000",
        "10k-20k": "£10,000 – £20,000",
        "20k-35k": "£20,000 – £35,000",
        "35k-50k": "£35,000 – £50,000",
        "50k-plus": "£50,000+"
      }[data.budget] || data.budget;

      const whatsappMsg = `Hi Graphene Interiors,\n\nI would like to request a free quote:\n• Name: ${data.name}\n• Phone: ${data.phone}\n• Email: ${data.email}\n• Service: ${serviceName}\n• Budget: ${budgetName}\n• Location: ${data.address}${data.message ? `\n• Details: ${data.message}` : ""}`;
      const encodedMsg = encodeURIComponent(whatsappMsg);
      const link = `https://wa.me/447438199369?text=${encodedMsg}`;
      
      setWhatsappLink(link);
      window.open(link, "_blank");

      setSubmitSuccess(true);
      reset();
      setPhotoName(null);
      setPhotoBase64(null);
      if (onSuccess) {
        setTimeout(onSuccess, 5000);
      }
    } catch (err) {
      console.error(err);
      alert("Error preparing WhatsApp message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
        <CheckCircle className="w-16 h-16 text-accent mb-4" />
        <h3 className="text-2xl font-serif font-semibold text-primary mb-2">Ready to Send on WhatsApp</h3>
        <p className="text-text-charcoal max-w-sm mb-6 text-sm">
          We have generated your request details. Click the button below to open WhatsApp and send your quote request directly to Arshad.
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold tracking-widest uppercase px-8 py-4 rounded-lg shadow-md cursor-pointer text-xs transition-colors"
        >
          <i className="fa-brands fa-whatsapp text-lg"></i>
          <span>Send on WhatsApp</span>
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">Full Name *</label>
          <input
            type="text"
            {...register("name")}
            className="w-full bg-secondary border border-gray-200 px-4 h-12 rounded-lg text-primary focus:outline-none focus:border-accent transition-colors"
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">Phone Number *</label>
          <input
            type="tel"
            {...register("phone")}
            className="w-full bg-secondary border border-gray-200 px-4 h-12 rounded-lg text-primary focus:outline-none focus:border-accent transition-colors"
            placeholder="+44 7438 199369"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">Email Address *</label>
          <input
            type="email"
            {...register("email")}
            className="w-full bg-secondary border border-gray-200 px-4 h-12 rounded-lg text-primary focus:outline-none focus:border-accent transition-colors"
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">Service Required *</label>
          <select
            {...register("service")}
            className="w-full bg-secondary border border-gray-200 px-4 h-12 rounded-lg text-primary focus:outline-none focus:border-accent transition-colors cursor-pointer"
          >
            <option value="">Select Service...</option>
            <option value="kitchens">Kitchens</option>
            <option value="bedrooms">Bedrooms / Wardrobes</option>
            <option value="media-walls">Media Walls</option>
            <option value="worktops">Worktops</option>
            <option value="renovations">Full Renovations</option>
            <option value="bespoke">Bespoke Furniture</option>
            <option value="interior-design">Interior Design</option>
          </select>
          {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">Project Budget *</label>
          <select
            {...register("budget")}
            className="w-full bg-secondary border border-gray-200 px-4 h-12 rounded-lg text-primary focus:outline-none focus:border-accent transition-colors cursor-pointer"
          >
            <option value="">Select Budget Range...</option>
            <option value="under-5k">Under £5,000</option>
            <option value="5k-10k">£5,000 – £10,000</option>
            <option value="10k-20k">£10,000 – £20,000</option>
            <option value="20k-35k">£20,000 – £35,000</option>
            <option value="35k-50k">£35,000 – £50,000</option>
            <option value="50k-plus">£50,000+</option>
          </select>
          {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">Project Location / Postcode *</label>
          <input
            type="text"
            {...register("address")}
            className="w-full bg-secondary border border-gray-200 px-4 h-12 rounded-lg text-primary focus:outline-none focus:border-accent transition-colors"
            placeholder="Leicester, LE5 5LF"
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">Preferred Contact Method *</label>
        <div className="flex gap-6 mt-1">
          <label className="flex items-center space-x-2 text-sm text-text-charcoal cursor-pointer">
            <input type="radio" value="phone" {...register("contactMethod")} className="accent-accent w-4 h-4" />
            <span>Call Now</span>
          </label>
          <label className="flex items-center space-x-2 text-sm text-text-charcoal cursor-pointer">
            <input type="radio" value="whatsapp" {...register("contactMethod")} className="accent-accent w-4 h-4" />
            <span>WhatsApp</span>
          </label>
          <label className="flex items-center space-x-2 text-sm text-text-charcoal cursor-pointer">
            <input type="radio" value="email" {...register("contactMethod")} className="accent-accent w-4 h-4" />
            <span>Email</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">Project Photos (Optional)</label>
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center hover:border-accent transition-colors cursor-pointer relative bg-secondary">
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Upload className="w-6 h-6 text-accent mb-2" />
          <span className="text-xs text-text-charcoal font-medium">
            {photoName ? photoName : "Upload reference photo (Max 5MB)"}
          </span>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">Message / Details</label>
        <textarea
          {...register("message")}
          rows={3}
          className="w-full bg-secondary border border-gray-200 px-4 py-3 rounded-lg text-primary focus:outline-none focus:border-accent transition-colors resize-none"
          placeholder="Tell us about your dream kitchen or bespoke fitted wardrobe..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3.5 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl border border-accent/20 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Submitting...</span>
          </>
        ) : (
          <span>Request Free Quote</span>
        )}
      </button>
    </form>
  );
}

// Consultation Schema
const consultationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a time"),
  contactMethod: z.enum(["phone", "whatsapp", "email"]),
  message: z.string().optional(),
});

type ConsultationFormValues = z.infer<typeof consultationSchema>;

export function ConsultationForm({ onSuccess }: { onSuccess?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      contactMethod: "phone",
    },
  });

  const onSubmit = async (data: ConsultationFormValues) => {
    setIsSubmitting(true);
    try {
      const timeSlots = {
        morning: "Morning (9:00 AM – 12:00 PM)",
        afternoon: "Afternoon (12:00 PM – 4:00 PM)",
        evening: "Late Afternoon (4:00 PM – 6:00 PM)"
      }[data.preferredTime] || data.preferredTime;

      const whatsappMsg = `Hi Graphene Interiors,\n\nI would like to book a free consultation:\n• Name: ${data.name}\n• Phone: ${data.phone}\n• Email: ${data.email}\n• Preferred Date: ${data.preferredDate}\n• Preferred Time: ${timeSlots}${data.message ? `\n• Notes: ${data.message}` : ""}`;
      const encodedMsg = encodeURIComponent(whatsappMsg);
      const link = `https://wa.me/447438199369?text=${encodedMsg}`;

      setWhatsappLink(link);
      window.open(link, "_blank");

      setSubmitSuccess(true);
      reset();
      if (onSuccess) {
        setTimeout(onSuccess, 5000);
      }
    } catch (err) {
      console.error(err);
      alert("Error preparing WhatsApp message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
        <CheckCircle className="w-16 h-16 text-accent mb-4" />
        <h3 className="text-2xl font-serif font-semibold text-primary mb-2">Ready to Book on WhatsApp</h3>
        <p className="text-text-charcoal max-w-sm mb-6 text-sm">
          We have generated your consultation details. Click the button below to open WhatsApp and send your booking details directly to Arshad.
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold tracking-widest uppercase px-8 py-4 rounded-lg shadow-md cursor-pointer text-xs transition-colors"
        >
          <i className="fa-brands fa-whatsapp text-lg"></i>
          <span>Send Booking on WhatsApp</span>
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">Full Name *</label>
        <input
          type="text"
          {...register("name")}
          className="w-full bg-secondary border border-gray-200 px-4 h-12 rounded-lg text-primary focus:outline-none focus:border-accent transition-colors"
          placeholder="Sarah Jenkins"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">Phone Number *</label>
          <input
            type="tel"
            {...register("phone")}
            className="w-full bg-secondary border border-gray-200 px-4 h-12 rounded-lg text-primary focus:outline-none focus:border-accent transition-colors"
            placeholder="+44 7438 199369"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">Email Address *</label>
          <input
            type="email"
            {...register("email")}
            className="w-full bg-secondary border border-gray-200 px-4 h-12 rounded-lg text-primary focus:outline-none focus:border-accent transition-colors"
            placeholder="sarah@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">Preferred Date *</label>
          <input
            type="date"
            {...register("preferredDate")}
            className="w-full bg-secondary border border-gray-200 px-4 h-12 rounded-lg text-primary focus:outline-none focus:border-accent transition-colors"
          />
          {errors.preferredDate && <p className="text-red-500 text-xs mt-1">{errors.preferredDate.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">Preferred Time *</label>
          <select
            {...register("preferredTime")}
            className="w-full bg-secondary border border-gray-200 px-4 h-12 rounded-lg text-primary focus:outline-none focus:border-accent transition-colors cursor-pointer"
          >
            <option value="">Select Time Slot...</option>
            <option value="morning">Morning (9:00 AM – 12:00 PM)</option>
            <option value="afternoon">Afternoon (12:00 PM – 4:00 PM)</option>
            <option value="evening">Late Afternoon (4:00 PM – 6:00 PM)</option>
          </select>
          {errors.preferredTime && <p className="text-red-500 text-xs mt-1">{errors.preferredTime.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">Preferred Contact Method *</label>
        <div className="flex gap-6 mt-1">
          <label className="flex items-center space-x-2 text-sm text-text-charcoal cursor-pointer">
            <input type="radio" value="phone" {...register("contactMethod")} className="accent-accent w-4 h-4" />
            <span>Call Now</span>
          </label>
          <label className="flex items-center space-x-2 text-sm text-text-charcoal cursor-pointer">
            <input type="radio" value="whatsapp" {...register("contactMethod")} className="accent-accent w-4 h-4" />
            <span>WhatsApp</span>
          </label>
          <label className="flex items-center space-x-2 text-sm text-text-charcoal cursor-pointer">
            <input type="radio" value="email" {...register("contactMethod")} className="accent-accent w-4 h-4" />
            <span>Email</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">Message / Design Notes</label>
        <textarea
          {...register("message")}
          rows={3}
          className="w-full bg-secondary border border-gray-200 px-4 py-3 rounded-lg text-primary focus:outline-none focus:border-accent transition-colors resize-none"
          placeholder="Let us know what times work best for your design visit..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent hover:bg-accent-hover text-primary font-semibold py-3.5 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Booking...</span>
          </>
        ) : (
          <span>Book Free Consultation</span>
        )}
      </button>
    </form>
  );
}
