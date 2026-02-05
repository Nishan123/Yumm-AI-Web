"use client";

import { useAuth } from "@/lib/context/auth-context";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { handleUpdateUserProfile } from "@/lib/actions/user-action"; // Updated import
import { toast } from "sonner";
import { AddIngredientsModal } from "../(chefs)/_components/shared/AddIngredientsModal";
import { IngredientsWrapContainer } from "../(chefs)/_components/shared/IngredientsWrapContainer";
import { IngredientModel } from "@/data/mockIngredients";
import { ProfileHeader } from "./_components/ProfileHeader";
import { ProfileAvatar } from "./_components/ProfileAvatar";
import { ProfileForm } from "./_components/ProfileForm";
import { ProfileActions } from "./_components/ProfileActions";
import { InputWidgetTitle } from "../(chefs)/_components/shared/InputWidgetTitle";
import { AllergicIngredientChips } from "./_components/AllergicIngredientChips";

export default function ProfilePage() {
  const { user, logout, refreshUser, isLoading: authLoading } = useAuth();
  const router = useRouter();k
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [fullName, setFullName] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<
    IngredientModel[]
  >([]);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Modal State
  const [isIngredientsModalOpen, setIsIngredientsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Initial Data Load
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      if (user.allergenicIngredients) {
        const loadedIngredients = user.allergenicIngredients.map((name) => ({
          id: name,
          ingredientName: name,
          prefixImage: "", // URL would come from a real data source if available
          quantity: "1",
          unit: "unit",
        }));
        setSelectedIngredients(loadedIngredients);
      }
    }
  }, [user]);

  const handleSignOut = () => {
    logout();
    router.push("/login");
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveIngredient = (id: string) => {
    setSelectedIngredients((prev) => prev.filter((item) => item.id !== id));
  };

  // Smart Update Logic
  const hasChanges = () => {
    if (!user) return false;

    const nameChanged = fullName.trim() !== user.fullName;
    const imageChanged = profileImageFile !== null;

    const currentAllergiesSet = new Set(
      selectedIngredients.map((i) => i.ingredientName),
    );
    const oldAllergiesSet = new Set(user.allergenicIngredients || []);

    // Check if sets are equal
    const allergiesChanged =
      currentAllergiesSet.size !== oldAllergiesSet.size ||
      ![...currentAllergiesSet].every((value) => oldAllergiesSet.has(value));

    return nameChanged || imageChanged || allergiesChanged;
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    if (!hasChanges()) return;

    try {
      setIsUpdating(true);

      const allergyNames = selectedIngredients.map((i) => i.ingredientName);

      let imageFormData: FormData | undefined = undefined;
      if (profileImageFile) {
        imageFormData = new FormData();
        imageFormData.append("profilePic", profileImageFile);
      }

      const response = await handleUpdateUserProfile(
        user.uid,
        {
          fullName: fullName.trim(),
          allergenicIngredients: allergyNames,
        },
        imageFormData,
      );

      if (response.success) {
        toast.success(response.message || "Profile updated successfully!");
        setProfileImageFile(null);
        await refreshUser();
      } else {
        toast.error(response.message || "Failed to update profile");
      }
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  if (authLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 pb-20">
      <ProfileHeader />

      <div className="max-w-md mx-auto p-6 space-y-8">
        {/* Profile Card Section */}
        <div className="bg-white dark:bg-zinc-900 rounded-[32px] p-6 shadow-sm border border-gray-100 dark:border-zinc-800 flex flex-col items-center relative">
          <ProfileAvatar
            user={user}
            previewImage={previewImage}
            onImageClick={handleImageClick}
            onFileChange={handleFileChange}
            fileInputRef={fileInputRef}
          />

          <ProfileForm
            fullName={fullName}
            setFullName={setFullName}
            email={user?.email}
          />
        </div>

        {/* Allergies Section */}

        <InputWidgetTitle
          title="You are allergic to"
          haveActionButton
          actionButtonText="Add Item"
          onActionTap={() => setIsIngredientsModalOpen(true)}
        />

        <div className="bg-white dark:bg-zinc-900 rounded-[24px] p-4 border border-gray-100 dark:border-zinc-800">
          <AllergicIngredientChips
            items={selectedIngredients}
            onRemoveItem={handleRemoveIngredient}
          />
        </div>

        <ProfileActions
          isUpdating={isUpdating}
          hasChanges={hasChanges()}
          onUpdate={handleUpdateProfile}
          onSignOut={handleSignOut}
        />
      </div>

      {/* Ingredient Modal */}
      <AddIngredientsModal
        isOpen={isIngredientsModalOpen}
        onClose={() => setIsIngredientsModalOpen(false)}
        selectedIngredients={selectedIngredients}
        onConfirm={(ingredients) => {
          setSelectedIngredients(ingredients);
        }}
      />
    </div>
  );
}
