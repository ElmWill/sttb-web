import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import YayasanFeature from "@/components/tentang/yayasan"

export default function Yayasan() {
  return (
    <>
      <Head>
        <title>Yayasan | {AppSettings.appName}</title>
      </Head>
      <YayasanFeature />
    </>
  )
}

Yayasan.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
