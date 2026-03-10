import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import MarsFeature from "@/components/tentang/mars"

export default function Mars() {
  return (
    <>
      <Head>
        <title>Mars STTB | {AppSettings.appName}</title>
      </Head>
      <MarsFeature />
    </>
  )
}

Mars.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
