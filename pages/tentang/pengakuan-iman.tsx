import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import PengakuanImanFeature from "@/components/tentang/pengakuan-iman"

export default function PengakuanIman() {
  return (
    <>
      <Head>
        <title>Pengakuan Iman | {AppSettings.appName}</title>
      </Head>
      <PengakuanImanFeature />    
    </>
  )
}

PengakuanIman.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
