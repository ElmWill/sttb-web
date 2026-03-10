import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import PembinaanFeature from "@/components/kehidupan-kampus/pembinaan"

export default function Pembinaan() {
  return (
    <>
      <Head>
        <title>Pembinaan | {AppSettings.appName}</title>
      </Head>
      <PembinaanFeature />
    </>
  )
}

Pembinaan.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
