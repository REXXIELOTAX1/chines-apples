"use client";

import { useState } from "react";
import { ImageIcon, Loader2 } from "lucide-react";

const CLOUD_NAME = "dwwqf4p69"; // shown top-left of your dashboard
const UPLOAD_PRESET = "chine_apples_product";
type Props = {
  value: string;
  onChange: (url: string) => void;
};

export default function ImageUploadField({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();

      if (data.secure_url) {
        onChange(data.secure_url); // updates the same field your form already saves
      } else {
        setError("Upload failed. Try again.");
      }
    } catch (err) {
      setError("Upload failed. Check your connection.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-sm text-gray-300 mb-1">Product Image</label>

      {/* Existing URL field — kept editable as fallback */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://res.cloudinary.com/..."
        className="w-full rounded-md bg-black/30 border border-green-800 px-3 py-2 text-sm mb-2"
      />

      {/* Tap-to-upload button */}
      <label className="flex items-center justify-center gap-2 border border-dashed border-green-600 rounded-md py-3 cursor-pointer hover:bg-green-900/20 transition">
        {uploading ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            <span className="text-sm">Uploading...</span>
          </>
        ) : (
          <>
            <ImageIcon size={18} className="text-green-400" />
            <span className="text-sm text-green-400">Tap to upload photo</span>
          </>
        )}
       <input
  type="file"
  accept="image/*"
  onChange={handleFileSelect}
  className="hidden"
  disabled={uploading}
/>
      </label>

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}

      {value && (
        <img
          src={value}
          alt="Preview"
          className="mt-3 rounded-md max-h-40 object-cover border border-green-800"
        />
      )}
    </div>
  );
}