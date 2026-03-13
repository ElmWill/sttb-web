import React from "react"
import { PageContainer } from "@/components/layouts/PageContainer"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { AdmissionStepsTabs } from "./AdmissionStepsTabs"

export default function ProsedurAdmisiFeature() {
  return (
    <>
      <PageContainer className="max-w-4xl">
        <SectionHeader title="Tahapan Pendaftaran" align="center" description="Ikuti 5 tahapan mudah berikut untuk bergabung dengan STTB." />
        <AdmissionStepsTabs />
      </PageContainer>
    </>
  )
}
