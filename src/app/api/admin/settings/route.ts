/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/services/clerk";
import { canAccessAdminPage } from "@/permissions/general";
import { Role } from "@prisma/client";

// In a real application, you would store these in a database
// For now, we'll return default values and environment variables
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser({ allData: true });

    if (!user.data || !canAccessAdminPage(user.role as Role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const settings = {
      siteName: process.env.SITE_NAME || "HEKTO",
      siteDescription:
        process.env.SITE_DESCRIPTION || "Your premier e-commerce destination",
      contactEmail: process.env.CONTACT_EMAIL || "admin@hekto.com",
      enableNotifications: process.env.ENABLE_NOTIFICATIONS !== "false",
      enableAnalytics: process.env.ENABLE_ANALYTICS !== "false",
      maintenanceMode: process.env.MAINTENANCE_MODE === "true",
      elasticsearchUrl:
        process.env.ELASTICSEARCH_URL ||
        "https://my-elasticsearch-project-a38744.es.us-central1.gcp.elastic.cloud:443",
      elasticsearchApiKey: process.env.ELASTICSEARCH_API_KEY
        ? "••••••••••••••••"
        : "", // Mask the API key
      indexName: process.env.INDEX_NAME || "hekto",
    };

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser({ allData: true });

    if (!user.data || !canAccessAdminPage(user.role as Role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // In a real application, you would save these to a database
    // For now, we'll just return a success response
    console.log("Settings update requested:", {
      siteName: body.siteName,
      siteDescription: body.siteDescription,
      contactEmail: body.contactEmail,
      enableNotifications: body.enableNotifications,
      enableAnalytics: body.enableAnalytics,
      maintenanceMode: body.maintenanceMode,
      elasticsearchUrl: body.elasticsearchUrl,
      indexName: body.indexName,
      // Don't log the API key for security
    });

    return NextResponse.json({
      message: "Settings updated successfully",
      note: "In production, these settings would be saved to a database or configuration service",
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
