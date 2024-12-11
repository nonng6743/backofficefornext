import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET() {
  try {
    const roles = await prisma.role.findMany(); // Fetch all roles
    return NextResponse.json(roles, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch roles:", error);
    return NextResponse.json(
      { message: "Failed to fetch roles" },
      { status: 500 }
    );
  }
}
