import { getCurrentUser } from "@/services/clerk";
import Link from "next/link";
import { LayoutDashboard, Package, BarChart3, Users } from "lucide-react";
import { redirect } from "next/navigation";
import AdminRoleGuard from "@/components/AdminRoleGuard";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser({ allData: true });

  // Check if user is authenticated and has admin role
  if (!user?.data || user.data.role !== "admin") {
    redirect("/");
  }

  return (
    <AdminRoleGuard>
      <div className="min-h-screen bg-gray-50">
        {/* Admin Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/" className="text-xl font-bold text-pink-600">
                  HEKTO
                </Link>
                <span className="ml-4 text-sm text-gray-500">
                  Admin Dashboard
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Welcome, {user?.data?.name ?? "Admin"}
                </span>
                <Link
                  href="/"
                  className="text-sm text-pink-600 hover:text-pink-700"
                >
                  Back to Store
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <nav className="w-64 bg-white shadow-sm min-h-screen">
            <div className="p-4">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/admin"
                    className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                  >
                    <LayoutDashboard className="mr-3 h-5 w-5" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/products"
                    className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                  >
                    <Package className="mr-3 h-5 w-5" />
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/users"
                    className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                  >
                    <Users className="mr-3 h-5 w-5" />
                    Users
                  </Link>
                </li>

                <li>
                  <Link
                    href="/admin/analytics"
                    className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                  >
                    <BarChart3 className="mr-3 h-5 w-5" />
                    Analytics
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 p-8">{children}</main>
        </div>
      </div>
    </AdminRoleGuard>
  );
}
