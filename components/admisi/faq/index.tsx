import React from "react"
import { PageContainer } from "@/components/layouts/PageContainer"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

const faqs = [
  { q: "Kapan pendaftaran STTB dibuka?", a: "Pendaftaran mahasiswa baru dibuka dalam tiga gelombang setiap tahunnya, biasanya dimulai pada bulan Januari hingga Agustus. Silakan kunjungi halaman Jadwal Admisi untuk tanggal spesifik tahun ajaran ini." },
  { q: "Apakah ada batas usia maksimal untuk mendaftar?", a: "Untuk program Sarjana Teologi Reguler, batas usia maksimal pendaftar adalah 35 tahun. Namun, program Pascasarjana tidak memiliki batasan usia khusus." },
  { q: "Apakah STTB menyediakan beasiswa?", a: "Ya, kami menyediakan beberapa program beasiswa berdasarkan prestasi akademik dan kebutuhan finansial. Detail program dan syaratnya bisa dilihat di halaman Beasiswa pada menu Keuangan." },
  { q: "Apakah semua mahasiswa S1 wajib tinggal di asrama?", a: "Ya. Tinggal di asrama adalah bagian dari kurikulum pembinaan karakter selama dua tahun pertama bagi mahasiswa S1 Teologi." },
  { q: "Apakah saya perlu rekomendasi gereja untuk mendaftar S2?", a: "Ya, rekomendasi gereja tetap diwajibkan sebagai bukti pelayanan Anda di dalam jemaat lokal, baik untuk S1 maupun S2." },
]

export default function FaqFeature() {
  return (
    <>
      <PageContainer className="max-w-3xl">
        <Card>
          <CardContent className="p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </PageContainer>
    </>
  )
}
