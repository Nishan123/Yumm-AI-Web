import { redirect } from "next/navigation";

export default function RootPage() {
  // Middleware handles this redirect, but this is a fallback
  redirect("/home");
}
