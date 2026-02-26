import React, { useRef } from "react";
import { ImagePlus, X } from "lucide-react";

interface Props {
  screenshotPreview: string | null;
  onImagePick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (e: React.MouseEvent) => void;
}

export const BugScreenshotPicker = ({
  screenshotPreview,
  onImagePick,
  onRemoveImage,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRemove = (e: React.MouseEvent) => {
    onRemoveImage(e);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={onImagePick}
      />
      {screenshotPreview ? (
        <div
          className="relative w-full h-[300px] rounded-2xl bg-gray-100 dark:bg-zinc-900 overflow-hidden cursor-pointer border border-gray-200 dark:border-zinc-800"
          onClick={() => fileInputRef.current?.click()}
        >
          <img
            src={screenshotPreview}
            alt="Screenshot preview"
            className="w-full h-full object-contain"
          />
          <button
            className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
            onClick={handleRemove}
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <div
          className="w-full h-[200px] rounded-2xl bg-gray-50 dark:bg-zinc-900 border-2 border-dashed border-gray-200 dark:border-zinc-800 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800/50 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImagePlus size={40} className="text-gray-400 mb-2" />
          <p className="text-gray-500 font-medium">Tap to pick screenshot</p>
        </div>
      )}
    </div>
  );
};
