import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import { ContentList } from "@/components/shared/ContentList"

const mockMedia = [
  { slug: "buletin-oktober", title: "Buletin STTB Edisi Oktober 2024", excerpt: "Fokus tema bulan ini: Menghidupi Panggilan di Era Digital.", date: "01 Okt 2024", image: "/placeholders/media-1.jpg" },
  { slug: "podcast-1", title: "Podcast Teologi Eps. 1", excerpt: "Membahas relevansi teologi reformed hari ini.", date: "20 Sep 2024", image: "/placeholders/media-2.jpg" },
]

export default function Media() {
  return (
    <>
      <Head><title>Media & Publikasi | {AppSettings.appName}</title></Head>
      <ContentList 
        title="Media Publikasi" 
        description="Jurnal, buletin, dan konten multimedia STTB." 
        basePath="media" 
        items={mockMedia} 
      />
    </>
  )
}

Media.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
