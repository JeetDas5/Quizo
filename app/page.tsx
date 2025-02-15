"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();

  return (
    <main className="h-screen flex flex-col items-center justify-center bg-background text-foreground px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Quizo</h1>
      <p className="text-lg mb-6 text-muted-foreground">
        Create, manage, and track quizzes easily with our platform.
      </p>
      <Button onClick={() => router.push("/login")} className="px-6 py-2 text-lg">
        Get Started
      </Button>
    </main>
  );
}
