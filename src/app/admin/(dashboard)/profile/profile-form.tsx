"use client";

import React, { useState, useEffect, useTransition, useActionState } from "react";
import { Save, Loader2, Key } from "lucide-react";
import { changePasswordAction } from "@/actions/auth";
import { InputField } from "@/components/admin/form-inputs";
import { useToast } from "@/components/providers";

export default function ProfileForm() {
  const { success, error: toastError } = useToast();
  const [state, formAction, isPending] = useActionState(changePasswordAction, null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (state?.success) {
      success(state.message || "Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else if (state?.error) {
      toastError(state.error);
    }
  }, [state, success, toastError]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (newPassword !== confirmPassword) {
      e.preventDefault();
      toastError("New passwords do not match.");
      return;
    }
  };

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="space-y-8 font-sans max-w-xl text-gray-200"
    >
      <div className="bg-[#0d1222] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
        <h3 className="text-white font-serif text-lg font-bold flex items-center gap-2">
          <Key className="w-5 h-5 text-accent" />
          <span>Change Password</span>
        </h3>

        <div className="space-y-1.5 w-full">
          <label className="text-gray-300 text-xs font-bold uppercase tracking-wider block">Admin Email</label>
          <input
            type="text"
            value="admin@example.com"
            disabled
            className="w-full bg-[#090c16]/50 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-500 cursor-not-allowed"
          />
        </div>

        <InputField
          label="Current Password"
          type="password"
          name="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          placeholder="••••••••"
        />

        <InputField
          label="New Password"
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          placeholder="•••••••• (Min 6 characters)"
        />

        <InputField
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="••••••••"
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-xl transition-all disabled:opacity-50 cursor-pointer"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Updating Password...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Update Password</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
