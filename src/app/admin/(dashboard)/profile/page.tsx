import React from "react";
import ProfileForm from "./profile-form";

export default function AdminProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-white">Admin Credentials Management</h1>
        <p className="text-gray-400 text-xs mt-1">
          Update the password used to access the custom admin panel.
        </p>
      </div>
      <ProfileForm />
    </div>
  );
}
