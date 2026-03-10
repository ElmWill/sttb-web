import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import ProgramDetailFeature from "@/components/akademik/program-detail"
import { useRouter } from "next/router"

export default function ProgramDetail() {
  const router = useRouter()
  const { program } = router.query

  const title = typeof program === 'string' 
    ? program.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : "Program Studi"

  return (
    <>
      <Head>
        <title>{title} | {AppSettings.appName}</title>
      </Head>
      <ProgramDetailFeature programSlug={typeof program === 'string' ? program : ""} />
    </>
  )
}

ProgramDetail.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
