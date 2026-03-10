import React from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import { ContentDetail } from "@/components/shared/ContentDetail"

export default function MediaDetail() {
  const router = useRouter()
  const { slug } = router.query

  const title = typeof slug === 'string' 
    ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : "Detail Media"

  return (
    <>
      <Head><title>{title} | {AppSettings.appName}</title></Head>
      <ContentDetail 
        title={title}
        date="01 Okt 2024"
        image="/placeholders/media-hero.jpg"
        backPath="media"
        backLabel="Kembali ke Daftar Media"
        content={
          <p>
            Ini adalah contoh konten media dinamis berdasarkan slug <strong>{slug}</strong>.  
            Anda dapat mendengarkan podcast terkait atau mengunduh versi PDF dari publikasi kami melalui tautan yang akan disediakan di halaman ini.
          </p>
        }
      />
    </>
  )
}

MediaDetail.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
