import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import DukungFeature from "@/components/keuangan/dukung"

export default function Dukung() {
  return (
    <>
      <Head>
        <title>Dukung STTB | {AppSettings.appName}</title>
      </Head>
      <DukungFeature />
    </>
  )
}

Dukung.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
