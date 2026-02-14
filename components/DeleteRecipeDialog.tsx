"use client";

import { ConfirmationModal } from "@/components/ConfirmationModal";

interface DeleteRecipeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isOwner: boolean;
  isDeleting: boolean;
}

export const DeleteRecipeDialog = ({
  isOpen,
  onClose,
  onConfirm,
  isOwner,
  isDeleting,
}: DeleteRecipeDialogProps) => {
  const title = isOwner ? "Delete Recipe" : "Remove from Cookbook";
  const description = isOwner
    ? "This will permanently delete the recipe and remove it from all cookbooks. This action cannot be undone."
    : "This will remove the recipe from your cookbook only. The original recipe will remain unchanged.";
  const confirmLabel = isOwner ? "Delete" : "Remove";

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      description={description}
      confirmLabel={confirmLabel}
      variant="destructive"
      isLoading={isDeleting}
    />
  );
};
