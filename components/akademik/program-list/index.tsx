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
import { StudyProgramListItem } from "@/types/Models";

import { useStudyProgramList } from "../hooks/useStudyProgramData";

function ProgramCard({ p }: { p: StudyProgramListItem }) {
  const name = p.programName || p.ProgramName || "";
  const desc = p.description || p.Description || "";
  const slug = p.slug || p.Slug || p.programId || p.ProgramId;
  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow hover:border-primary/50">
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription className="text-base text-muted-foreground line-clamp-2">
          {desc}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto pt-4">
        <Button className="w-full" variant="outline" asChild>
          <Link href={`/akademik/${slug}`}>Lihat Detail Program</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function ProgramListFeature() {
  const { programs, isLoading, error } = useStudyProgramList();

  if (isLoading) {
    return (
      <PageContainer>
        <p className="text-center py-20 text-muted-foreground">Loading program studi...</p>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <p className="text-center py-20 text-red-500">Gagal mengambil data program studi.</p>
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

  // Group programs by degreeLevel (e.g. S1 → Sarjana, S2 → Magister)
  const groups: Record<string, StudyProgramListItem[]> = {};
  programs.forEach((p) => {
    const level = p.degreeLevel || p.DegreeLevel || "Lainnya";
    if (!groups[level]) groups[level] = [];
    groups[level].push(p);
  });

  // Preferred display order: S1 before S2
  const levelOrder = ["S1", "S2"];
  const sortedLevels = Object.keys(groups).sort((a, b) => {
    const ai = levelOrder.indexOf(a);
    const bi = levelOrder.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  const levelLabel: Record<string, string> = {
    S1: "Program Sarjana (S1)",
    S2: "Program Magister (S2)",
  };

  return (
    <>
      <PageHero
        title="Program Akademik"
        description="Pilihan program studi S1 dan S2 di Sekolah Tinggi Teologi Bandung."
      />
      <PageContainer>
        <div className="space-y-12">
          {sortedLevels.map((level) => (
            <section key={level}>
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b">
                {levelLabel[level] ?? level}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups[level].map((p) => (
                  <ProgramCard key={p.programId || p.ProgramId || p.slug} p={p} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </PageContainer>
    </>
  );
}
