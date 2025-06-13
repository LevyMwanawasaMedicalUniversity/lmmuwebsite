import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getUserPermissions } from "@/lib/permissions";

// Get all permissions for the current user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);
    const permissions = await getUserPermissions(userId);
    
    return NextResponse.json({ permissions });
  } catch (error: any) {
    console.error("Error fetching user permissions:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
