import React from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import { ContentDetail } from "@/components/shared/ContentDetail"

export default function LeadDetail() {
  const router = useRouter()
  const { slug } = router.query

  const title = typeof slug === 'string' 
    ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : "Detail Artikel"

  return (
    <>
      <Head><title>{title} | {AppSettings.appName}</title></Head>
      <ContentDetail 
        title={title}
        date="10 Okt 2024"
        image="/placeholders/lead-hero.jpg"
        backPath="lead"
        backLabel="Kembali ke Daftar Artikel"
        content={
          <p>
            Artikel ini membagikan insight tentang kepemimpinan kristen dan isu-isu teologis kontemporer untuk memperkaya kehidupan rohani pembaca. Data artikel dengan slug <strong>{slug}</strong> diproses melalui CMS backend.
          </p>
        }
      />
    </>
  )
}

LeadDetail.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
