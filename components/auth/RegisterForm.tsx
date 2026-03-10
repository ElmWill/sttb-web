import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { BackendApiUrl } from "@/functions/BackendApiUrl"
import { useRouter } from "next/router"

const schema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Masukkan email yang valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Password tidak cocok",
})

type FormData = z.infer<typeof schema>

export function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setServerError(null)
    setSuccessMessage(null)
    try {
      const res = await fetch(BackendApiUrl.register, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        setServerError(json?.message || "Pendaftaran gagal, silahkan coba lagi.")
        return
      }
      setSuccessMessage("Akun berhasil dibuat! Mengalihkan ke halaman login...")
      setTimeout(() => router.push("/auth/login"), 2000)
    } catch {
      setServerError("Gagal terhubung ke server. Periksa koneksi Anda.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="reg-name" className="text-sm font-medium text-foreground">
          Nama Lengkap
        </label>
        <Input
          id="reg-name"
          type="text"
          placeholder="Nama Lengkap"
          autoComplete="name"
          {...register("name")}
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="reg-email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <Input
          id="reg-email"
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
        <label htmlFor="reg-password" className="text-sm font-medium text-foreground">
          Password
        </label>
        <Input
          id="reg-password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          {...register("password")}
          className={errors.password ? "border-destructive" : ""}
        />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="reg-confirm-password" className="text-sm font-medium text-foreground">
          Konfirmasi Password
        </label>
        <Input
          id="reg-confirm-password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          {...register("confirmPassword")}
          className={errors.confirmPassword ? "border-destructive" : ""}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
        )}
      </div>

      {serverError && (
        <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-sm text-destructive">
          {serverError}
        </div>
      )}

      {successMessage && (
        <div className="p-3 rounded-md bg-green-500/10 border border-green-500/20 text-sm text-green-700 dark:text-green-400">
          {successMessage}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Mendaftarkan..." : "Daftar Sekarang"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Sudah punya akun?{" "}
        <Link href="/auth/login" className="text-primary font-medium hover:underline">
          Masuk di sini
        </Link>
      </p>
    </form>
  )
}
