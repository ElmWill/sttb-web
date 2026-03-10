import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import VisiMisiFeature from "@/components/tentang/visi-misi"

export default function VisiMisi() {
  return (
    <>
      <Head>
        <title>Visi, Misi & Tagline | {AppSettings.appName}</title>
      </Head>
      <VisiMisiFeature />
    </>
  )
}

VisiMisi.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
