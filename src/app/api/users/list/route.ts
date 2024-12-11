import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET() {
    try {
      const users = await prisma.user.findMany(); // ดึงข้อมูลผู้ใช้ทั้งหมด
      return NextResponse.json(users, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Failed to fetch users" },
        { status: 500 }
      );
    }
  }