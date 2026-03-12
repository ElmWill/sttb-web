import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { BackendApiUrl } from "@/functions/BackendApiUrl";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";

const schema = z.object({
  email: z.string().email("Masukkan email yang valid"),
  password: z.string().min(1, "Password wajib diisi"),
});

type FormData = z.infer<typeof schema>;

export interface LoginResponse {
  userId: number;
  name: string;
  email: string;
  roleName: string;
  token: string;
  permissions: string[];
}

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setServerError(null);
    try {
      const res = await fetch(BackendApiUrl.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setServerError(json?.message || "Login gagal, silahkan coba lagi.");
        return;
      }
      const loginData: LoginResponse = json;
      // Persist the user and their permissions via AuthContext
      login({
        userId: loginData.userId,
        name: loginData.name,
        email: loginData.email,
        roleName: loginData.roleName,
        token: loginData.token,
        permissions: loginData.permissions,
      });
      // Redirect to intended page or dashboard
      // Admin/SuperAdmin should be redirected to dashboard if no specific redirect is provided or even if specific redirect to home
      const role = loginData.roleName.toLowerCase();
      const redirect = router.query.redirect as string | undefined;

      if (role === "admin" || role === "superadmin") {
        router.replace("/dashboard");
      } else if (redirect) {
        router.replace(redirect);
      } else {
        router.replace("/");
      }
    } catch {
      setServerError("Gagal terhubung ke server. Periksa koneksi Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="login-email"
          className="text-sm font-medium text-foreground"
        >
          Email
        </label>
        <Input
          id="login-email"
          type="email"
          placeholder="nama@email.com"
          autoComplete="email"
          {...register("email")}
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="login-password"
          className="text-sm font-medium text-foreground"
        >
          Password
        </label>
        <Input
          id="login-password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          {...register("password")}
          className={errors.password ? "border-destructive" : ""}
        />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      {serverError && (
        <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-sm text-destructive">
          {serverError}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Memproses..." : "Masuk"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Belum punya akun?{" "}
        <Link
          href="/auth/register"
          className="text-primary font-medium hover:underline"
        >
          Daftar di sini
        </Link>
      </p>
    </form>
  );
}
