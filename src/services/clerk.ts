import { auth, clerkClient } from "@clerk/nextjs/server";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
const client = await clerkClient();

export async function getCurrentUser({ allData = false } = {}) {
  const { userId, sessionClaims, redirectToSignIn } = await auth();
  
  let userData = null;
  let dbUserId = sessionClaims?.dbId;
  let userRole = sessionClaims?.role;
  
  if (allData && userId) {
    // First try to get user by dbId from session claims
    if (sessionClaims?.dbId) {
      userData = await getUser(sessionClaims.dbId as string);
    }
    
    // If no data found or no dbId in session claims, fall back to clerkUserId
    if (!userData) {
      userData = await getUserByClerkId(userId);
      if (userData) {
        dbUserId = userData.id;
        userRole = userData.role;
        
        // Sync the metadata to Clerk if it's missing
        try {
          await syncClerkUserMetadata({
            id: userData.id,
            clerkUserId: userData.clerkUserId,
            role: userData.role
          });
        } catch (error) {
          console.error('Failed to sync Clerk metadata:', error);
        }
      }
    }
  }
  
  return {
    clerkUserId: userId,
    userId: dbUserId,
    data: userData,
    role: userRole,
    redirectToSignIn,
  };
}

export function syncClerkUserMetadata(user: {
  id: string;
  clerkUserId: string;
  role: Role;
}) {
  return client.users.updateUserMetadata(user.clerkUserId, {
    publicMetadata: {
      dbId: user.id,
      role: user.role,
    },
  });
}

async function getUser(id: string) {
  return await prisma.user.findFirst({
    where: {
      id,
    },
  });
}

async function getUserByClerkId(clerkUserId: string) {
  return await prisma.user.findFirst({
    where: {
      clerkUserId,
    },
  });
}
