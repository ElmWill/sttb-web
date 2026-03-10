import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import { ContentList } from "@/components/shared/ContentList"

const mockBerita = [
  { slug: "berita-1", title: "STTB Mengadakan Seminar Nasional Teologi Kontemporer", excerpt: "Diikuti oleh lebih dari 500 peserta dari berbagai denominasi.", date: "12 Okt 2024", image: "/placeholders/berita-1.jpg" },
  { slug: "berita-2", title: "Pelantikan BEM STTB Periode 2024-2025", excerpt: "Selamat melayani bagi pengurus baru yang telah terpilih.", date: "05 Okt 2024", image: "/placeholders/berita-2.jpg" },
]

export default function Berita() {
  return (
    <>
      <Head><title>Berita Kampus | {AppSettings.appName}</title></Head>
      <ContentList 
        title="Berita STTB" 
        description="Kabar terkini seputar kehidupan kampus dan pelayanan." 
        basePath="berita" 
        items={mockBerita} 
      />
    </>
  )
}

Berita.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
