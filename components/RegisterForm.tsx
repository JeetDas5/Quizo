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
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function RegisterForm() {
  const router = useRouter();
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ username: string; password: string }>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: { username: string; password: string }) => {
    setApiError("");

    try {
      const response = await axios.post("/api/register", data);
      toast.success("Registration successful! Please log in.");
      router.push("/login");
    } catch (error: any) {
      setApiError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-16 shadow-lg border border-muted p-6">
      <CardHeader>
        <CardTitle className="text-2xl text-foreground text-center">
          Register
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Input
              type="text"
              placeholder="Username"
              {...register("username")}
              className="bg-background text-foreground border border-muted text-lg px-4 py-3 w-full"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="relative">
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="bg-background text-foreground border border-muted text-lg px-4 py-3 w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-muted-foreground px-3"
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {apiError && (
            <p className="text-red-500 text-sm text-center">{apiError}</p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-background text-lg py-3"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
          <p className="text-sm text-gray-500">Already have an account?</p>
          <Link href="/login">
            <p className="text-primary text-sm hover:text-slate-600">Login</p>
          </Link>
        </form>
      </CardContent>
    </Card>
  );
}
