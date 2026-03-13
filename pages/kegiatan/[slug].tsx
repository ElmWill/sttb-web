import React from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import { ContentDetail } from "@/components/shared/ContentDetail"
import { useEventDetail } from "@/components/kegiatan/hooks/useEventData"
import { MapPin } from "lucide-react"

export default function KegiatanDetail() {
  const router = useRouter()
  const { slug } = router.query
  const { event, isLoading, error } = useEventDetail(typeof slug === "string" ? slug : null);

  const title =
    event?.title ||
    (event as any)?.Title ||
    (typeof slug === "string"
      ? slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
      : "Detail Kegiatan")

  const startDate = event?.startDate || (event as any)?.StartDate
  const endDate = event?.endDate || (event as any)?.EndDate
  const location = event?.location || (event as any)?.Location

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

  if (error || (!isLoading && !event)) {
    return <div className="p-20 text-center text-red-500">Kegiatan tidak ditemukan</div>
  }

  return (
    <>
      <Head><title>{title} | {AppSettings.appName}</title></Head>
      <ContentDetail
        title={title}
        date={dateLabel}
        image={
          (event?.featuredImageId || (event as any)?.FeaturedImageId)
            ? `/api/media-file/${event?.featuredImageId || (event as any)?.FeaturedImageId}`
            : "/placeholders/kegiatan-hero.jpg"
        }
        backPath="kegiatan"
        backLabel="Kembali ke Daftar Kegiatan"
        content={
          <div>
            {location && (
              <div className="flex items-center gap-2 text-muted-foreground mb-6 not-prose">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>{location}</span>
              </div>
            )}
            <div
              dangerouslySetInnerHTML={{
                __html: event?.description || (event as any)?.Description || "",
              }}
            />
          </div>
        }
      />
    </>
  )
}

KegiatanDetail.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
