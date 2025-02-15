"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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

export default function EditQuizPage() {
  const router = useRouter();
  const params = useParams();
  const quizId = params?.id as string;
  const [userId, setUserId] = useState<string | null>(null);
  const [quizOwnerId, setQuizOwnerId] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<QuizFormData>({
    resolver: zodResolver(quizSchema),
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      toast.error("User not found. Please log in.");
      router.push("/login");
    }
    setUserId(storedUserId);
  }, [router]);

  useEffect(() => {
    if (!quizId || !userId) return;

    let isMounted = true;

    axios
      .get(`/api/quizzes/${quizId}`)
      .then((response) => {
        if (!isMounted) return;
        const {
          title,
          description,
          userId: fetchedQuizOwnerId,
        } = response.data.quiz;

        setQuizOwnerId(fetchedQuizOwnerId);

        if (fetchedQuizOwnerId !== userId) {
          toast.error("Unauthorized access!");
          router.push("/dashboard");
          return;
        }

        setValue("title", title);
        setValue("description", description);
      })
      .catch(() => {
        toast.error("Quiz not found!");
        router.push("/dashboard");
      });

    return () => {
      isMounted = false;
    };
  }, [quizId, userId, setValue, router]);

  const onSubmit = async (data: QuizFormData) => {
    try {
      await axios.put(`/api/quizzes/${quizId}`, { ...data });
      toast.success("Quiz updated successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Failed to update quiz");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-background text-foreground">
      <Card className="w-full max-w-lg border border-muted">
        <CardHeader>
          <CardTitle className="text-xl">Edit Quiz</CardTitle>
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

            <div className="flex justify-between gap-2">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Quiz"}
              </Button>
              <Button
                type="button"
                className="w-full bg-gray-500 hover:bg-gray-600 text-white"
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
