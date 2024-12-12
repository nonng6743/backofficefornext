import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Check for missing required environment variables
    if (!process.env.ENCRYPTION_KEY || !process.env.JWT_SECRET) {
      console.error("Missing environment variables");
      return NextResponse.json(
        { error: "Server misconfiguration. Please try again later." },
        { status: 500 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.error("User not found for email:", email);
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Validate password by combining with ENCRYPTION_KEY
    const isPasswordValid = await bcrypt.compare(
      password + process.env.ENCRYPTION_KEY,
      user.password
    );

    if (!isPasswordValid) {
      console.error("Invalid password for user:", email);
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, fullname: user.fullName },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Token expires in 1 day
    );

    console.log("Login successful for user:", email);

    return NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "Login failed. Please try again later." },
      { status: 500 }
    );
  }
}
