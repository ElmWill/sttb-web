import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import { Authorize } from "@/components/shared/Authorize"
import DashboardFeature from "@/components/dashboard"

export default function Dashboard() {
  return (
    <Authorize>
      <Head>
        <title>Dashboard | {AppSettings.appName}</title>
      </Head>
      <DashboardFeature />
    </Authorize>
  )
}

Dashboard.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
