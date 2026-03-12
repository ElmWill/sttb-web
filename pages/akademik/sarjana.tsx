import React from "react";
import Head from "next/head";
import Link from "next/link";
import { AppSettings } from "@/functions/AppSettings";
import { MainLayout } from "@/components/layouts/MainLayout";
import { PageContainer } from "@/components/layouts/PageContainer";
import { PageHero } from "@/components/shared/PageHero";
import { ProgramCard } from "@/components/akademik/program-list";
import { useStudyProgramList } from "@/components/akademik/hooks/useStudyProgramData";
import { Button } from "@/components/ui/button";

function SarjanaList() {
  const { programs, isLoading, error } = useStudyProgramList("S1");

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

  return (
    <>
      <PageHero
        title="Program Sarjana (S1)"
        description="Temukan program studi Sarjana di Sekolah Tinggi Teologi Bandung."
      />
      <PageContainer>
        {programs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24 text-muted-foreground/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.966 8.966 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            <h2 className="text-2xl font-semibold text-foreground">Segera Hadir</h2>
            <p className="text-muted-foreground max-w-sm">
              Program Sarjana sedang dalam tahap persiapan. Pantau terus untuk pembaruan terbaru.
            </p>
            <Button asChild variant="outline" className="mt-2">
              <Link href="/admisi/prosedur">Lihat Informasi Admisi</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((p) => (
              <ProgramCard key={p.programId || p.ProgramId || p.slug} p={p} />
            ))}
          </div>
        )}
        <div className="mt-10 text-center">
          <Button variant="outline" asChild>
            <Link href="/akademik">← Semua Program</Link>
          </Button>
        </div>
      </PageContainer>
    </>
  );
}

export default function SarjanaPage() {
  return (
    <>
      <Head>
        <title>Program Sarjana (S1) | {AppSettings.appName}</title>
      </Head>
      <SarjanaList />
    </>
  );
}

SarjanaPage.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;
