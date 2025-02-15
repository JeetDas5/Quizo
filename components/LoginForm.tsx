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
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginForm() {
  const router = useRouter();
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ username: string; password: string }>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: { username: string; password: string }) => {
    setApiError("");

    const saveUserId = (userId: string) => {
      const expiryTime = Date.now() + 60 * 60 * 1000;
      localStorage.setItem("userId", userId);
      localStorage.setItem("userExpiry", expiryTime.toString());
    };

    try {
      const response = await axios.post("/api/login", data);
      saveUserId(response.data.userId);
      toast.success("Login successful");
      router.push("/dashboard");
    } catch (error: any) {
      setApiError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-12 shadow-lg border border-muted p-6">
      <CardHeader>
        <CardTitle className="text-2xl text-foreground text-center">
          Login
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Input
              type="text"
              placeholder="Username"
              {...register("username")}
              className="w-full bg-background text-foreground border border-muted px-4 py-3 text-lg"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className="w-full bg-background text-foreground border border-muted px-4 py-3 text-lg pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-muted-foreground px-3"
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}

          {apiError && <p className="text-red-500 text-sm mt-1">{apiError}</p>}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-background text-lg py-3"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
          <p className="text-sm text-gray-500">Create new account?</p>
          <Link href="/register">
            <p className="text-primary text-sm hover:text-slate-600">Register</p>
          </Link>
        </form>
      </CardContent>
    </Card>
  );
}
