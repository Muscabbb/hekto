"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { canAccessAdminPage } from "@/permissions/general";
import { Role } from "@prisma/client";
import { Shield } from "lucide-react";

export default function AdminLink() {
  const { user, isLoaded } = useUser();
  
  if (!isLoaded) {
    return null; // Loading state
  }
  
  const userRole = user?.publicMetadata?.role as Role;
  const canAccess = user && userRole && canAccessAdminPage(userRole);
  
  if (!canAccess) {
    return null;
  }

  return (
    <Link
      href="/admin"
      className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
    >
      <Shield className="h-4 w-4" />
      <span>Admin</span>
    </Link>
  );
}