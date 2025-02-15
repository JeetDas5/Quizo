import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    // Await the params object
    const { params } = context;
    const { userId } = await params;

    // Fetch quizzes for the user
    const quizzes = await prisma.quiz.findMany({
      where: { userId },
    });

    return NextResponse.json({ success: true, quizzes });
  } catch (error:any) {
    return NextResponse.json(
      { error: "Failed to fetch quizzes" , message: error.message },
      { status: 500 }
    );
  }
}
