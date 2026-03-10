import React, { useMemo } from "react"
import { PageContainer } from "@/components/layouts/PageContainer"
import { ProgramHeader } from "./ProgramHeader"
import { ProgramInfo } from "./ProgramInfo"
import { RequirementSection } from "./RequirementSection"
import { StudySystemSection } from "./StudySystemSection"
import { CourseTable, CourseGroup } from "./CourseTable"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const programMockDb: Record<string, any> = {
  "sarjana-teologi": {
    title: "Sarjana Teologi",
    description: "Mempersiapkan pelayan Tuhan untuk melayani di gereja lokal dan memimpin pelayanan pastoral.",
    credits: 144,
    duration: "4 Tahun / 8 Semester",
    degree: "S.Th.",
    requirements: [
      "Mengisi formulir pendaftaran",
      "Fotokopi Ijazah/STTB SMA/SMK yang dilegalisir",
      "Fotokopi KTP dan Akte Kelahiran",
      "Surat rekomendasi Gereja",
      "Lulus ujian seleksi masuk",
      "Surat Kesaksian Pertobatan"
    ],
    system: "Sistem Reguler / Tatap Muka",
    systemDesc: "Perkuliahan diselenggarakan secara tatap muka dari hari Senin hingga Jumat. Mahasiswa diwajibkan tinggal di asrama untuk pembinaan kerohanian intensif.",
    categories: [
      {
        category: "Teologi Biblika",
        courses: [
          { name: "Pengantar Perjanjian Lama 1", credits: 2 },
          { name: "Pengantar Perjanjian Baru", credits: 3 },
          { name: "Hermeneutik", credits: 3 },
        ]
      },
      {
        category: "Teologi Sistematika",
        courses: [
          { name: "Kristologi", credits: 2 },
          { name: "Doktrin Allah", credits: 2 },
          { name: "Eskatologi", credits: 2 },
        ]
      }
    ] as CourseGroup[]
  }
}

export default function ProgramDetailFeature({ programSlug }: { programSlug: string }) {
  const data = useMemo(() => {
    return programMockDb[programSlug] || {
      title: "Program Tidak Ditemukan",
      description: "Mohon maaf data program studi belum tersedia untuk ID ini.",
      credits: 0,
      duration: "-",
      degree: "-",
      requirements: [],
      system: "-",
      systemDesc: "-",
      categories: []
    }
  }, [programSlug])

  return (
    <>
      <ProgramHeader title={data.title} description={data.description} />
      <PageContainer className="max-w-4xl">
        <ProgramInfo credits={data.credits} duration={data.duration} degree={data.degree} />
        
        {data.requirements.length > 0 && (
          <RequirementSection requirements={data.requirements} />
        )}
        
        {data.system !== "-" && (
          <StudySystemSection system={data.system} description={data.systemDesc} />
        )}
        
        {data.categories.length > 0 && (
          <CourseTable categories={data.categories} />
        )}

        <div className="mt-12 text-center p-8 bg-muted rounded-xl border">
          <h3 className="text-xl font-bold mb-4">Tertarik Mengambil Program Ini?</h3>
          <p className="text-muted-foreground mb-6">Jadwal gelombang admisi saat ini terbuka. Segera daftarkan diri Anda.</p>
          <Button size="lg" asChild>
            <Link href="/admisi/prosedur">Daftar Sekarang</Link>
          </Button>
        </div>
      </PageContainer>
    </>
  )
}
