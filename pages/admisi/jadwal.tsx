import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import JadwalAdmisiFeature from "@/components/admisi/jadwal"

export default function JadwalAdmisi() {
  return (
    <>
      <Head>
        <title>Jadwal Admisi | {AppSettings.appName}</title>
      </Head>
      <JadwalAdmisiFeature />
    </>
  )
}

JadwalAdmisi.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
