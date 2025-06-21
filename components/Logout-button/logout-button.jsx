"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

export default function LogoutButton({
  showIcon = true,
  variant = "ghost",
  className = "",
    ...props
}) {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/sign-in" });
    toast.success("You have been logged out.");
  };

  return (
    <Button variant={variant} onClick={handleLogout} className={className} {...props}>
      {showIcon && <LogOut color="red" className="w-4 h-4 mr-2 text-red-500" />}
      {<span className="text-red-500">Logout</span>}
    </Button>
  );
}