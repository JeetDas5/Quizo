import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const quizzes = await prisma.quiz.findMany({
      where: {
        userId: id,
      },
    });

    return NextResponse.json({ quizzes }, { status: 200 });
  } catch (error) {}
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const quizId = params.id;
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
  { params }: { params: { id: string } }
) {
  try {
    const quizId = await params.id;

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
