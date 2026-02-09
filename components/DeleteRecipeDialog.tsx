"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isOwner ? "Delete Recipe" : "Remove from Cookbook"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isOwner
              ? "This will permanently delete the recipe and remove it from all cookbooks. This action cannot be undone."
              : "This will remove the recipe from your cookbook only. The original recipe will remain unchanged."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isDeleting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Deleting...
              </div>
            ) : isOwner ? (
              "Delete"
            ) : (
              "Remove"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
