"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const quizSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters long"),
});

type QuizFormData = z.infer<typeof quizSchema>;

export default function CreateQuiz() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuizFormData>({
    resolver: zodResolver(quizSchema),
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setUserId(userId);
    } else {
      toast.error("User not found. Please log in.");
      router.push("/login");
    }
  }, [router]);

  const onSubmit = async (data: QuizFormData) => {
    if (!userId) {
      toast.error("User not found!");
      return;
    }

    try {
      await axios.post("/api/quizzes", { ...data, userId });
      toast.success("Quiz created successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Failed to create quiz");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-background text-foreground">
      <Card className="w-full max-w-lg border border-muted">
        <CardHeader>
          <CardTitle className="text-xl">Create New Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Enter quiz title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Enter quiz description"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Quiz"}
              </Button>
              <Button
                type="button"
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white"
                onClick={() => router.push("/dashboard")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
