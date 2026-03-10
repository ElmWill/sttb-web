import React from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import { ContentDetail } from "@/components/shared/ContentDetail"

export default function KegiatanDetail() {
  const router = useRouter()
  const { slug } = router.query

  const title = typeof slug === 'string' 
    ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : "Detail Kegiatan"

  return (
    <>
      <Head><title>{title} | {AppSettings.appName}</title></Head>
      <ContentDetail 
        title={title}
        date="05 Nov 2024"
        image="/placeholders/kegiatan-hero.jpg"
        backPath="kegiatan"
        backLabel="Kembali ke Daftar Kegiatan"
        content={
          <p>
            Kegiatan ini merupakan implementasi nyata dari visi misi STTB untuk menjadi berkat bagi gereja dan masyarakat. Data ini akan diload secara dinamis dari server untuk slug <strong>{slug}</strong>.
          </p>
        }
      />
    </>
  )
}

KegiatanDetail.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
