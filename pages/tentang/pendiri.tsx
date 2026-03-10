import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import PendiriFeature from "@/components/tentang/pendiri"

export default function Pendiri() {
  return (
    <>
      <Head>
        <title>Pendiri | {AppSettings.appName}</title>
      </Head>
      <PendiriFeature />
    </>
  )
}

Pendiri.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
