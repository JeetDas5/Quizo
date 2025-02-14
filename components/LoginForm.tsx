"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginForm() {
  const router = useRouter();
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ username: string; password: string }>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: { username: string; password: string }) => {
    setApiError("");

    try {
      const response = await axios.post("/api/login", data);
      console.log(response.data)
      localStorage.setItem("userId", response.data.userId);
      toast.success("Login successful");
      router.push("/dashboard");
    } catch (error: any) {
      setApiError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-10 shadow-lg border border-muted">
      <CardHeader>
        <CardTitle className="text-xl text-foreground">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="text"
            placeholder="Username"
            {...register("username")}
            className="bg-background text-foreground border border-muted"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}

          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="bg-background text-foreground border border-muted"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-background"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
