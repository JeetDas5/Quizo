import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Username not found" },
        { status: 401 }
      );
    }

    const isPasswordValid =
      user.password === password ||
      (await bcrypt.compare(password, user.password));

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Login successful", userId: user.id },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Invalid request", message: error.message },
      { status: 400 }
    );
  }
}
