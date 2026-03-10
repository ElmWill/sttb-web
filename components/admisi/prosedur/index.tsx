import React from "react"
import { PageHero } from "@/components/shared/PageHero"
import { PageContainer } from "@/components/layouts/PageContainer"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { AdmissionStepsTabs } from "./AdmissionStepsTabs"

export default function ProsedurAdmisiFeature() {
  return (
    <>
      <PageHero title="Prosedur Pendaftaran" description="Panduan langkah demi langkah proses admisi mahasiswa baru." />
      <PageContainer className="max-w-4xl">
        <SectionHeader title="Tahapan Pendaftaran" align="center" description="Ikuti 5 tahapan mudah berikut untuk bergabung dengan STTB." />
        <AdmissionStepsTabs />
      </PageContainer>
    </>
  )
}
