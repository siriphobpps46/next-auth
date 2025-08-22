import { NextResponse } from "next/server";
import { createToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Validation
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username and password are required" },
        { status: 400 }
      );
    }

    // Mock authentication logic
    let userRole = null;
    let userData = null;

    if (username === "admin" && password === "123") {
      userRole = "admin";
      userData = { username, role: "admin", name: "Administrator" };
    } else if (username === "user" && password === "123") {
      userRole = "user";
      userData = { username, role: "user", name: "Regular User" };
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = await createToken({ role: userRole, user: username });

    // Set response
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: userData
    });

    // Set secure cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
