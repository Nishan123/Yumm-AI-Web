"use client";

import React, { useState, useRef, useCallback } from "react";
import { Upload, X, Camera, ImageIcon } from "lucide-react";

interface ImageUploadAreaProps {
  onImageSelected: (base64: string) => void;
  imagePreview: string | null;
  onRemoveImage: () => void;
  label?: string;
}

export function ImageUploadArea({
  onImageSelected,
  imagePreview,
  onRemoveImage,
  label = "Upload an image",
}: ImageUploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          onImageSelected(result);
        }
      };
      reader.readAsDataURL(file);
    },
    [onImageSelected],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  if (imagePreview) {
    return (
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-gray-200 bg-gray-50">
        <img
          src={imagePreview}
          alt="Uploaded preview"
          className="w-full h-full object-cover"
        />
        <button
          onClick={onRemoveImage}
          className="absolute top-3 right-3 w-9 h-9 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <Camera className="w-3.5 h-3.5" />
          Photo uploaded
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`
        relative w-full aspect-[4/3] rounded-2xl border-2 border-dashed cursor-pointer
        flex flex-col items-center justify-center gap-4 transition-all duration-200
        ${
          isDragging
            ? "border-orange-400 bg-orange-50/80 scale-[1.01]"
            : "border-gray-300 bg-gray-50/50 hover:border-orange-300 hover:bg-orange-50/30"
        }
      `}
    >
      <div
        className={`
          w-16 h-16 rounded-full flex items-center justify-center transition-colors
          ${isDragging ? "bg-orange-100" : "bg-gray-100"}
        `}
      >
        {isDragging ? (
          <Upload className="w-7 h-7 text-orange-500" />
        ) : (
          <ImageIcon className="w-7 h-7 text-gray-400" />
        )}
      </div>

      <div className="text-center px-6">
        <p className="text-sm font-semibold text-gray-700 mb-1">{label}</p>
        <p className="text-xs text-gray-500">
          Drag & drop or{" "}
          <span className="text-orange-500 font-medium">browse</span> to upload
        </p>
        <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP supported</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
}
