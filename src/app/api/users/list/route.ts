import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET() {
  try {
    // Fetch users with their associated roles
    const users = await prisma.user.findMany({
      include: {
        role: true, // Include role information
      },
    });

    // Format the response to include user details and role name
    const formattedUsers = users.map((user) => ({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      status: user.status,
      role: user.role ? user.role.name : "N/A", // Include role name if available
      roleId: user.role.id,
    }));

    return NextResponse.json(formattedUsers, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch users with roles:", error);
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
