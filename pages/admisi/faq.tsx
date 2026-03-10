import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import FaqFeature from "@/components/admisi/faq"

export default function Faq() {
  return (
    <>
      <Head>
        <title>FAQ | {AppSettings.appName}</title>
      </Head>
      <FaqFeature />
    </>
  )
}

Faq.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
