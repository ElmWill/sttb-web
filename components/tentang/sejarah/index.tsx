import React from "react";
import { PageContainer } from "@/components/layouts/PageContainer";
import { Card, CardContent } from "@/components/ui/card";
import { usePageDetail } from "@/hooks/usePageData";

const EraTimeline = ({
  year,
  title,
  description,
}: {
  year: string;
  title: string;
  description: string;
}) => (
  <div className="relative pl-8 sm:pl-32 py-6 group">
    <div className="font-bold text-2xl text-primary mb-1 sm:mb-0 sm:absolute left-0 top-6 sm:w-28 sm:text-right">
      {year}
    </div>
    <div className="absolute left-[15px] sm:left-[118px] top-8 w-3 h-3 bg-primary rounded-full ring-4 ring-background z-10" />
    <div className="absolute left-[20px] sm:left-[123px] top-8 bottom-[-24px] w-0.5 bg-border group-last:bottom-auto group-last:h-full" />
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  </div>
);

export default function SejarahFeature() {
  const { page, isLoading } = usePageDetail("sejarah");

  return (
    <>
      <PageContainer className="max-w-4xl">
        {isLoading ? (
          <div className="py-20 text-center text-muted-foreground transition-all animate-pulse">Memuat Sejarah...</div>
        ) : page ? (
          <div className="prose prose-sttb max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: page.content }} />
        ) : (
          <div className="space-y-2">
            <EraTimeline
              year=""
              title="1992 - 1998"
              description="Pdt. Caleb Tong. Pdt. Joseph Tong, dan Pdt. Dorothy I. Marx mendirikan STTB pada tahun 1992 dengan tujuan menghasilkan Pastor-Scholar yg memiliki kerangka teologı Reformed Injili dalam konteks pekerjaan Tuhan di Indonesia. Pdt. Daniel Lucas Lukito sebagai Dekan Akademik pertama banyak berperan dalam meletakkan kerangka dasar pembangunan STTB. Pembukaan STTB disiapkan sangat baik dengan jajaran dosen yang berkualitas. Komitmen untuk mengejar kualitas akademis yg tinggi didukung juga oleh perpustakaan yang memiliki koleksi buku dan jurnal yang sangat memadai, serta penerbitan Jurnal Teologi STULOS dalam versi Bahasa Indonesia dan Inggris. Pada tahun-tahun pertama diselenggarakan acara dengan lingkup nasiỗnal yaitu Ferakristal (Festival Remaja Kristen Pencinta Alkitab). Wisuda pertama diadakan pada tahun 1996."
            />
            <EraTimeline
              year=""
              title="1998 - 2005"
              description='STTB mengalami pergantian pemimpin dan jajaran dosen. Ibu Dorothy I. Marx menjabat sebagai Rektor dan STTB terus melanjutkan kiprahnya atas anugerah Tuhan dengan membuka program-program studi baru: M.A. (Master of Arts/Magister Artium) untuk memperlengkapi kaum awam dan M.Th. (Master of Theology/Magister Teologi) untuk memperlengkapi para hamba luhan yang rindu berkiprah di dunia akademis. Asrama dosen dibangun bersebelahan dengan asrama mahasiswa. STTB berkomitmen menerbitkan seri buku "Sola..." dan menyelenggarakan acara nasional bagi pemuda dengan nama CYLF (Christian Youth Leadership Forum).'
            />
            <EraTimeline
              year=""
              title="2006 -2010"
              description="Perkembangan STTB berlanjut dalam kepemimpinan Pdt. Joseph Tong yang berkomitmen meningkatkan kualifikasi tenaga pengajar dengan mengutus beberapa dosen untuk studi lanjut di USA. Pada periode ini terbit dua buku Seri Sola, yaitu Sola Scriptura dan Sola Fide. Dalam periode ini STTB membuka program studi berbahasa Mandarin (S.Th., M.Div., dan M.A.) sebagai kontribusinya dalam pelayanan misi di Tiongkok. Untuk itu 2 dosen yaitu Pdt. Lee Ching Yen dan Pdt. Joseph Lin dart lalwan diundang mengajar para mahasiswa yang datang dari Tiongkok."
            />
            <EraTimeline
              year=""
              title="2011 - 2016"
              description="Periode ini ditandai dengan beberapa perkembangan yang signifikan. Pdt. Agus Gunawan melanjutkan kepemimpinan sebagai Rektor. Pada tahun 2011, STTB hadir dengan wajah baru dengan dibangunnya gedung baru berlantai tujuh yang saat ini difungsikan untuk ruang-ruang kelas, kantor dosen dan staf, asrama mahasiswa, aula, dan perpustakaan. Buku ketiga dan keempat dari Seri Sola (Sola Gratia dan Solus Christos) diterbitkan. Pada periode ini juga beberapa orang di jajaran pimpinan melanjutkan studi doktoral di Asia and Amerika. Tahun 2012 dibuka prodi baru S.Pd.K. (Sarjana Pendidikan Kristen) bersama dengan prodi M.Min. (Magistet Ministri). Selanjutnya, pada tahun 2015, STTB juga menambah program studi M.Pd.K. (Magister Pendidikan Kristen), yang dirancang untuk memperlengkapi para pemimpin pendidikan Kristen. Dalam periode ini beberapa program studi sudah mulai terakreditasi oleh BAN-PT (Badan Akreditasi Nasional Perguruan Tinggi) dan ATA (Asian Theological Association). Selain itu juga STTB memperluas jejaring global yang ditandai dengan kehadiran beberapa orang dosen dari Inggris, India, dan Filipina, yang sangat mendukung program M.Th. yang diselenggarakan dalam Bahasa Inggris."
            />
            <EraTimeline
              year=""
              title="2017 - 2022"
              description="Periode ini diwarnai oleh pembenahan kualitas dan penajaman arah pengembangan program-program studi formal dan non-formal sesuai visi dan keunikan panggilan STTB. Formasi spiritualitas yg berkualitas dan terintegrasi antara kelas, kapel, kelompok pastoral, asrama, pemuridan, hingga mentoring dalam praktek pelayanan mengokohkan proses pembentukan untuk mahasiswa STh dan SPd untuk kesiapan mereka melayani. Komitmen STTB kepada dunia pendidikan kristen makin mendapat apresiasi luas melalui perkembangan program studi Magister Pendidikan, inisiasi tumbuhnya komunitas Indonesian Forum for Christian Educators (IFCE), dan kontribusi para dosen STTB dalam berbagai forum nasional. Demikian juga komitmen STTB untuk mengembangkan pendidikan teologi yang aplikatif dan transformatif mendapatkan sambutan yg positif melalui perkembangan program studi MTh yang berfokus pada Transformasi Budaya dan Masyarakat dan program studi MMin Marketplace untuk memperlengkapi profesional Kristen bermisi di dunia kerja. Sementara itu dua program MMin juga berlangsung dalam periode ini, yaitu MMin Music Leadership (bekerja sama dengan Singapore Bible College) dan MMin Pastoral Leadership. Pendidikan nonformal makin berkembang dengan budaya digital yg tumbuh pesat selama masa pandemi. Melalui pengembangan pusat studi non-formal (LEAD Center) dikembangkan modul-modul pembinaan Vocatio (marketplace), Perspectives (misi), dan materi-materi pembinaan digital yg dapat diakses melalui media sosial. Pengembangan penelitian ditandai dengan publikasi ilmiah berupa seri webinar berkala Conversation That Matters (CTM) dan penerbitan monograf untuk tesis-tesis master yg terpilih karena kualitas dan relevansinya bagi pelayanan di lapangan. Mengingat besarnya dan luasnya pekerjaan yg harus dilakukan, maka kolaborasi dan sinergi dengan berbagai gereja dan lembaga secara nasional dan global yg sejalan dengan visi STTB makin dikembangkan dalam periode ini. Dalam periode ini kepemimpinan STTB mengalami beberapa kali peralihan, yaitu Pdt Chandra Koewoso sebagai Ketua sejak Agustus 2017, dan selanjutnya Sutrisna Harjanto PhD sebagai Ketua sejak Agustus 2019 hingga saat ini."
            />
          </div>
        )}
      </PageContainer>
    </>
  );
}
