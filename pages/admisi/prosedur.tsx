import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import ProsedurAdmisiFeature from "@/components/admisi/prosedur"

export default function ProsedurAdmisi() {
  return (
    <>
      <Head>
        <title>Prosedur Pendaftaran | {AppSettings.appName}</title>
      </Head>
      <ProsedurAdmisiFeature />
    </>
  )
}

ProsedurAdmisi.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
