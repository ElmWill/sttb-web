import React from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import useSWR from "swr"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import { ContentDetail } from "@/components/shared/ContentDetail"
import { eventsApi } from "@/functions/api/eventsApi"
import { useSwrFetcherWithAccessToken } from "@/functions/useSwrFetcherWithAccessToken"
import { Event } from "@/types/Models"

export default function KalenderAkademikDetail() {
  const router = useRouter()
  const { slug } = router.query
  const fetcher = useSwrFetcherWithAccessToken()

  const { data: ev, isLoading, error } = useSWR<Event>(
    typeof slug === "string" ? eventsApi.keys.detail(slug) : null,
    fetcher,
  )

  const title =
    ev?.title ||
    (ev as any)?.Title ||
    (typeof slug === "string"
      ? slug.split("-").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
      : "Detail Kegiatan")

  const startDate = ev?.startDate || (ev as any)?.StartDate
  const endDate = ev?.endDate || (ev as any)?.EndDate
  const location = ev?.location || (ev as any)?.Location
  const featuredImageId = ev?.featuredImageId || (ev as any)?.FeaturedImageId || null

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

  if (error || (!isLoading && !ev)) {
    return <div className="p-20 text-center text-red-500">Kegiatan tidak ditemukan</div>
  }

  return (
    <>
      <Head><title>{title} | {AppSettings.appName}</title></Head>
      <ContentDetail
        title={title}
        date={dateLabel}
        image={featuredImageId ? `/api/media-file/${featuredImageId}` : "/placeholders/kalender-hero.jpg"}
        backPath="kalender-akademik"
        backLabel="Kembali ke Kalender Akademik"
        content={
          <div>
            {location && (
              <p className="text-sm text-muted-foreground mb-4">
                📍 {location}
              </p>
            )}
            <div
              dangerouslySetInnerHTML={{
                __html: ev?.description || (ev as any)?.Description || "",
              }}
            />
          </div>
        }
      />
    </>
  )
}

KalenderAkademikDetail.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
