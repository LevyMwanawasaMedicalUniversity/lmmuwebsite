import { prisma } from "@/lib/prisma";

/**
 * Check if a user has a specific permission either directly or through roles
 * @param userId User ID to check permissions for
 * @param permissionName Name of the permission to check
 * @returns Promise<boolean> True if user has the permission, false otherwise
 */
export async function hasPermission(userId: number, permissionName: string): Promise<boolean> {
  try {
    // If user is not provided, they don't have permission
    if (!userId) return false;

    // Get the user to check role
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    // If user is admin, they have all permissions
    if (user?.role === "admin") return true;

    // Check if user has the permission directly
    const directPermission = await prisma.userPermission.findFirst({
      where: {
        userId,
        permission: { name: permissionName }
      }
    });

    if (directPermission) return true;

    // Check if user has the permission through a role
    const rolePermission = await prisma.rolePermission.findFirst({
      where: {
        permission: { name: permissionName },
        role: {
          users: {
            some: { userId }
          }
        }
      }
    });

    return !!rolePermission;
  } catch (error) {
    console.error(`Error checking permission '${permissionName}' for user ${userId}:`, error);
    return false;
  }
}

/**
 * Get all permissions for a user (both direct and through roles)
 * @param userId User ID to get permissions for
 * @returns Promise<Array<{name: string, description: string | null, source: 'direct' | 'role', roleName?: string}>>
 */
export async function getUserPermissions(userId: number) {
  try {
    // If user is not provided, return empty array
    if (!userId) return [];

    // Get the user to check role
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    // If user is admin, indicate they have all permissions
    if (user?.role === "admin") {
      return [{ name: "*", description: "All permissions (admin)", source: "role" as const, roleName: "admin" }];
    }

    // Get direct permissions
    const directPermissions = await prisma.userPermission.findMany({
      where: { userId },
      select: {
        permission: {
          select: {
            name: true,
            description: true
          }
        }
      }
    });

    // Get role permissions
    const rolePermissions = await prisma.rolePermission.findMany({
      where: {
        role: {
          users: {
            some: { userId }
          }
        }
      },
      select: {
        permission: {
          select: {
            name: true,
            description: true
          }
        },
        role: {
          select: {
            name: true
          }
        }
      }
    });

    // Format direct permissions
    const formattedDirectPermissions = directPermissions.map(item => ({
      name: item.permission.name,
      description: item.permission.description,
      source: 'direct' as const
    }));

    // Format role permissions
    const formattedRolePermissions = rolePermissions.map(item => ({
      name: item.permission.name,
      description: item.permission.description,
      source: 'role' as const,
      roleName: item.role.name
    }));

    // Combine and deduplicate permissions
    // (direct permissions take precedence over role permissions)
    const allPermissions: Array<{
      name: string;
      description: string | null;
      source: 'direct' | 'role';
      roleName?: string;
    }> = [...formattedDirectPermissions];
    
    formattedRolePermissions.forEach(rolePermission => {
      if (!allPermissions.some(p => p.name === rolePermission.name)) {
        allPermissions.push(rolePermission);
      }
    });

    return allPermissions;
  } catch (error) {
    console.error(`Error getting permissions for user ${userId}:`, error);
    return [];
  }
}
