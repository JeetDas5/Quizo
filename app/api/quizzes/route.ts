import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { title, description, userId } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
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

    if (!title || !description) {
      return NextResponse.json(
        {
          error: "Title and description are required",
        },
        {
          status: 400,
        }
      );
    }

    const quiz = await prisma.quiz.create({
      data: {
        title,
        description,
        userId,
      },
    });

    return NextResponse.json({ success: true, quiz: quiz }, { status: 201 });
  } catch (error:any) {
    return NextResponse.json(
      {
        error: "Something went wrong while creating the quiz",
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        user: true,
      },
    });

    return NextResponse.json({ success: true, quizzes });
  } catch (error:any) {
    return NextResponse.json(
      {
        error: "Something went wrong while fetching the quizzes",
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
