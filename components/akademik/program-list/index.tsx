import React from "react";
import { PageHero } from "@/components/shared/PageHero";
import { PageContainer } from "@/components/layouts/PageContainer";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useStudyProgramList } from "../hooks/useStudyProgramData";

export default function ProgramListFeature() {
  const { programs, isLoading, error } = useStudyProgramList();

  if (isLoading) {
    return (
      <PageContainer>
        <p className="text-center py-20 text-muted-foreground">
          Loading program studi...
        </p>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <p className="text-center py-20 text-red-500">
          Gagal mengambil data program studi.
        </p>
      </PageContainer>
    );
  }

  if (programs.length === 0) {
    return (
      <PageContainer>
        <p className="text-center py-20 text-muted-foreground">
          Tidak ada program studi yang tersedia saat ini.
        </p>
      </PageContainer>
    );
  }

  return (
    <>
      <PageHero
        title="Program Akademik"
        description="Pilihan program studi S1 dan S2 di Sekolah Tinggi Teologi Bandung."
      />
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((p) => (
            <Card
              key={p.programId || p.ProgramId || (p as any).id}
              className="flex flex-col h-full hover:shadow-md transition-shadow hover:border-primary/50"
            >
              <CardHeader>
                <CardTitle className="text-xl">
                  {p.programName || p.ProgramName || (p as any).title}
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground line-clamp-2">
                  {p.description || p.Description || (p as any).desc}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-4">
                <Button className="w-full" variant="outline" asChild>
                  <Link href={`/akademik/${p.slug || p.Slug || p.programId || p.ProgramId || (p as any).id}`}>
                    Lihat Detail Program
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageContainer>
    </>
  );
}
