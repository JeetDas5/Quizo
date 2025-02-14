import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { quizId: string } }) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: params.quizId },
    });

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, quiz });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch quiz" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { quizId: string } }
) {
  try {
    const quizId = params.quizId;
    const { title, description } = await req.json();

    const existingQuiz = await prisma.quiz.findUnique({
      where: { id: quizId },
    });

    if (!existingQuiz) {
      return NextResponse.json(
        {
          error: "Quiz not found",
        },
        {
          status: 404,
        }
      );
    }

    const quiz = await prisma.quiz.update({
      where: { id: quizId },
      data: {
        title,
        description,
      },
    });

    return NextResponse.json({ quiz }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error in updating the quiz" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { quizId: string } }
) {
  try {
    const quizId = await params.quizId;

    const existingQuiz = prisma.quiz.findUnique({
      where: { id: quizId },
      include:{
        user: true
      }
    });

    if (!existingQuiz) {
      return NextResponse.json(
        {
          message: "Quiz not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.quiz.delete({
      where: { id: quizId },
    });

    return NextResponse.json({ message: "Quiz deleted succefully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error in deleting the quiz" },
      { status: 500 }
    );
  }
}
