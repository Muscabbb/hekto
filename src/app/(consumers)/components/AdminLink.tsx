import { canAccessAdminPage } from "@/permissions/general";
import { getCurrentUser } from "@/services/clerk";
import { Role } from "@prisma/client";
import Link from "next/link";

const AdminLink = async () => {
  const user = await getCurrentUser();

  if (!canAccessAdminPage(user.role as Role)) {
    return null;
  }

  return (
    <Link
      href="/admin"
      className="font-medium hover:text-pink-600 transition-colors"
    >
      Admin
    </Link>
  );
};

export default AdminLink;
