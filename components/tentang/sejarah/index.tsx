import React from "react"
import { PageHero } from "@/components/shared/PageHero"
import { PageContainer } from "@/components/layouts/PageContainer"
import { Card, CardContent } from "@/components/ui/card"

const EraTimeline = ({ year, title, description }: { year: string, title: string, description: string }) => (
  <div className="relative pl-8 sm:pl-32 py-6 group">
    <div className="font-bold text-2xl text-primary mb-1 sm:mb-0 sm:absolute left-0 top-6 sm:w-28 sm:text-right">{year}</div>
    <div className="absolute left-[15px] sm:left-[118px] top-8 w-3 h-3 bg-primary rounded-full ring-4 ring-background z-10" />
    <div className="absolute left-[20px] sm:left-[123px] top-8 bottom-[-24px] w-0.5 bg-border group-last:bottom-auto group-last:h-full" />
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  </div>
)

export default function SejarahFeature() {
  return (
    <>
      <PageHero title="Sejarah STTB" description="Perjalanan panjang pembentukan hamba Tuhan." />
      <PageContainer className="max-w-4xl">
        <div className="space-y-2">
          <EraTimeline 
            year="1992" 
            title="Awal Mula Pendirian" 
            description="Dimulai dari sebuah kelompok doa kecil yang memiliki beban untuk literatur Kristen dan pendidikan teologi." 
          />
          <EraTimeline 
            year="1998" 
            title="Peresmian STTB" 
            description="Sekolah Tinggi Teologi Bandung resmi didirikan dan memulai perkuliahan angkatan pertama untuk program Sarjana Teologi." 
          />
          <EraTimeline 
            year="2005" 
            title="Pengembangan Program Studi" 
            description="Membuka program Pascasarjana (Magister) untuk menanggapi kebutuhan gereja yang semakin kompleks." 
          />
          <EraTimeline 
            year="2015" 
            title="Akreditasi Kampus" 
            description="Memperoleh akreditasi institusi dari BAN-PT dan terus meningkatkan fasilitas perpustakaan serta asrama." 
          />
          <EraTimeline 
            year="Sekarang" 
            title="Era Modern" 
            description="Menjadi salah satu sekolah teologi ternama di Indonesia dengan berbagai program unggulan dan sistem terintegrasi digital." 
          />
        </div>
      </PageContainer>
    </>
  )
}
