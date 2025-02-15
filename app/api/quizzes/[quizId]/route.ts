import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ quizId: string }> }
) {
  try {
    const { quizId } = await context.params;

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
    });

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, quiz });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch quiz", message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ quizId: string }> }
) {
  try {
    const { quizId } = await context.params;
    const { title, description } = await req.json();

    const existingQuiz = await prisma.quiz.findUnique({
      where: { id: quizId },
    });

    if (!existingQuiz) {
      return NextResponse.json(
        { error: "Quiz not found" },
        { status: 404 }
      );
    }

    const quiz = await prisma.quiz.update({
      where: { id: quizId },
      data: { title, description },
    });

    return NextResponse.json({ quiz }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error in updating the quiz", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ quizId: string }> }
) {
  try {
    const { quizId } = await context.params;

    const existingQuiz = await prisma.quiz.findUnique({
      where: { id: quizId },
    });

    if (!existingQuiz) {
      return NextResponse.json(
        { message: "Quiz not found" },
        { status: 404 }
      );
    }

    await prisma.quiz.delete({
      where: { id: quizId },
    });

    return NextResponse.json(
      { message: "Quiz deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error in deleting the quiz", error: error.message },
      { status: 500 }
    );
  }
}
