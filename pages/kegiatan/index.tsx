import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import { ContentList, ContentItem } from "@/components/shared/ContentList"
import { useEventList } from "@/components/kegiatan/hooks/useEventData"

export default function Kegiatan() {
  const { events: eventItems, isLoading, error } = useEventList(1, undefined, "published");

  const items: ContentItem[] = eventItems.map((event) => {
    const startDate = event.startDate || (event as any).StartDate || event.createdAt;
    return {
      slug: event.slug || (event as any).Slug || "",
      title: event.title || (event as any).Title || "",
      excerpt: event.description || (event as any).Description || "",
      date: new Date(startDate).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      image: (event.featuredImageId || (event as any).FeaturedImageId)
        ? `/api/media-file/${event.featuredImageId || (event as any).FeaturedImageId}`
        : "/placeholders/kegiatan-1.jpg",
    };
  });

  return (
    <>
      <Head><title>Kegiatan Kampus | {AppSettings.appName}</title></Head>
      <div className="min-h-screen">
        {isLoading && (
          <div className="p-8 text-center text-muted-foreground">Memuat Kegiatan...</div>
        )}
        {error && (
          <div className="p-8 text-center text-destructive">
            Gagal memuat kegiatan: {error.message || "Terjadi kesalahan"}
          </div>
        )}
        {!isLoading && !error && (
          <ContentList
            title="Kegiatan Kampus"
            description="Dokumentasi aktivitas akademik maupun non-akademik di STTB."
            basePath="kegiatan"
            items={items}
          />
        )}
      </div>
    </>
  )
}

Kegiatan.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
