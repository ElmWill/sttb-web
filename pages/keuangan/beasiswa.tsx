import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import BeasiswaFeature from "@/components/keuangan/beasiswa"

export default function Beasiswa() {
  return (
    <>
      <Head>
        <title>Beasiswa | {AppSettings.appName}</title>
      </Head>
      <BeasiswaFeature />
    </>
  )
}

Beasiswa.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
