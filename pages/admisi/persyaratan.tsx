import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import PersyaratanFeature from "@/components/admisi/persyaratan"

export default function Persyaratan() {
  return (
    <>
      <Head>
        <title>Persyaratan Admisi | {AppSettings.appName}</title>
      </Head>
      <PersyaratanFeature />
    </>
  )
}

Persyaratan.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
