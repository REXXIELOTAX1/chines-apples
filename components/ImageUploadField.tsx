"use client";

import { useState } from "react";
import { ImageIcon, Loader2, X } from "lucide-react";

const CLOUD_NAME = "dwwqf4p69";
const UPLOAD_PRESET = "chine_apples_product";

type Props = {
  value: string[];
  onChange: (urls: string[]) => void;
};

export default function ImageUploadField({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError("");

    const uploadedUrls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData }
        );
        const data = await res.json();

        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
        } else {
          setError("Some images failed to upload. Try again.");
        }
      }

      if (uploadedUrls.length > 0) {
        onChange([...value, ...uploadedUrls]);
      }
    } catch (err) {
      setError("Upload failed. Check your connection.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function removeImage(index: number) {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  }

  function makeCover(index: number) {
    if (index === 0) return;
    const updated = [...value];
    const [selected] = updated.splice(index, 1);
    updated.unshift(selected);
    onChange(updated);
  }

  return (
    <div>
      <label className="block text-sm text-gray-300 mb-1">
        Product Images {value.length > 0 && `(${value.length})`}
      </label>

      <label className="flex items-center justify-center gap-2 border border-dashed border-green-600 rounded-md py-3 cursor-pointer hover:bg-green-900/20 transition">
        {uploading ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            <span className="text-sm">Uploading...</span>
          </>
        ) : (
          <>
            <ImageIcon size={18} className="text-green-400" />
            <span className="text-sm text-green-400">
              Tap to upload photos (front, back, screen, box...)
            </span>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />
      </label>

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}

      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-3">
          {value.map((url, index) => (
            <div key={url} className="relative group">
              <img
                src={url}
                alt={`Product photo ${index + 1}`}
                className={`rounded-md w-full h-24 object-cover border ${
                  index === 0 ? "border-brand-green border-2" : "border-green-800"
                }`}
              />
              {index === 0 && (
                <span className="absolute bottom-1 left-1 bg-brand-green text-black text-[10px] font-bold px-1.5 py-0.5 rounded">
                  Cover
                </span>
              )}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-black/70 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
              >
                <X size={12} className="text-white" />
              </button>
              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => makeCover(index)}
                  className="absolute bottom-1 left-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition"
                >
                  Set cover
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}