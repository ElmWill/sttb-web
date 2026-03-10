import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import ArtiLogoFeature from "@/components/tentang/arti-logo"

export default function ArtiLogo() {
  return (
    <>
      <Head>
        <title>Arti Logo | {AppSettings.appName}</title>
      </Head>
      <ArtiLogoFeature />
    </>
  )
}

ArtiLogo.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
