import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function POST(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      { error: "No token provided" },
      { status: 401 }
    );
  }

  try {
    // ตรวจสอบและถอดรหัส Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // ตรวจสอบประเภทของ decoded และบังคับให้เป็น JwtPayload
    if (typeof decoded === "string" || !decoded.exp) {
      throw new Error("Invalid token structure");
    }

    // ตรวจสอบอายุของ Token
    const currentTime = Math.floor(Date.now() / 1000); // เวลาปัจจุบันในวินาที
    if (decoded.exp < currentTime) {
      return NextResponse.json(
        { error: "Token expired. Please login again." },
        { status: 401 }
      );
    }

    return NextResponse.json({ message: "Token is valid", decoded });
  } catch (err: unknown) {
    if (
      err instanceof Error &&
      err.name === "TokenExpiredError"
    ) {
      return NextResponse.json(
        { error: "Token expired. Please login again." },
        { status: 401 }
      );
    }

    console.error("Invalid token:", err);
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    );
  }
}
