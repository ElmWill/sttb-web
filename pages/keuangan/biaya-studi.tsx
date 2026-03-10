import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import BiayaStudiFeature from "@/components/keuangan/biaya-studi"

export default function BiayaStudi() {
  return (
    <>
      <Head>
        <title>Biaya Studi | {AppSettings.appName}</title>
      </Head>
      <BiayaStudiFeature />
    </>
  )
}

BiayaStudi.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
