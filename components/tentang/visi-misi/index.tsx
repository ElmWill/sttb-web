import React from "react";
import { PageHero } from "@/components/shared/PageHero";
import { PageContainer } from "@/components/layouts/PageContainer";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Lightbulb, Compass } from "lucide-react";

export default function VisiMisiFeature() {
  return (
    <>
      <PageHero
        title="Visi & Misi"
        description="Fondasi dan Arah Pelayanan Kami"
      />
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary/10 text-primary rounded-xl">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold">Visi</h2>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              &quot;Menjadi institusi pendidikan teologi yang mempersiapkan{" "}
              <span className="italic">pastor-scholar</span> yang transformatif
              dan memberdayakan seluruh umat Allah untuk menghadirkan Injil
              seutuhnya di tengah konteks masyarakat urban&quot;
            </p>
          </div>
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-secondary/10 text-secondary rounded-xl">
                <Compass className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold">Misi</h2>
            </div>
            <ul className="space-y-4 text-muted-foreground list-disc pl-5">
              <li>
                Mempersiapkan <span className="italic">pastor-scholar</span>{" "}
                yang transformatif untuk melayani dalam konteks urban.
              </li>
              <li>
                Memberdayakan seluruh umat Allah untuk menghadirkan Injil
                seutuhnya di tengah konteks masyarakat urban melalui penelitian
                dan penididikan non-formal.
              </li>
              <li>
                Mengembangkan tim dosen, struktur organisasi dan keuangan, serta
                kemitraan untuk mendukung pencapaian visi STTB.
              </li>
            </ul>
          </div>
        </div>

        <SectionHeader title="Core Values" align="center" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="text-center p-6 bg-muted/50">
            <h3 className="text-xl font-bold mb-2">CHRIST-CENTERED</h3>
            <p className="text-sm text-muted-foreground">
              <ul className="space-y-4 text-muted-foreground list-disc pl-5 text-left">
                <li>
                  Rencana keselamatan Allah atas seisi dunia yg berpusat di
                  dalam karya penebusan Kristus.
                </li>
                <li>
                  Mandat budaya dan mandat Injil dalam kerangka metanarasi
                  Alkitab: Penciptaan-Kejatuhan-Penebusan-Penggenapan.
                </li>
              </ul>
            </p>
          </Card>
          <Card className="text-center p-6 bg-muted/50">
            <h3 className="text-xl font-bold mb-2">TEKS-KONTEKS</h3>
            <p className="text-sm text-muted-foreground">
              <ul className="space-y-4 text-muted-foreground list-disc pl-5 text-left">
                <li>
                  Setia kepada teks: Firman Tuhan dan warisan iman Bapa-bapa
                  Gereja.
                </li>
                <li>Responsif terhadap konteks: sosial dan generasional.</li>
              </ul>
            </p>
          </Card>
          <Card className="text-center p-6 bg-muted/50">
            <h3 className="text-xl font-bold mb-2 break-words">
              PENATALAYANAN
            </h3>
            <p className="text-sm text-muted-foreground">
              <ul className="space-y-4 text-muted-foreground list-disc pl-5 text-left">
                <li>
                  Integritas (kejujuran, transparansi, akuntabilitas - waktu,
                  uang, relasi)
                </li>
                <li>
                  Dedikasi (melayani dan mengupayakan yang terbaik bagi sesama)
                </li>
                <li>
                  Kompetensi (kecakapan akademik, pelayanan, dan penelitian)
                </li>
              </ul>
            </p>
          </Card>
          <Card className="text-center p-6 bg-muted/50">
            <h3 className="text-xl font-bold mb-2">TRANSFORMATIF</h3>
            <p className="text-sm text-muted-foreground">
              Karya penebusan Kristus yg transformatif dialami oleh semua stake
              holder STTB (mahasiswa, dosen, staf, karyawan, yayasan, mitra
              pelayanan, gereja, dan masyarakat)
            </p>
          </Card>
        </div>
      </PageContainer>
    </>
  );
}
