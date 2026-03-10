import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import DewanDosenFeature from "@/components/tentang/dewan-dosen"

export default function DewanDosen() {
  return (
    <>
      <Head>
        <title>Dewan Dosen | {AppSettings.appName}</title>
      </Head>
      <DewanDosenFeature />
    </>
  )
}

DewanDosen.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
