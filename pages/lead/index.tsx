import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import { ContentList } from "@/components/shared/ContentList"

const mockLead = [
  { slug: "lead-1", title: "Menemukan Panggilan di Tengah Krisis", excerpt: "Renungan tentang bagaimana Tuhan bekerja di waktu sukar.", date: "10 Okt 2024", image: "/placeholders/lead-1.jpg" },
  { slug: "lead-2", title: "Pemimpin yang Melayani", excerpt: "Kajian kepemimpinan dari perspektif Injil Markus.", date: "02 Okt 2024", image: "/placeholders/lead-2.jpg" },
]

export default function Lead() {
  return (
    <>
      <Head><title>Artikel Kepemimpinan (Lead) | {AppSettings.appName}</title></Head>
      <ContentList 
        title="Artikel Lead" 
        description="Renungan, opini, dan kajian pustaka oleh para dosen dan civitas akademika." 
        basePath="lead" 
        items={mockLead} 
      />
    </>
  )
}

Lead.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
