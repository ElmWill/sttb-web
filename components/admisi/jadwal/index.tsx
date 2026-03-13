import React from "react"
import { PageContainer } from "@/components/layouts/PageContainer"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { AdmissionCalendar } from "./AdmissionCalendar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const jadwalData = [
  { batch: "Gelombang 1", dateRange: "1 Januari - 31 Maret 2024", testDate: "15 April 2024", resultDate: "30 April 2024" },
  { batch: "Gelombang 2", dateRange: "1 April - 30 Juni 2024", testDate: "15 Juli 2024", resultDate: "31 Juli 2024" },
  { batch: "Gelombang 3", dateRange: "1 Juli - 15 Agustus 2024", testDate: "20 Agustus 2024", resultDate: "25 Agustus 2024" },
]

export default function JadwalAdmisiFeature() {
  return (
    <>
      <PageContainer className="max-w-4xl">
        <SectionHeader title="Jadwal Gelombang Pendaftaran" description="Penerimaan mahasiswa baru dibuka dalam 3 gelombang." align="center" />
        
        <AdmissionCalendar schedules={jadwalData} />

        <div className="mt-12 p-8 bg-secondary/5 rounded-xl text-center border">
          <h3 className="text-xl font-bold mb-4">Siap Mendaftar?</h3>
          <p className="text-muted-foreground mb-6">Pastikan Anda telah membaca prosedur dan mempersiapkan dokumen yang dibutuhkan.</p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/admisi/prosedur">Lihat Prosedur</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admisi/persyaratan">Lihat Persyaratan</Link>
            </Button>
          </div>
        </div>
      </PageContainer>
    </>
  )
}
