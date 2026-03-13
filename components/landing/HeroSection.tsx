import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const HeroSection = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center bg-secondary text-white overflow-hidden">
      {/* Background Image Placeholder */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/misc/Image (background hero STTB).png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/40 z-10" />
      
      <div className="container mx-auto px-4 z-20">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Membangun Pelayan Tuhan yang Berintegritas
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Sekolah Tinggi Teologi Bandung berkomitmen untuk memperlengkapi setiap pribadi menjadi hamba Tuhan yang siap melayani di berbagai bidang dengan landasan teologi yang kuat.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="text-lg">
              <Link href="/admisi/prosedur">Daftar Sekarang</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 text-lg" asChild>
              <Link href="/akademik">Lihat Program Studi</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
