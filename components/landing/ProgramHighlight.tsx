import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { PageContainer } from "@/components/layouts/PageContainer"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen } from "lucide-react"
import Link from "next/link"

const programs = [
  {
    title: "Sarjana Teologi",
    description: "Program S1 untuk mempersiapkan hamba Tuhan dalam pelayanan penggembalaan dan pengajaran.",
    slug: "sarjana-teologi"
  },
  {
    title: "Sarjana Pendidikan Kristen",
    description: "Membentuk pendidik Kristen yang alkitabiah dan profesional untuk sekolah maupun gereja.",
    slug: "sarjana-pendidikan-kristen"
  },
  {
    title: "Magister Pendidikan Agama Kristen",
    description: "Program magister untuk pengembangan kepemimpinan dan pendidikan Kristen",
    slug: "magister-pendidikan-agama-kristen"
  }
]

export const ProgramHighlight = () => {
  return (
    <PageContainer>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <SectionHeader 
          title="Program Akademik Unggulan" 
          description="Pilih program studi yang sesuai dengan panggilan pelayanan Anda."
          className="mb-0"
        />
        <Button variant="ghost" className="mt-4 md:mt-0 flex items-center gap-2" asChild>
          <Link href="/akademik">
            Lihat Semua Program <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {programs.map((program, idx) => (
          <Card key={idx} className="hover:shadow-md transition-shadow h-full flex flex-col">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <CardTitle>{program.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <CardDescription className="text-base text-muted-foreground mb-6">
                {program.description}
              </CardDescription>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/akademik/${program.slug}`}>Pelajari Lebih Lanjut</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  )
}
