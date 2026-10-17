"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, Save, X, Eye, EyeOff, ArrowUp, ArrowDown, Star, Loader2, MessageSquareHeart } from "lucide-react";
import { createTestimonialAction, updateTestimonialAction, deleteTestimonialAction, reorderTestimonialsAction } from "@/actions/crud";
import { InputField, TextareaField, SwitchField, MediaPickerField } from "@/components/admin/form-inputs";
import { useToast } from "@/components/providers";

interface TestimonialItem {
  id: number;
  clientName: string;
  position: string;
  review: string;
  rating: number;
  image: string | null;
  order: number;
  isVisible: boolean;
}

interface TestimonialManagerProps {
  initialTestimonials: TestimonialItem[];
}

export default function TestimonialManager({ initialTestimonials }: TestimonialManagerProps) {
  const router = useRouter();
  const { success, error: toastError } = useToast();
  const [isPending, startTransition] = useTransition();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form Fields
  const [clientName, setClientName] = useState("");
  const [position, setPosition] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [image, setImage] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [order, setOrder] = useState(0);

  // Setup Add Form
  const handleOpenAdd = () => {
    setClientName("");
    setPosition("");
    setReview("");
    setRating(5);
    setImage("");
    setIsVisible(true);
    setOrder(initialTestimonials.length);
    setShowAddForm(true);
    setEditingId(null);
  };

  // Setup Edit Form
  const handleOpenEdit = (t: TestimonialItem) => {
    setEditingId(t.id);
    setClientName(t.clientName);
    setPosition(t.position);
    setReview(t.review);
    setRating(t.rating);
    setImage(t.image || "");
    setIsVisible(t.isVisible);
    setOrder(t.order);
    setShowAddForm(false);
  };

  // Submit handler
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName || !position || !review) {
      toastError("All fields except avatar are required.");
      return;
    }

    const payload = {
      clientName,
      position,
      review,
      rating: Number(rating),
      image: image || null,
      order: Number(order),
      isVisible,
    };

    startTransition(async () => {
      let res;
      if (editingId !== null) {
        res = await updateTestimonialAction(editingId, payload);
      } else {
        res = await createTestimonialAction(payload);
      }

      if (res.success) {
        success(editingId !== null ? "Testimonial updated!" : "Testimonial created!");
        setShowAddForm(false);
        setEditingId(null);
        router.refresh();
      } else {
        toastError(res.error || "Save failed.");
      }
    });
  };

  // Delete Action
  const handleDelete = (id: number, name: string) => {
    if (!confirm(`Delete review from: "${name}"?`)) return;

    startTransition(async () => {
      const res = await deleteTestimonialAction(id);
      if (res.success) {
        success("Testimonial deleted!");
        router.refresh();
      } else {
        toastError(res.error || "Delete failed.");
      }
    });
  };

  // Reorder Actions
  const handleMove = (idx: number, direction: "up" | "down") => {
    const nextIdx = direction === "up" ? idx - 1 : idx + 1;
    if (nextIdx < 0 || nextIdx >= initialTestimonials.length) return;

    const items = [...initialTestimonials];
    const tempOrder = items[idx].order;
    items[idx].order = items[nextIdx].order;
    items[nextIdx].order = tempOrder;

    const payload = items.map((item) => ({
      id: item.id,
      order: item.order,
    }));

    startTransition(async () => {
      const res = await reorderTestimonialsAction(payload);
      if (res.success) {
        success("Testimonial sorting updated!");
        router.refresh();
      } else {
        toastError(res.error || "Reorder failed.");
      }
    });
  };

  return (
    <div className="space-y-6 font-sans text-gray-200">
      
      {/* 1. Header controls */}
      <div className="flex justify-between items-center bg-[#0d1222] border border-white/5 p-6 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="bg-[#748f6e]/15 p-2 rounded-xl text-accent">
            <MessageSquareHeart className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-white font-serif text-lg font-bold">Client Testimonials ({initialTestimonials.length})</h2>
            <p className="text-gray-400 text-xs mt-0.5">Manage customer references, review quotes, star ratings, and display weights.</p>
          </div>
        </div>

        {!showAddForm && editingId === null && (
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-primary font-bold text-xs uppercase tracking-widest px-4.5 py-3 rounded-xl shadow-lg transition-colors cursor-pointer select-none"
          >
            <Plus className="w-4.5 h-4.5" />
            <span>Add Review</span>
          </button>
        )}
      </div>

      {/* 2. Create/Edit Form card */}
      {(showAddForm || editingId !== null) && (
        <form onSubmit={handleSave} className="bg-[#0d1222] border border-white/5 p-6 rounded-3xl space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h3 className="text-white font-serif text-base font-bold">
              {editingId !== null ? "Edit Testimonial" : "Create Testimonial"}
            </h3>
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                setEditingId(null);
              }}
              className="text-gray-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Client Name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
              placeholder="e.g. Verified Leicester Customer"
            />
            <InputField
              label="Client Designation / Sub-text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
              placeholder="e.g. Leicester (Kitchen Supply & Fitout)"
            />
          </div>

          <TextareaField
            label="Review Quote Text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            placeholder="Arshad designed and built a bespoke sliding mirrored wardrobe..."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Rating Selector */}
            <div className="space-y-1.5 w-full">
              <label className="text-gray-300 text-xs font-bold uppercase tracking-wider block">Star Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full bg-[#090c16] border border-white/5 hover:border-white/10 rounded-xl px-4.5 py-3.5 text-xs text-white focus:outline-none focus:border-accent"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>{r} Stars</option>
                ))}
              </select>
            </div>
            
            <MediaPickerField
              label="Client Portrait / Avatar (Optional)"
              value={image}
              onChange={setImage}
              fileType="IMAGE"
              category="testimonials"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SwitchField
              label="Testimonial Visibility"
              checked={isVisible}
              onChange={setIsVisible}
            />
            <InputField
              label="Display Weight Order"
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                setEditingId(null);
              }}
              className="bg-white/5 border border-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest px-5 py-3.5 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-lg transition-all disabled:opacity-50 cursor-pointer"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Testimonial</span>
            </button>
          </div>
        </form>
      )}

      {/* 3. Grid listings */}
      {initialTestimonials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initialTestimonials.map((t, idx) => (
            <div
              key={t.id}
              className={`bg-[#0d1222] border rounded-2xl p-6 flex flex-col justify-between hover:border-white/10 transition-all ${
                t.isVisible ? "border-white/5" : "border-red-950/20 opacity-60 bg-red-950/5"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-3.5 mb-3.5">
                  <div className="flex items-center gap-3">
                    {t.image ? (
                      <img src={t.image} alt={t.clientName} className="w-10 h-10 object-cover rounded-full bg-white/5 shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#748f6e]/15 border border-[#748f6e]/25 text-[#92ab8d] flex items-center justify-center font-bold text-sm shrink-0">
                        {t.clientName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="text-white text-sm font-semibold">{t.clientName}</h4>
                      <p className="text-gray-500 text-[10px]">{t.position}</p>
                    </div>
                  </div>

                  {/* Ordering Controls */}
                  <div className="flex bg-[#0c101d] rounded-xl border border-white/5 overflow-hidden">
                    <button
                      onClick={() => handleMove(idx, "up")}
                      disabled={idx === 0}
                      className="p-2 hover:bg-white/5 text-gray-400 hover:text-white disabled:opacity-20 cursor-pointer"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMove(idx, "down")}
                      disabled={idx === initialTestimonials.length - 1}
                      className="p-2 border-l border-white/5 hover:bg-white/5 text-gray-400 hover:text-white disabled:opacity-20 cursor-pointer"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex text-[#748f6e] gap-0.5 mb-3.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current shrink-0" />
                  ))}
                </div>

                <p className="text-xs text-gray-400 font-light leading-relaxed italic">
                  "{t.review}"
                </p>
              </div>

              {/* Actions Footer */}
              <div className="flex justify-between items-center mt-5 pt-3.5 border-t border-white/5">
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                  order: {t.order} • {t.isVisible ? "visible" : "hidden"}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenEdit(t)}
                    className="bg-white/5 hover:bg-white/10 p-2.5 rounded-xl border border-white/5 text-gray-300 transition-colors cursor-pointer"
                    title="Edit Review"
                  >
                    <Edit2 className="w-4 h-4 text-accent" />
                  </button>

                  <button
                    onClick={() => handleDelete(t.id, t.clientName)}
                    className="bg-red-950/20 hover:bg-red-950/30 p-2.5 rounded-xl border border-red-900/35 text-red-400 transition-colors cursor-pointer"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#0d1222] border border-white/5 p-16 rounded-3xl text-center text-gray-500 italic">
          No testimonials defined yet. Use the add control to write a review.
        </div>
      )}

    </div>
  );
}
