import React from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import { ContentDetail } from "@/components/shared/ContentDetail"

export default function BeritaDetail() {
  const router = useRouter()
  const { slug } = router.query

  const title = typeof slug === 'string' 
    ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : "Detail Berita"

  return (
    <>
      <Head><title>{title} | {AppSettings.appName}</title></Head>
      <ContentDetail 
        title={title}
        date="12 Okt 2024"
        image="/placeholders/berita-hero.jpg"
        backPath="berita"
        backLabel="Kembali ke Daftar Berita"
        content={
          <p>
            Ini adalah contoh konten berita dinamis. Di lingkungan produksi, data ini akan diambil dari CMS backend menggunakan SWR atau SSR berdasarkan slug <strong>{slug}</strong>.
            STTB terus berkomitmen menyediakan informasi yang aktual dan transparan mengenai setiap kegiatan lembaga.
          </p>
        }
      />
    </>
  )
}

BeritaDetail.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
