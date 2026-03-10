import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import SejarahFeature from "@/components/tentang/sejarah"

export default function Sejarah() {
  return (
    <>
      <Head>
        <title>Sejarah | {AppSettings.appName}</title>
      </Head>
      <SejarahFeature />
    </>
  )
}

Sejarah.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
