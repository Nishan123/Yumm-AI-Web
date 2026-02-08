import React from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { User } from "@/lib/api/user";

interface ProfileAvatarProps {
  user: User | null;
  previewImage: string | null;
  onImageClick: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export const ProfileAvatar = ({
  user,
  previewImage,
  onImageClick,
  onFileChange,
  fileInputRef,
}: ProfileAvatarProps) => {
  return (
    <div className="relative group cursor-pointer" onClick={onImageClick}>
      <div className="w-28 h-28 rounded-full bg-gray-100 overflow-hidden border-4 border-white shadow-lg relative">
        {previewImage || user?.profilePic ? (
          <Image
            src={
              previewImage ||
              (user?.profilePic
                ? `${user.profilePic}?t=${new Date().getTime()}`
                : "")
            }
            alt="Profile"
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Camera size={32} />
          </div>
        )}
      </div>
      <div className="absolute bottom-0 right-0 bg-orange-500 rounded-full p-2 text-white shadow-md border-2 border-white">
        <Camera size={16} />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={onFileChange}
      />
    </div>
  );
};
