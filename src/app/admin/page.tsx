"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ShoppingCart } from "lucide-react";
import { PaymentStatus, User, Payment } from "@prisma/client";
import { DashboardSkeleton } from "@/components/ui/loading";
import { toast } from "sonner";

interface RecentPayment extends Payment {
  user: User;
}

interface TopProduct {
  productId: number;
  interactions: number;
}

interface UserGrowthData {
  createdAt: Date;
  _count: {
    id: number;
  };
}

interface PaymentStatusData {
  status: PaymentStatus;
  _count: {
    status: number;
  };
}

interface DashboardStats {
  totalUsers: number;
  totalPayments: number;
  totalRevenue: number;
  totalInteractions: number;
  recentPayments: RecentPayment[];
  topProducts: TopProduct[];
  userGrowth: UserGrowthData[];
  paymentsByStatus: PaymentStatusData[];
}



export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardStats() {
      try {
        const response = await fetch('/api/admin/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard stats');
        }
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardStats();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (!stats) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Failed to load dashboard data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Active registered users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPayments}</div>
            <p className="text-xs text-muted-foreground">All time payments</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
