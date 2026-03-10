import React from "react"
import { PageHero } from "@/components/shared/PageHero"
import { PageContainer } from "@/components/layouts/PageContainer"
import { SectionHeader } from "@/components/shared/SectionHeader"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const PriceTable = ({ title, items }: { title: string, items: {desc: string, amount: string}[] }) => (
  <div className="mb-10 w-full overflow-hidden border rounded-xl bg-card">
    <div className="bg-primary/5 px-6 py-4 border-b">
      <h3 className="text-xl font-bold text-primary">{title}</h3>
    </div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[70%]">Keterangan Biaya</TableHead>
          <TableHead className="w-[30%] text-right">Nominal (Rp)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, idx) => (
          <TableRow key={idx}>
            <TableCell className="font-medium">{item.desc}</TableCell>
            <TableCell className="text-right text-muted-foreground">{item.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
)

export default function BiayaStudiFeature() {
  const biayaS1 = [
    { desc: "Pendaftaran (Sekali)", amount: "350.000" },
    { desc: "Pengembangan Pendidikan (Sekali)", amount: "7.000.000" },
    { desc: "BPP Pokok (Per Semester)", amount: "3.500.000" },
    { desc: "BPP SKS (Per Semester, asumsi 20 SKS x 100rb)", amount: "2.000.000" },
    { desc: "Biaya Asrama (Per Bulan)", amount: "1.200.000" },
  ]
  const biayaS2 = [
    { desc: "Pendaftaran (Sekali)", amount: "500.000" },
    { desc: "Matrikulasi (Jika ada, per SKS)", amount: "150.000" },
    { desc: "BPP Pokok (Per Semester)", amount: "5.500.000" },
    { desc: "BPP SKS (Per Semester, asumsi 12 SKS x 250rb)", amount: "3.000.000" },
  ]

  return (
    <>
      <PageHero title="Biaya Studi" description="Informasi investasi pendidikan untuk berbagai jenjang di STTB." />
      <PageContainer className="max-w-4xl">
        <SectionHeader title="Rincian Komponen Biaya" description="Berikut adalah estimasi rincian biaya resmi untuk tahun akademik berjalan." align="center" />
        <PriceTable title="Program Sarjana (S1)" items={biayaS1} />
        <PriceTable title="Program Magister (S2)" items={biayaS2} />
        
        <div className="mt-8 p-6 text-sm text-muted-foreground bg-muted/50 rounded-lg">
          <p className="font-bold mb-2 text-foreground">Catatan Penting:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Biaya di atas adalah estimasi dan dapat berubah sesuai kebijakan Yayasan.</li>
            <li>Biaya pendaftaran dan pengembangan pendidikan tidak dapat ditarik kembali jika mahasiswa mengundurkan diri.</li>
            <li>Tersedia bantuan keringanan dan beasiswa bagi mahasiswa yang memenuhi syarat (lihat menu Beasiswa).</li>
          </ul>
        </div>
      </PageContainer>
    </>
  )
}
