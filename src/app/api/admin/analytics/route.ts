/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
// import { getCurrentUser } from "@/services/clerk";
// import { canAccessAdminPage } from "@/permissions/general";
// import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import client from "@/lib/elastic/elasticClient";

const INDEX_NAME = process.env.INDEX_NAME || "hekto";

export async function GET(request: NextRequest) {
  try {
    // const user = await getCurrentUser({ allData: true });

    // if (!user.data || !canAccessAdminPage(user.role as Role)) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") || "30d";

    // Calculate date range
    const now = new Date();
    const startDate = new Date();

    switch (range) {
      case "7d":
        startDate.setDate(now.getDate() - 7);
        break;
      case "30d":
        startDate.setDate(now.getDate() - 30);
        break;
      case "90d":
        startDate.setDate(now.getDate() - 90);
        break;
      case "1y":
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    // Fetch user growth data
    const userGrowth = await getUserGrowthData(startDate, now);

    // Fetch revenue data
    const revenueData = await getRevenueData(startDate, now);



    // Fetch payment status distribution
    const paymentStatus = await getPaymentStatusData(startDate, now);

    // Fetch category distribution from Elasticsearch
    const categoryDistribution = await getCategoryDistribution();

    // Fetch subcategory distribution
    const subCategoryDistribution = await getSubCategoryDistribution();

    // Fetch article type distribution
    const articleTypeDistribution = await getArticleTypeDistribution();

    // Fetch base color distribution
    const baseColorDistribution = await getBaseColorDistribution();

    // Fetch usage distribution
    const usageDistribution = await getUsageDistribution();

    // Fetch season distribution
    const seasonDistribution = await getSeasonDistribution();

    // Fetch gender distribution
    const genderDistribution = await getGenderDistribution();

    // Fetch user activity data
    const userActivity = await getUserActivityData(startDate, now);

    const analyticsData = {
      userGrowth,
      revenueData,
      paymentStatus,
      categoryDistribution,
      subCategoryDistribution,
      articleTypeDistribution,
      baseColorDistribution,
      usageDistribution,
      seasonDistribution,
      genderDistribution,
      userActivity,
    };

    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 }
    );
  }
}

async function getUserGrowthData(startDate: Date, endDate: Date) {
  const months = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    const monthStart = new Date(current.getFullYear(), current.getMonth(), 1);
    const monthEnd = new Date(current.getFullYear(), current.getMonth() + 1, 0);

    const totalUsers = await prisma.user.count({
      where: {
        createdAt: {
          lte: monthEnd,
        },
        deletedAt: null,
      },
    });

    const newUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: monthStart,
          lte: monthEnd,
        },
        deletedAt: null,
      },
    });

    months.push({
      month: current.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      users: totalUsers,
      newUsers,
    });

    current.setMonth(current.getMonth() + 1);
  }

  return months;
}

async function getRevenueData(startDate: Date, endDate: Date) {
  const months = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    const monthStart = new Date(current.getFullYear(), current.getMonth(), 1);
    const monthEnd = new Date(current.getFullYear(), current.getMonth() + 1, 0);

    const payments = await prisma.payment.findMany({
      where: {
        createdAt: {
          gte: monthStart,
          lte: monthEnd,
        },
        status: "COMPLETED",
      },
    });

    const revenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const orders = payments.length;

    months.push({
      month: current.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      revenue: revenue / 100, // Convert from cents
      orders,
    });

    current.setMonth(current.getMonth() + 1);
  }

  return months;
}



async function getPaymentStatusData(startDate: Date, endDate: Date) {
  const payments = await prisma.payment.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  const statusCounts = payments.reduce((acc, payment) => {
    acc[payment.status] = (acc[payment.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const total = payments.length;

  return Object.entries(statusCounts).map(([status, count]) => ({
    status: status.charAt(0).toUpperCase() + status.slice(1),
    count,
    percentage: Math.round((count / total) * 100),
  }));
}

async function getCategoryDistribution() {
  try {
    const response = await client.search({
      index: INDEX_NAME,
      size: 0,
      aggs: {
        categories: {
          terms: {
            field: "masterCategory.keyword",
            size: 20,
          },
        },
      },
    });

    const buckets =
      (response.aggregations?.categories as { buckets: unknown[] })?.buckets ||
      [];

    return buckets.map((bucket: any) => ({
      category: bucket.key,
      count: bucket.doc_count,
    }));
  } catch (error) {
    console.error("Error fetching category distribution:", error);
    return [];
  }
}

async function getSubCategoryDistribution() {
  try {
    const response = await client.search({
      index: INDEX_NAME,
      size: 0,
      aggs: {
        subcategories: {
          terms: {
            field: "subCategory.keyword",
            size: 30,
          },
        },
      },
    });

    const buckets =
      (response.aggregations?.subcategories as { buckets: unknown[] })?.buckets ||
      [];

    return buckets.map((bucket: any) => ({
      subCategory: bucket.key,
      count: bucket.doc_count,
    }));
  } catch (error) {
    console.error("Error fetching subcategory distribution:", error);
    return [];
  }
}

async function getArticleTypeDistribution() {
  try {
    const response = await client.search({
      index: INDEX_NAME,
      size: 0,
      aggs: {
        articleTypes: {
          terms: {
            field: "articleType.keyword",
            size: 30,
          },
        },
      },
    });

    const buckets =
      (response.aggregations?.articleTypes as { buckets: unknown[] })?.buckets ||
      [];

    return buckets.map((bucket: any) => ({
      articleType: bucket.key,
      count: bucket.doc_count,
    }));
  } catch (error) {
    console.error("Error fetching article type distribution:", error);
    return [];
  }
}

async function getBaseColorDistribution() {
  try {
    const response = await client.search({
      index: INDEX_NAME,
      size: 0,
      aggs: {
        baseColors: {
          terms: {
            field: "baseColour.keyword",
            size: 20,
          },
        },
      },
    });

    const buckets =
      (response.aggregations?.baseColors as { buckets: unknown[] })?.buckets ||
      [];

    return buckets.map((bucket: any) => ({
      baseColor: bucket.key,
      count: bucket.doc_count,
    }));
  } catch (error) {
    console.error("Error fetching base color distribution:", error);
    return [];
  }
}

async function getUsageDistribution() {
  try {
    const response = await client.search({
      index: INDEX_NAME,
      size: 0,
      aggs: {
        usage: {
          terms: {
            field: "usage.keyword",
            size: 15,
          },
        },
      },
    });

    const buckets =
      (response.aggregations?.usage as { buckets: unknown[] })?.buckets ||
      [];

    return buckets.map((bucket: any) => ({
      usage: bucket.key,
      count: bucket.doc_count,
    }));
  } catch (error) {
    console.error("Error fetching usage distribution:", error);
    return [];
  }
}

async function getSeasonDistribution() {
  try {
    const response = await client.search({
      index: INDEX_NAME,
      size: 0,
      aggs: {
        seasons: {
          terms: {
            field: "season.keyword",
            size: 10,
          },
        },
      },
    });

    const buckets =
      (response.aggregations?.seasons as { buckets: unknown[] })?.buckets ||
      [];

    return buckets.map((bucket: any) => ({
      season: bucket.key,
      count: bucket.doc_count,
    }));
  } catch (error) {
    console.error("Error fetching season distribution:", error);
    return [];
  }
}

async function getGenderDistribution() {
  try {
    const response = await client.search({
      index: INDEX_NAME,
      size: 0,
      aggs: {
        genders: {
          terms: {
            field: "gender.keyword",
            size: 10,
          },
        },
      },
    });

    const buckets =
      (response.aggregations?.genders as { buckets: unknown[] })?.buckets ||
      [];

    return buckets.map((bucket: any) => ({
      gender: bucket.key,
      count: bucket.doc_count,
    }));
  } catch (error) {
    console.error("Error fetching gender distribution:", error);
    return [];
  }
}

async function getUserActivityData(startDate: Date, endDate: Date) {
  const days = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    const dayStart = new Date(current);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(current);
    dayEnd.setHours(23, 59, 59, 999);

    // Count unique users who had interactions on this day
    const activeUsers = await prisma.interactions.findMany({
      where: {
        createdAt: {
          gte: dayStart,
          lte: dayEnd,
        },
      },
      distinct: ["userId"],
      select: {
        userId: true,
      },
    });

    days.push({
      date: current.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      activeUsers: activeUsers.length,
    });

    current.setDate(current.getDate() + 1);
  }

  return days;
}
