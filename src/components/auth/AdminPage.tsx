import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminPage({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  
  // Redirect to login if not authenticated
  if (!session) {
    redirect("/auth/signin");
  }
  
  // Redirect to homepage if not an admin
  if (session.user.role !== "admin") {
    redirect("/");
  }
  
  return <>{children}</>;
}
