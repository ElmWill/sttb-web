import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import { ContentList, ContentItem } from "@/components/shared/ContentList"
import { useAcademicCalendarList } from "@/components/kalender-akademik/hooks/useAcademicCalendarData"

export default function KalenderAkademik() {
  const { academicCalendars, isLoading, error } = useAcademicCalendarList(1);

  const items: ContentItem[] = academicCalendars.map((cal) => {
    const startDate = cal.startDate || (cal as any).StartDate || cal.createdAt;
    const academicYear = cal.academicYear || (cal as any).AcademicYear || "";
    const semester = cal.semester || (cal as any).Semester || "";
    const eventType = cal.eventType || (cal as any).EventType || "";
    const metaBadges = [academicYear, semester, eventType].filter(Boolean).join(" · ");
    return {
      slug: cal.slug || (cal as any).Slug || "",
      title: cal.title || (cal as any).Title || "",
      excerpt: metaBadges
        ? `${metaBadges}${cal.description || (cal as any).Description ? " — " + (cal.description || (cal as any).Description) : ""}`
        : (cal.description || (cal as any).Description || ""),
      date: new Date(startDate).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      image: "/placeholders/kalender-hero.jpg",
    };
  });

  return (
    <>
      <Head><title>Kalender Akademik | {AppSettings.appName}</title></Head>
      <div className="min-h-screen">
        {isLoading && (
          <div className="p-8 text-center text-muted-foreground">Memuat Kalender Akademik...</div>
        )}
        {error && (
          <div className="p-8 text-center text-destructive">
            Gagal memuat kalender akademik: {(error as any).message || "Terjadi kesalahan"}
          </div>
        )}
        {!isLoading && !error && (
          <ContentList
            title="Kalender Akademik"
            description="Jadwal kegiatan akademik STTB untuk setiap semester dan tahun ajaran."
            basePath="kalender-akademik"
            items={items}
          />
        )}
      </div>
    </>
  )
}

KalenderAkademik.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
