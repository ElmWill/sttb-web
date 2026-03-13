import React from "react";
import { PageContainer } from "@/components/layouts/PageContainer";
import { Card, CardContent } from "@/components/ui/card";

const ImanItem = ({ title, desc }: { title: string; desc: string }) => (
  <Card className="h-full border-primary/20 hover:border-primary/50 transition-colors">
    <CardContent className="p-6">
      <h3 className="font-bold text-lg mb-3 text-primary">{title}</h3>
      <p className="text-muted-foreground">{desc}</p>
    </CardContent>
  </Card>
);

export default function PengakuanImanFeature() {
  return (
    <>
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ImanItem
            title="1. KAMI PERCAYA"
            desc="bahwa Alkitab secara keseluruhan, Perjanjian Lama dan Perjanjian Baru, adalah Firman Allah yang diwahyukan dan diilhamkan tanpa kesalahan. Oleh karena itu, Alkitab adalah sumber ototritas tertinggi bagi ian dan kehidupan orang percaya di segala abad dan tempat."
          />
          <ImanItem
            title="2. KAMI PERCAYA"
            desc="bahwa Allah adalah Esa dan kekal, Mhakudus, dan penuh rahmat. Ia adalah pencipta, penguasa, dan pemelihara alam semesta beserta segala isinya, Tritunggal sebagai Bapa, Anak, dan Roh Kudus. Masing-masing adalah Probadi yang tidak diciptakan, sehakekat, dan setara dalam kuasa dan kemuliaan. Ia berdaulat baik dalam keselamatan maupun dalam penghakiman umat manusia."
          />
          <ImanItem
            title="3. KAMI PERCAYA"
            desc="bahwa manusia, laki-laki dan perempuan, telah diciptakan oleh Allah menurut gambar-Nya, yang telah dimahkotai-Nya dengan kemuliaan serta mandat untuk memenuhi bumi, mengelola dan memelihara seluruh ciptaan-Nya. Tetapi manusia telah jatuh ke dalam dosa, terpisah dari
Allah, dan kehilangan kemampuan untuk hidup sesuai dengan citranya sebagai ciptaan Allah, sehingga tidak mampu menyelamatkan dirinya sendiri."
          />
          <ImanItem
            title="4. KAMI PERCAYA"
            desc="bahwa Yesus Kristus adalah
Anak Tunggal Allah, Allah sejati dan Manusia sejati, penebus dan satu-satunya jalan
keselamatan bagi seluruh umat
manusia. la dikandung dari Roh Kudus, lahir dari anak dara
Maria, hidup tanpa dosa, sempurna dalam pengprbanan dan kasih. la mati di atas kayu salib, bangkit kembali dari antara orang mati dalam tubuh kebangkitan yang nyata, naik ke sorga, duduk di sebelah kanan Allah Bapa, menjadi Imam Besar Agung bagi orang percaya, dan pengantara tunggal antara Allah dan manusia, serta Raja di atas segala raja."
          />
          <ImanItem
            title="5. KAMI PERCAYA"
            desc="bahwa Roh Kudus adalah Allah yang hidup, yang menginsafkan manusia akan dosa, kebenaran,
dan penghakiman. la melahirbarukan orang berdosa yang percaya, mendiami, menguduskan, dan memberi kuasa serta karunia-karunia kepada setiap orang percaya menurut kehendak-Nya demi kesaksian, persekutuan, dan pelayanan untuk pembangunan tubuh Kristus."
          />
          <ImanItem
            title="6. KAMI PERCAYA"
            desc="bahwa manusia hanya dapat
diselamatkan oleh kasih
karunia melalui penebusan
oleh Tuhan Yesus Kristus dan
dibenarkan melalui iman, tanpa jasa, usaha, ataupun kesalehan dari pihak manusia.
Melalui penyelamatan Allah
dalam Kristus, gambar Allah pada manusia dipulihkan.
Dengan demikian, manusia dimampukan untuk menjalani kehidupan yang penuh tanggung jawab dalam pengabdian dan kasih di hadapan Allah dan manusia."
          />
          <ImanItem
            title="7. KAMI PERCAYA"
            desc="bahwa Gereja selaku garam
dan terang dunia adalah
himpunan semua orang
percaya dari segala abad dan
bangsa. la adalah tubuh Kristus
yang kudus dan Am, dengan Kristus sebagai Kepalanya.
Gereja memberitakan Kerajaan
Allah melalui kebaktian, pengajaran, sakramen baptisan dan perjamuan kudus, serta pemberitaan Injil dan misi umat Allah seutuhnya di tengah dunia."
          />
          <ImanItem
            title="8. KAMI PERCAYA"
            desc="bahwa kepastian kedatangan
kembali Yesus Kristus secara
nyata dan pribadi akan terjadi
pada akhir zaman untuk
menjemput umat-Nya untuk
menghakimi seluruh umat
manusia, baik yang hidup maupun yang mati. Pada kedatangan-Nya kedua kali itulah setiap orang mati akan dibangkitkan, orang percaya masuk ke dalam kehidupan yang kekal, orang yang tidak percaya masuk ke dalam kebinasaan yang kekal."
          />
        </div>
      </PageContainer>
    </>
  );
}
