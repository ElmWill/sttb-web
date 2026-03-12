import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserData } from "../hooks/useUserData";
import { Loader2, UserPlus, CheckCircle2, AlertCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  roleId: z.string().min(1, "Role wajib dipilih"),
});

type FormData = z.infer<typeof schema>;

const ROLES = [
  { id: "1", name: "Super Admin" },
  { id: "2", name: "Admin" },
  { id: "3", name: "Editor" },
  { id: "4", name: "Content Creator" },
  { id: "5", name: "Marketing" },
  { id: "6", name: "User" },
];

export default function AdminRegistration() {
  const { actions, isCreating } = useUserData();
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ 
    resolver: zodResolver(schema),
    defaultValues: { roleId: "2" }
  });

  const onSubmit = async (data: FormData) => {
    setResult(null);
    const apiData = {
      ...data,
      roleId: parseInt(data.roleId),
      status: "active"
    };

    const res = await actions.onCreate(apiData);
    setResult({ success: res.success, message: res.message || "" });
    
    if (res.success) {
      reset();
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <UserPlus className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Daftarkan Admin Baru</h2>
          <p className="text-muted-foreground text-sm">Buat akun untuk staf atau pengelola konten baru.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card border rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nama Lengkap</label>
            <Input 
              placeholder="Masukkan nama lengkap" 
              {...register("name")} 
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input 
              type="email"
              placeholder="nama@sttb.ac.id" 
              {...register("email")} 
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input 
              type="password"
              placeholder="••••••••" 
              {...register("password")} 
              className={errors.password ? "border-destructive" : ""}
            />
            {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Role / Hak Akses</label>
            <select
              {...register("roleId")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {ROLES.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.roleId && <p className="text-xs text-destructive">{errors.roleId.message}</p>}
          </div>
        </div>

        {result && (
          <div className={`p-4 rounded-lg border flex items-start gap-3 ${
            result.success 
              ? "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400" 
              : "bg-destructive/10 border-destructive/20 text-destructive"
          }`}>
            {result.success ? <CheckCircle2 className="w-5 h-5 mt-0.5" /> : <AlertCircle className="w-5 h-5 mt-0.5" />}
            <p className="text-sm font-medium">{result.message}</p>
          </div>
        )}

        <div className="flex justify-end pt-4 border-t">
          <Button type="submit" disabled={isCreating} className="w-full md:w-auto px-8">
            {isCreating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Mendaftarkan...
              </>
            ) : (
              "Daftarkan Akun"
            )}
          </Button>
        </div>
      </form>

      <div className="p-4 bg-muted/30 rounded-lg border border-dashed border-muted-foreground/30">
        <h4 className="text-sm font-semibold mb-2">Penting:</h4>
        <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
          <li>Pastikan email yang didaftarkan aktif dan valid.</li>
          <li>Password minimal 6 karakter, disarankan kombinasi huruf dan angka.</li>
          <li>Role Super Admin memiliki akses penuh ke seluruh pengaturan sistem.</li>
        </ul>
      </div>
    </div>
  );
}
