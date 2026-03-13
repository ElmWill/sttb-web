import React from "react"
import { PageContainer } from "@/components/layouts/PageContainer"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { Card, CardContent } from "@/components/ui/card"

type LecturerProfile = {
  name: string
  role: string
  bidang?: string
  degrees: string[]
}

const photoByName: Record<string, string> = {
  "Sutrisna Harjanto": "/images/lecturers/Sutrisna Harjanto.png",
  "Tan Giok Lie": "/images/lecturers/Tan Giok Lie.png",
  "Wemmy Prayogo": "/images/lecturers/Wemmy Prayogo.png",
  "Johan Setiawan": "/images/lecturers/Johan Setiawan.png",
  "Ferry Herlianto": "/images/lecturers/Ferry Herlianto.png",
  "Dwi Maria Handayani": "/images/lecturers/Dwi Maria Handayani.png",
  "Sarinah Lo": "/images/lecturers/Sarinah Lo.png",
  "Heriyanto": "/images/lecturers/Heriyanto.png",
  "Kristian Kusumawardana": "/images/lecturers/Kristian Kusumawardana.png",
  "Joseph Tong": "/images/lecturers/Joseph Tong.png",
  "Herlise Y Sagala": "/images/lecturers/Herlise Y Sagala.png",
  "Agus Gunawan": "/images/lecturers/Agus Gunawan.png",
  "Chandra Koewoso": "/images/lecturers/Chandra Koewoso.png",
  "Budiyanto Santosa": "/images/lecturers/Budiyanto Santosa.png",
  "Philip Djung": "/images/lecturers/Philip Djung.png",
  "Doroti Tunggal Widjaja": "/images/lecturers/Doroti Tunggal widjaja.png",
  "Amy Iwani": "/images/lecturers/Amy Iwani.png",
  "Grace Emilia": "/images/lecturers/Grace Emilia.png",
  "Winarsih": "/images/lecturers/Winarsih.png",
}

const fallbackPhotos = [
  "/images/lecturers/Sutrisna Harjanto.png",
  "/images/lecturers/Tan Giok Lie.png",
  "/images/lecturers/Wemmy Prayogo.png",
  "/images/lecturers/Johan Setiawan.png",
  "/images/lecturers/Joseph Tong.png",
  "/images/founders/CalebTong.png",
  "/images/founders/JosephTong.png",
  "/images/founders/Dorothy.png",
]

const getLecturerPhoto = (name: string, index: number) => {
  return photoByName[name] ?? fallbackPhotos[index % fallbackPhotos.length]
}

const toBackgroundImage = (path: string) => `url("${encodeURI(path)}")`

const LecturerCard = ({ lecturer, image }: { lecturer: LecturerProfile, image: string }) => (
  <Card className="overflow-hidden border-transparent shadow-md hover:shadow-lg transition-all h-full">
    <div className="h-[300px] w-full bg-cover bg-center bg-muted" style={{ backgroundImage: toBackgroundImage(image) }} />
    <CardContent className="p-5 bg-card z-10 relative space-y-3">
      <div>
        <h3 className="font-bold text-lg leading-tight">{lecturer.name}</h3>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{lecturer.role}</p>
      </div>
      {lecturer.bidang && <p className="text-sm text-primary font-medium">Bidang: {lecturer.bidang}</p>}
      <ul className="space-y-1.5 text-sm text-muted-foreground list-disc pl-5">
        {lecturer.degrees.map((degree) => (
          <li key={degree}>{degree}</li>
        ))}
      </ul>
    </CardContent>
  </Card>
)

export default function DewanDosenFeature() {
  const pimpinan: LecturerProfile[] = [
    {
      name: "Sutrisna Harjanto",
      role: "Ketua",
      bidang: "Pendidikan, Biblika, Marketplace",
      degrees: [
        "Ph.D. Trinity International University Illinois, USA",
        "M.Div. Trinity Theological College Singapore",
        "S.Farm. Universitas Padjadjaran, Bandung",
      ],
    },
    {
      name: "Tan Giok Lie",
      role: "Wakil Ketua I Akademik",
      bidang: "Pendidikan",
      degrees: [
        "Ed.D. Biola University Talbot School of Theology, USA",
        "M.A. Institut Alkitab Tiranus Bandung",
        "S.S. Universitas Kristen Maranatha Bandung",
      ],
    },
    {
      name: "Wemmy Prayogo",
      role: "Wakil Ketua II Administrasi & Keuangan",
      bidang: "Pendidikan",
      degrees: [
        "M.Ed. Monash University Australia",
        "S.Pd. Universitas Kristen Satya Wacana Salatiga",
      ],
    },
    {
      name: "Johan Setiawan",
      role: "Wakil Ketua III Kemahasiswaan",
      bidang: "Biblika & Praktika",
      degrees: [
        "M.Th. Sekolah Tinggi Teologi Bandung",
        "M.C.M. Discipleship Training Centre (DTC) Singapore",
        "S.Psi. Universitas Gadjah Mada (UGM) Yogyakarta",
      ],
    },
  ]

  const ketuaProgramStudi: LecturerProfile[] = [
    {
      name: "Ferry Herlianto",
      role: "Ketua Program Studi S.Pd.",
      bidang: "Pendidikan dan Praktika",
      degrees: [
        "M.Th. STA Tiranus",
        "S.Th. STT Tawangmangu",
      ],
    },
    {
      name: "Dwi Maria Handayani",
      role: "Ketua Program Studi M.Th.",
      bidang: "Biblika dan Praktika",
      degrees: [
        "Ph.D. AGST Manila, Philippines",
        "M.Th. International Theological Seminary USA",
        "M.A. Sekolah Tinggi Teologi Bandung",
        "S.E. Universitas Katolik Widyakarya Malang",
      ],
    },
    {
      name: "Sarinah Lo",
      role: "Ketua Program Studi M.Pd.K",
      bidang: "Pendidikan",
      degrees: [
        "Ph.D. TEDS (Trinity Evangelical Divinity School)",
        "M.Ed. Calvin College USA",
        "M.A. Singapore Bible College",
        "S.Si. Universitas Indonesia Jakarta",
      ],
    },
    {
      name: "Heriyanto",
      role: "Ketua Program Studi M.Min.",
      bidang: "Biblika, Pendidikan, dan Praktika",
      degrees: [
        "Dr. Universitas Pendidikan Indonesia Bandung",
        "M.Th. International Theological Seminary USA",
        "S.Th. Sekolah Tinggi Teologi Bandung",
      ],
    },
    {
      name: "Kristian Kusumawardana",
      role: "Ketua Program Studi S.Th.",
      degrees: [
        "M.Th. Sekolah Tinggi Teologi Bandung",
        "M.Div. Sekolah Tinggi Teologi SAAT Malang",
        "S.Si. MIPA UNS Surakarta",
      ],
    },
  ]

  const jajaranDosen: LecturerProfile[] = [
    {
      name: "Joseph Tong",
      role: "Dosen",
      bidang: "Filsafat, Sistematika, dan Praktika",
      degrees: [
        "Ph.D. University of Southern California USA",
        "M.BA. Graduate Theological Foundation Indiana",
        "M.Th. Calvin Theological Seminary USA",
        "B.A. Calvin College USA",
        "B.Th. Seminari Alkitab Asia Tenggara Malang",
      ],
    },
    {
      name: "Herlise Y Sagala",
      role: "Dosen",
      bidang: "Biblika & Praktika",
      degrees: [
        "D.Th. Institut Injili Indonesia Batu Malang",
        "D.Min. Institut Injili Indonesia Batu Malang",
        "M.Th. International Theological Seminary USA",
        "M.Div. Institut Injili Indonesia Batu Malang",
        "S.Th. Institut Injili Indonesia Batu Malang",
        "B.A. Universitas 17 Agustus 1945 Medan",
      ],
    },
    {
      name: "Agus Gunawan",
      role: "Dosen",
      bidang: "Teologi, Praktika, dan Pendidikan",
      degrees: [
        "Ph.D. Biola University USA",
        "M.Th. International Theological Seminary USA",
        "M.Th. Trinity Theological College Singapore",
        "S.Th. SAAT Malang",
      ],
    },
    {
      name: "Chandra Koewoso",
      role: "Dosen",
      bidang: "Biblika dan Praktika",
      degrees: [
        "D.Min. Singapore Bible College Singapore",
        "M.Div. Singapore Bible College",
        "M.M. Universitas Tarumanagara Jakarta",
        "S.T. Universitas Tarumanagara Jakarta",
      ],
    },
    {
      name: "Budiyanto Santosa",
      role: "Dosen",
      bidang: "Pendidikan dan Biblika",
      degrees: [
        "D.Min. Gordon Conwell Theological Seminary USA",
        "M.Th. Trinity Theological Seminary Singapore",
        "S.Th. Sekolah Tinggi Teologi SAAT Malang",
        "S.Pd. Universitas Katolik Indonesia Atmajaya Jakarta",
      ],
    },
    {
      name: "Philip Djung",
      role: "Dosen",
      bidang: "Sistematika",
      degrees: [
        "Ph.D. Calvin Theological Seminary USA",
        "M.Th. Calvin Theological Seminary USA",
        "M.Div. Singapore Bible College Singapore",
        "S.T. Universitas Tanjungpura Pontianak",
      ],
    },
    {
      name: "Doroti Tunggal Widjaja",
      role: "Dosen",
      bidang: "Biblika",
      degrees: [
        "M.Th. International Theological Seminary USA",
        "M.A. International Theological Seminary USA",
        "B.Th. Sekolah Tinggi Teologi SAAT Malang",
      ],
    },
    {
      name: "Amy Iwani",
      role: "Dosen",
      bidang: "Pendidikan",
      degrees: [
        "Ph.D. Columbia International University USA",
        "M.Ed. University of Southern Queensland Australia",
        "S.T. Institut Teknologi Nasional Malang Indonesia",
      ],
    },
    {
      name: "Grace Emilia",
      role: "Dosen",
      bidang: "Praktika",
      degrees: [
        "S.S. Universitas Maranatha Bandung",
        "M.A. Sekolah Tinggi Teologi Bandung",
        "M.Div. Sekolah Tinggi Teologi Bandung",
        "M.Th. Tyndale University College & Seminary Toronto",
      ],
    },
    {
      name: "Winarsih",
      role: "Dosen",
      bidang: "Konseling (Praktika)",
      degrees: [
        "M.Th. Sekolah Tinggi Teologi SAAT Malang",
        "S.Si. Universitas Sebelas Maret Surakarta",
      ],
    },
    {
      name: "Viktor Pamusu",
      role: "Dosen",
      bidang: "Sistematika",
      degrees: [
        "M.Th. Sekolah Tinggi Teologi Bandung",
        "S.Th. Sekolah Tinggi Teologi Bandung",
      ],
    },
    {
      name: "Yohanes Marsono",
      role: "Dosen",
      bidang: "Biblika",
      degrees: [
        "M.Th. International Theological Seminary USA",
        "M.A. Lincoln Christian Seminary USA",
        "S.Th. Sekolah Tinggi Theologia Injili Indonesia Yogyakarta",
      ],
    },
    {
      name: "Desiana M. Nainggolan",
      role: "Dosen",
      bidang: "Bahasa Yunani & Misi",
      degrees: [
        "Dr. Institut Injili Indonesia Batu Malang",
        "M.Th. International Theological Seminary USA",
        "M.Div. Sekolah Tinggi Teologi Bandung",
        "B.Th. STT Eben Haezer Tanjung Enim",
        "S.Th. Institut Injili Indonesia Batu Malang",
      ],
    },
    {
      name: "Noni Susilo",
      role: "Dosen",
      bidang: "Biblika",
      degrees: [
        "M.Th. Sekolah Tinggi Teologi Bandung",
        "M.Div. Seminari Alkitab Asia Tenggara Malang",
        "S.T. Universitas Sriwijaya Palembang (Teknik Kimia)",
      ],
    },
    {
      name: "Rico Cristian Komala",
      role: "Dosen",
      bidang: "Liturgika & Musika Gereja",
      degrees: [
        "M.C.M. Singapore Bible College Singapore",
        "S.T. Institut Teknologi Bandung",
      ],
    },
    {
      name: "Santobi Ong",
      role: "Dosen",
      bidang: "Biblika & Praktika",
      degrees: [
        "M.Th. Sekolah Tinggi Teologi SAAT Malang",
        "M.Div. Sekolah Tinggi Teologi Bandung",
        "S.E. Universitas Lampung",
      ],
    },
    {
      name: "Romy",
      role: "Dosen",
      bidang: "Biblika & Praktika",
      degrees: [
        "M.Th. Universitas Kristen Duta Wacana Yogyakarta",
        "S.Th. Sekolah Tinggi Teologi Aletheia Lawang Malang",
      ],
    },
    {
      name: "Iwan Tanusaputra",
      role: "Dosen",
      bidang: "Biblika",
      degrees: [
        "M.Th. Sekolah Tinggi Teologi Bandung",
        "M.Div. Sekolah Tinggi Teologi Bandung",
        "S.T. Institut Teknologi Bandung",
      ],
    },
    {
      name: "Paulina Widjaja",
      role: "Dosen",
      bidang: "Pendidikan",
      degrees: [
        "M.A.H.C.D. Malaysian Baptist Theological Seminary",
        "S.Pd. Sekolah Tinggi Teologi Bandung",
        "M.Pd. Magister Pendidikan Kristen STT Bandung",
      ],
    },
    {
      name: "Lin Yuan I",
      role: "Dosen",
      bidang: "Sistematika",
      degrees: [
        "Ph.D. Assumption University Thailand",
        "M.Th. International Theological Seminary USA",
        "M.A. Fu Jen Catholic University",
        "B.Th. Holy Light Theological Seminary Taiwan",
      ],
    },
    {
      name: "Swanti Suhaemi",
      role: "Dosen",
      bidang: "Pendidikan",
      degrees: [
        "Ed.D. University of Durham UK",
        "M.B.A. University of Central Oklahoma USA",
        "S.E. Universitas Padjadjaran Bandung",
      ],
    },
    {
      name: "Mario Saliutama",
      role: "Dosen STTB",
      degrees: [
        "M.Pd. Sekolah Tinggi Teologi Bandung",
        "S.Pd. Universitas Terbuka (Pendidikan Matematika)",
      ],
    },
    {
      name: "I Gede Puji Arysantosa",
      role: "Dosen STTB",
      degrees: [
        "D.Th. STT Berita Hidup",
        "M.Th. Sekolah Tinggi Teologi Bandung",
        "S.E. Universitas Bandung Raya",
      ],
    },
    {
      name: "Johanes Kurniawan",
      role: "Dosen STTB",
      degrees: [
        "M.A. Regent College Canada",
        "MBA National University of Singapore",
        "S.T. Universitas Kristen Petra",
      ],
    },
    {
      name: "Rebekah Earnshaw",
      role: "Dosen STTB",
      degrees: [
        "Ph.D. University of St Andrews UK",
        "M.A. Australian College of Theology",
        "B.D. Moore Theological College Australia",
        "B.E. University of New South Wales Australia",
      ],
    },
    {
      name: "Tan Giok Sien",
      role: "Dosen STTB",
      degrees: [
        "M.Pd.K. Sekolah Tinggi Teologi Bandung",
        "P.A.K. Sekolah Tinggi Teologi Baptis Bandung",
      ],
    },
  ]

  return (
    <>
      <PageContainer>
        <SectionHeader title="Pimpinan Institusi" align="center" description="Ketua dan jajaran wakil ketua STTB." />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
          {pimpinan.map((lecturer, index) => (
            <LecturerCard key={`${lecturer.name}-${lecturer.role}`} lecturer={lecturer} image={getLecturerPhoto(lecturer.name, index)} />
          ))}
        </div>

        <SectionHeader title="Ketua Program Studi" align="center" description="Koordinator akademik pada tiap program studi." />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {ketuaProgramStudi.map((lecturer, index) => (
            <LecturerCard key={`${lecturer.name}-${lecturer.role}`} lecturer={lecturer} image={getLecturerPhoto(lecturer.name, index)} />
          ))}
        </div>

        <SectionHeader title="Jajaran Dosen" align="left" description="Dosen tetap dan dosen STTB." />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {jajaranDosen.map((lecturer, index) => (
            <LecturerCard key={`${lecturer.name}-${lecturer.role}`} lecturer={lecturer} image={getLecturerPhoto(lecturer.name, index)} />
          ))}
        </div>
      </PageContainer>
    </>
  )
}
