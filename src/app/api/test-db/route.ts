import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log("API: Testing database connection");
    
    // Test the database connection
    const testResult = await prisma.$queryRaw`SELECT 1 as testResult`;
    console.log("Database connection successful:", testResult);
    
    try {
      // Test the User model
      const userCount = await prisma.user.count();
      console.log(`Found ${userCount} users in the database`);
      
      // Test the Role model
      const roleCount = await prisma.role.count();
      console.log(`Found ${roleCount} roles in the database`);
      
      // Test the Permission model
      const permissionCount = await prisma.permission.count();
      console.log(`Found ${permissionCount} permissions in the database`);
      
      return NextResponse.json({ 
        success: true, 
        message: "Database connection successful",
        stats: {
          users: userCount,
          roles: roleCount,
          permissions: permissionCount
        }
      });
    } catch (modelError: any) {
      console.error("Model test error:", modelError);
      return NextResponse.json({ 
        success: false, 
        message: "Database connected but model query failed",
        error: modelError.message 
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error("Database connection error:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Database connection failed", 
      error: error.message 
    }, { status: 500 });
  }
}
