"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "react-hot-toast";

interface Quiz {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function Dashboard() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const router = useRouter();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`/api/user-quizzes/${userId}`);
        setQuizzes(response.data.quizzes);
      } catch (error) {
        setError("Failed to load quizzes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleEdit = async(id:string)=>{
    router.push(`/quizzes/${id}`);
  }

  const handleDelete = async () => {
    if (!selectedQuiz) return;

    try {
      await axios.delete(`/api/quizzes/${selectedQuiz}`);
      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== selectedQuiz));
      toast.success("Quiz deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete quiz");
    } finally {
      setSelectedQuiz(null);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-4">Your Quizzes</h1>
      <Button onClick={() => router.push("/quizzes/create")}>+ Create Quiz</Button>

      {loading ? (
        <Skeleton className="h-40 w-full bg-muted" />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : quizzes.length === 0 ? (
        <p>No quizzes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="border border-muted">
              <CardHeader>
                <CardTitle className="text-xl">{quiz.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{quiz.description}</p>
                <p className="text-sm text-muted-foreground">
                  Created: {new Date(quiz.createdAt).toLocaleDateString()}
                </p>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => handleEdit(quiz.id)}
                  >
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        onClick={() => setSelectedQuiz(quiz.id)}
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the quiz.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
