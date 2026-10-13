import { redirect } from "next/navigation";

// Root redirects to /home
export default function RootPage() {
  redirect("/home");
}
