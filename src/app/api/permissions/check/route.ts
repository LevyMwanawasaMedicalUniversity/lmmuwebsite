import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { hasPermission, getUserPermissions } from "@/lib/permissions";

// Check a specific permission for the current user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ hasPermission: false }, { status: 401 });
    }

    const userId = parseInt(session.user.id);
    
    // If it's a specific permission check
    const url = new URL(req.url);
    const permission = url.searchParams.get("permission");
    
    if (permission) {
      // Admin always has all permissions
      if (session.user.role === "admin") {
        return NextResponse.json({ hasPermission: true });
      }
      
      const result = await hasPermission(userId, permission);
      return NextResponse.json({ hasPermission: result });
    } 
    
    // Otherwise return all user permissions
    const permissions = await getUserPermissions(userId);
    return NextResponse.json({ permissions });
    
  } catch (error: any) {
    console.error("Error checking permission:", error);
    return NextResponse.json(
      { error: error.message, hasPermission: false },
      { status: 500 }
    );
  }
}
