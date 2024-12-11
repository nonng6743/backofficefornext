import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY: string = process.env.JWT_SECRET || "your-secret-key";

export interface DecodedToken extends JwtPayload {
  id?: string; // Customize this to match your token's structure
  email?: string; // Example additional properties
}

export function verifyToken(token: string): DecodedToken | null {
  try {
    return jwt.verify(token, SECRET_KEY) as DecodedToken;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
