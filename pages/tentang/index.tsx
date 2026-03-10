import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import { PageHero } from "@/components/shared/PageHero"
import { PageContainer } from "@/components/layouts/PageContainer"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"

const links = [
  { href: "/tentang/sejarah", title: "Sejarah", desc: "Perjalanan STTB" },
  { href: "/tentang/visi-misi", title: "Visi & Misi", desc: "Arah dan nilai dasar kampus" },
  { href: "/tentang/pendiri", title: "Pendiri", desc: "Tokoh-tokoh perintis STTB" },
  { href: "/tentang/arti-logo", title: "Arti Logo", desc: "Filosofi logo institusi" },
  { href: "/tentang/pengakuan-iman", title: "Pengakuan Iman", desc: "Landasan teologis kami" },
  { href: "/tentang/mars", title: "Mars STTB", desc: "Lagu identitas kampus" },
  { href: "/tentang/dewan-dosen", title: "Dewan Dosen", desc: "Pimpinan dan jajaran pengajar" },
  { href: "/tentang/yayasan", title: "Yayasan", desc: "Badan penyelenggara" },
]

export default function TentangIndex() {
  return (
    <>
      <Head>
        <title>Tentang Kami | {AppSettings.appName}</title>
      </Head>
      <PageHero title="Tentang Kami" description="Cari tahu lebih lanjut tentang Sekolah Tinggi Teologi Bandung." />
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {links.map(link => (
            <Link key={link.href} href={link.href}>
              <Card className="h-full hover:shadow-md hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{link.title}</CardTitle>
                  <CardDescription>{link.desc}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </PageContainer>
    </>
  )
}

TentangIndex.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
