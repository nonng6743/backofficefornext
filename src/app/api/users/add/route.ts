import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, password, roleId } = body;

    // Validate required fields
    if (!fullName?.trim() || !email?.trim() || !password || !roleId) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if role exists
    const role = await prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!role) {
      return NextResponse.json(
        { error: "Invalid role ID" },
        { status: 400 }
      );
    }

    // Check if email is already used
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // Ensure the encryption key exists
    const encryptionKey = process.env.ENCRYPTION_KEY;
    if (!encryptionKey) {
      throw new Error("Missing ENCRYPTION_KEY in environment variables");
    }

    // Hash the password with the encryption key
    const combinedPassword = password + encryptionKey;
    const hashedPassword = await bcrypt.hash(combinedPassword, 10);

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        fullName: fullName.trim(),
        email: email.trim(),
        password: hashedPassword,
        roleId,
      },
    });

    return NextResponse.json(
      { message: "User added successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    // Log detailed error information
    console.error(
      "Error adding user:",
      error instanceof Error ? error.message : error
    );

    // Return a sanitized error response
    return NextResponse.json(
      { error: "Failed to add user. Please try again later." },
      { status: 500 }
    );
  }
}
