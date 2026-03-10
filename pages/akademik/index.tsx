import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import ProgramListFeature from "@/components/akademik/program-list"

export default function Akademik() {
  return (
    <>
      <Head>
        <title>Kehidupan Akademik | {AppSettings.appName}</title>
      </Head>
      <ProgramListFeature />
    </>
  )
}

Akademik.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
