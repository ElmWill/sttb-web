import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import { ContentList } from "@/components/shared/ContentList"

const mockKegiatan = [
  { slug: "donor-darah", title: "Aksi Sosial Donor Darah 2024", excerpt: "Kerjasama STTB dengan PMI Kota Bandung.", date: "05 Nov 2024", image: "/placeholders/kegiatan-1.jpg" },
  { slug: "kunjungan-panti", title: "Kunjungan & Pelayanan Panti Asuhan", excerpt: "Diadakan oleh Mahasiswa S1 Tingkat 2.", date: "15 Sep 2024", image: "/placeholders/kegiatan-2.jpg" },
]

export default function Kegiatan() {
  return (
    <>
      <Head><title>Kegiatan Kampus | {AppSettings.appName}</title></Head>
      <ContentList 
        title="Kegiatan Kampus" 
        description="Dokumentasi aktivitas akademik maupun non-akademik di STTB." 
        basePath="kegiatan" 
        items={mockKegiatan} 
      />
    </>
  )
}

Kegiatan.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
