import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import SenatFeature from "@/components/kehidupan-kampus/senat"

export default function Senat() {
  return (
    <>
      <Head>
        <title>Senat Mahasiswa | {AppSettings.appName}</title>
      </Head>
      <SenatFeature />
    </>
  )
}

Senat.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
