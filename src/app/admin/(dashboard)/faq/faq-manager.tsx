"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, Save, X, Eye, EyeOff, ArrowUp, ArrowDown, HelpCircle, Loader2 } from "lucide-react";
import { createFaqAction, updateFaqAction, deleteFaqAction, reorderFaqsAction } from "@/actions/crud";
import { InputField, TextareaField, SwitchField } from "@/components/admin/form-inputs";
import { useToast } from "@/components/providers";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  order: number;
  isVisible: boolean;
}

interface FaqManagerProps {
  initialFaqs: FaqItem[];
}

export default function FaqManager({ initialFaqs }: FaqManagerProps) {
  const router = useRouter();
  const { success, error: toastError } = useToast();
  const [isPending, startTransition] = useTransition();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form Fields
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [order, setOrder] = useState(0);

  // Setup Create Form
  const handleOpenAdd = () => {
    setQuestion("");
    setAnswer("");
    setIsVisible(true);
    setOrder(initialFaqs.length);
    setShowAddForm(true);
    setEditingId(null);
  };

  // Setup Edit Form
  const handleOpenEdit = (faq: FaqItem) => {
    setEditingId(faq.id);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setIsVisible(faq.isVisible);
    setOrder(faq.order);
    setShowAddForm(false);
  };

  // Save/Submit Form
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!question || !answer) {
      toastError("Question and Answer are required.");
      return;
    }

    const payload = { question, answer, order: Number(order), isVisible };

    startTransition(async () => {
      let res;
      if (editingId !== null) {
        res = await updateFaqAction(editingId, payload);
      } else {
        res = await createFaqAction(payload);
      }

      if (res.success) {
        success(editingId !== null ? "FAQ updated!" : "FAQ created!");
        setShowAddForm(false);
        setEditingId(null);
        router.refresh();
      } else {
        toastError(res.error || "Save failed.");
      }
    });
  };

  // Delete FAQ
  const handleDelete = (id: number, qText: string) => {
    if (!confirm(`Delete FAQ: "${qText.substring(0, 30)}..."?`)) return;

    startTransition(async () => {
      const res = await deleteFaqAction(id);
      if (res.success) {
        success("FAQ deleted!");
        router.refresh();
      } else {
        toastError(res.error || "Delete failed.");
      }
    });
  };

  // Move FAQ ordering
  const handleMove = (idx: number, direction: "up" | "down") => {
    const nextIdx = direction === "up" ? idx - 1 : idx + 1;
    if (nextIdx < 0 || nextIdx >= initialFaqs.length) return;

    const items = [...initialFaqs];
    const tempOrder = items[idx].order;
    items[idx].order = items[nextIdx].order;
    items[nextIdx].order = tempOrder;

    const payload = items.map((item) => ({
      id: item.id,
      order: item.order,
    }));

    startTransition(async () => {
      const res = await reorderFaqsAction(payload);
      if (res.success) {
        success("FAQ sorting updated!");
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
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-white font-serif text-lg font-bold">Frequently Asked Questions ({initialFaqs.length})</h2>
            <p className="text-gray-400 text-xs mt-0.5">Define questions and answers displayed in the accordion grids on the site.</p>
          </div>
        </div>

        {!showAddForm && editingId === null && (
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-primary font-bold text-xs uppercase tracking-widest px-4.5 py-3 rounded-xl shadow-lg transition-colors cursor-pointer select-none"
          >
            <Plus className="w-4.5 h-4.5" />
            <span>Add FAQ</span>
          </button>
        )}
      </div>

      {/* 2. Editor Card (Inline display when active) */}
      {(showAddForm || editingId !== null) && (
        <form onSubmit={handleSave} className="bg-[#0d1222] border border-white/5 p-6 rounded-3xl space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h3 className="text-white font-serif text-base font-bold">
              {editingId !== null ? "Edit FAQ" : "Create FAQ"}
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

          <InputField
            label="FAQ Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            placeholder="e.g. Do you supply the materials or do we buy them?"
          />

          <TextareaField
            label="FAQ Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
            placeholder="We provide complete end-to-end supply and fit services..."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SwitchField
              label="FAQ Visibility"
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
              <span>Save FAQ</span>
            </button>
          </div>
        </form>
      )}

      {/* 3. List displays */}
      {initialFaqs.length > 0 ? (
        <div className="bg-[#0d1222] border border-white/5 rounded-3xl overflow-hidden divide-y divide-white/5 shadow-sm">
          {initialFaqs.map((faq, idx) => (
            <div
              key={faq.id}
              className={`p-6 flex items-start gap-4 justify-between transition-all ${
                faq.isVisible ? "opacity-100" : "opacity-60 bg-red-950/5"
              }`}
            >
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    faq.isVisible ? "bg-[#748f6e]/15 text-[#92ab8d]" : "bg-white/5 text-gray-500"
                  }`}>
                    {faq.isVisible ? "Visible" : "Hidden"}
                  </span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase">order: {faq.order}</span>
                </div>
                <h4 className="text-white font-serif text-sm font-bold">{faq.question}</h4>
                <p className="text-gray-400 text-xs font-light leading-relaxed">{faq.answer}</p>
              </div>

              {/* Sorting and Action bar */}
              <div className="flex gap-2.5 items-center">
                {/* Reorder Buttons */}
                <div className="flex bg-[#0c101d] rounded-xl border border-white/5 overflow-hidden">
                  <button
                    onClick={() => handleMove(idx, "up")}
                    disabled={idx === 0}
                    className="p-2.5 hover:bg-white/5 text-gray-400 hover:text-white disabled:opacity-20 cursor-pointer"
                    title="Move Up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleMove(idx, "down")}
                    disabled={idx === initialFaqs.length - 1}
                    className="p-2.5 border-l border-white/5 hover:bg-white/5 text-gray-400 hover:text-white disabled:opacity-20 cursor-pointer"
                    title="Move Down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Edit & Delete */}
                <button
                  onClick={() => handleOpenEdit(faq)}
                  className="bg-white/5 hover:bg-white/10 p-2.5 rounded-xl border border-white/5 text-gray-300 transition-colors cursor-pointer"
                  title="Edit FAQ"
                >
                  <Edit2 className="w-4 h-4 text-accent" />
                </button>
                
                <button
                  onClick={() => handleDelete(faq.id, faq.question)}
                  className="bg-red-950/20 hover:bg-red-950/30 p-2.5 rounded-xl border border-red-900/35 text-red-400 transition-colors cursor-pointer"
                  title="Delete FAQ"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#0d1222] border border-white/5 p-16 rounded-3xl text-center text-gray-500 italic">
          No FAQs created yet. Use the add control to write one.
        </div>
      )}

    </div>
  );
}
