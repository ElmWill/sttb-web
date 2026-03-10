import Head from "next/head"
import LandingPage from "@/components/landing"
import { MainLayout } from "@/components/layouts/MainLayout"
import React from "react"
import { AppSettings } from "@/functions/AppSettings"

export default function Home() {
  return (
    <>
      <Head>
        <title>Beranda | {AppSettings.appName}</title>
        <meta name="description" content="Sekolah Tinggi Teologi Bandung official website" />
      </Head>
      <LandingPage />
    </>
  )
}

Home.layout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
)
