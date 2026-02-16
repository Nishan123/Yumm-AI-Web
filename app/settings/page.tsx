"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Shield,
  DollarSign,
  Bell,
  SlidersHorizontal,
  Book,
  Sun,
  Smile,
  Box,
  Info,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "@/lib/context/auth-context";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { ProfilePreviewCard } from "./_components/ProfilePreviewCard";
import { SettingListGroup } from "./_components/SettingListGroup";
import { SettingItemCard } from "./_components/SettingItemCard";
const SettingsPage = () => {
  const router = useRouter();
  const { logout, user, isLoading } = useAuth();

  React.useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>

        <div className="space-y-8">
          {/* Profile Preview */}
          <ProfilePreviewCard />

          <SettingListGroup title="Account">
            <SettingItemCard
              icon={User}
              title="Account access"
              subtitle="Security, account activation and deactivation."
              onClick={() => router.push("/settings/change-password")}
            />
            <Separator />
            <SettingItemCard
              icon={Shield}
              title="Login & Security"
              subtitle="Manage your information on this app."
            />
            <Separator />
            <SettingItemCard
              icon={DollarSign}
              title="Manage Subscription"
              subtitle="Change your subscription plan for more access."
            />
          </SettingListGroup>

          <SettingListGroup title="Preferences">
            <SettingItemCard
              icon={Bell}
              title="Notifications"
              subtitle="Select the kind of notification you get."
            />
            <Separator />
            <SettingItemCard
              icon={SlidersHorizontal}
              title="Food Preferences"
              subtitle="Tune your likings and food habit on daily basis."
            />
            <Separator />
            <SettingItemCard
              icon={Book}
              title="Accessibility & languages"
              subtitle="Manage how contents are displayed to you."
            />
            <Separator />
            <SettingItemCard
              icon={Sun}
              title="App theme"
              subtitle="Change the theme of the app as per your likings."
            />
          </SettingListGroup>

          <SettingListGroup title="Additional">
            <SettingItemCard
              icon={Smile}
              title="Feedback"
              subtitle="Share your thoughts and help us improve"
            />
            <Separator />
            <SettingItemCard
              icon={Box}
              title="Additional resources"
              subtitle="Checkout other places to know more about app."
            />
            <Separator />
            <SettingItemCard
              icon={Info}
              title="Help"
              subtitle="Help center, contacts, privacy policy."
            />
          </SettingListGroup>

          <div className="pt-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="w-full">
                  <button className="w-full bg-red-50 text-red-600 font-medium py-3 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
                    <LogOut size={20} />
                    Log Out
                  </button>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Log Out?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to log out?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Log Out
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
