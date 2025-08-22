import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "No token provided" },
        { status: 401 }
      );
    }

    try {
      const decoded = await verifyToken(token);
      return NextResponse.json({
        success: true,
        user: decoded
      });
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
