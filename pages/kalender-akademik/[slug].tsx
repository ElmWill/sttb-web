import React from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import { ContentDetail } from "@/components/shared/ContentDetail"
import { useAcademicCalendarDetail } from "@/components/kalender-akademik/hooks/useAcademicCalendarData"
import { BookOpen } from "lucide-react"

export default function KalenderAkademikDetail() {
  const router = useRouter()
  const { slug } = router.query
  const { academicCalendar: cal, isLoading, error } = useAcademicCalendarDetail(
    typeof slug === "string" ? slug : null
  );

  const title =
    cal?.title ||
    (cal as any)?.Title ||
    (typeof slug === "string"
      ? slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
      : "Detail Kalender Akademik")

  const startDate = cal?.startDate || (cal as any)?.StartDate
  const endDate = cal?.endDate || (cal as any)?.EndDate
  const academicYear = cal?.academicYear || (cal as any)?.AcademicYear
  const semester = cal?.semester || (cal as any)?.Semester
  const eventType = cal?.eventType || (cal as any)?.EventType

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })

  const dateLabel = startDate
    ? endDate && endDate !== startDate
      ? `${formatDate(startDate)} – ${formatDate(endDate)}`
      : formatDate(startDate)
    : ""

  if (isLoading) {
    return <div className="p-20 text-center text-muted-foreground">Memuat Konten...</div>
  }

  if (error || (!isLoading && !cal)) {
    return <div className="p-20 text-center text-red-500">Kalender tidak ditemukan</div>
  }

  return (
    <>
      <Head><title>{title} | {AppSettings.appName}</title></Head>
      <ContentDetail
        title={title}
        date={dateLabel}
        image="/placeholders/kalender-hero.jpg"
        backPath="kalender-akademik"
        backLabel="Kembali ke Kalender Akademik"
        content={
          <div>
            {(academicYear || semester || eventType) && (
              <div className="flex flex-wrap items-center gap-2 mb-6 not-prose">
                <BookOpen className="w-4 h-4 shrink-0 text-muted-foreground" />
                {academicYear && (
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {academicYear}
                  </span>
                )}
                {semester && (
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                    {semester}
                  </span>
                )}
                {eventType && (
                  <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-sm font-medium">
                    {eventType}
                  </span>
                )}
              </div>
            )}
            <div
              dangerouslySetInnerHTML={{
                __html: cal?.description || (cal as any)?.Description || "",
              }}
            />
          </div>
        }
      />
    </>
  )
}

KalenderAkademikDetail.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
