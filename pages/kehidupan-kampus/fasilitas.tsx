import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import FasilitasFeature from "@/components/kehidupan-kampus/fasilitas"

export default function Fasilitas() {
  return (
    <>
      <Head>
        <title>Fasilitas | {AppSettings.appName}</title>
      </Head>
      <FasilitasFeature />
    </>
  )
}

Fasilitas.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
