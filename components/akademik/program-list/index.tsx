import React from "react"
import { PageHero } from "@/components/shared/PageHero"
import { PageContainer } from "@/components/layouts/PageContainer"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const programs = [
  { slug: "sarjana-teologi", title: "Sarjana Teologi", desc: "Mempersiapkan pelayan Tuhan dalam kependetaan dan institusi." },
  { slug: "sarjana-pendidikan-kristen", title: "Sarjana Pendidikan Kristen", desc: "Mendidik tenaga pengajar Kristen yang terampil dan berdedikasi." },
  { slug: "magister-teologi-pelayanan-pastoral-gereja-urban", title: "Magister Teologi Pelayanan Pastoral Gereja Urban", desc: "Pengembangan pelayanan di tengah konteks masyarakat perkotaan." },
  { slug: "magister-teologi-transformasi-budaya", title: "Magister Teologi Transformasi Budaya dan Masyarakat", desc: "Kajian teologi dalam menyikapi perubahan sosial budaya." },
  { slug: "magister-pendidikan-kristen", title: "Magister Pendidikan Kristen", desc: "Program lanjutan untuk kepemimpinan sekolah Kristen." },
  { slug: "magister-ministry-marketplace", title: "Magister Ministry Marketplace", desc: "Membekali profesional untuk melayani di dunia kerja." },
  { slug: "magister-ministry-kepemimpinan-pastoral", title: "Magister Ministry Kepemimpinan Pastoral", desc: "Fokus pada pengembangan kepemimpinan dan manajemen gereja." },
  { slug: "magister-ministry-teologi-pelayanan-gerejawi", title: "Magister Ministry Teologi Pelayanan Gerejawi", desc: "Studi komprehensif untuk pelayan tertahbis." },
]

export default function ProgramListFeature() {
  return (
    <>
      <PageHero title="Program Akademik" description="Pilihan program studi S1 dan S2 di Sekolah Tinggi Teologi Bandung." />
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map(p => (
            <Card key={p.slug} className="flex flex-col h-full hover:shadow-md transition-shadow hover:border-primary/50">
              <CardHeader>
                <CardTitle className="text-xl">{p.title}</CardTitle>
                <CardDescription className="text-base">{p.desc}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-4">
                <Button className="w-full" variant="outline" asChild>
                  <Link href={`/akademik/${p.slug}`}>Lihat Detail Program</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageContainer>
    </>
  )
}
