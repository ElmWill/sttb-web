import React from "react"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { PageContainer } from "@/components/layouts/PageContainer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const CampusLife = () => {
  return (
    <PageContainer>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHeader 
            title="Kehidupan Kampus" 
            description="Lingkungan belajar yang asri dan kondusif untuk pertumbuhan rohani."
          />
          <div className="space-y-6 text-muted-foreground">
            <p>
              STTB tidak hanya fokus pada keunggulan akademis, tetapi juga pada pembentukan karakter dan kerohanian melalui berbagai fasilitas dan program pembinaan yang komprehensif.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="mr-3 mt-1 h-2 w-2 bg-primary rounded-full shrink-0" />
                <span>Asrama putra dan putri dengan fasilitas lengkap</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-1 h-2 w-2 bg-primary rounded-full shrink-0" />
                <span>Perpustakaan digital dan ruang baca yang nyaman</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-1 h-2 w-2 bg-primary rounded-full shrink-0" />
                <span>Pembinaan rohani rutin dan kapel</span>
              </li>
            </ul>
            <Button className="mt-4" asChild>
              <Link href="/kehidupan-kampus">Jelajahi Fasilitas</Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 h-[400px]">
          {/* Image placeholders */}
          <div className="bg-secondary/20 rounded-xl rounded-tr-[4rem] flex-1 w-full h-full relative overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/campus/PerpustakaanUtama.png')" }} />
          </div>
          <div className="bg-primary/20 rounded-xl rounded-bl-[4rem] flex-1 w-full h-full relative overflow-hidden mt-8">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/campus/Ruang kelas.png')" }} />
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
