import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import { PageHero } from "@/components/shared/PageHero"
import { PageContainer } from "@/components/layouts/PageContainer"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"

const links = [
  { href: "/kehidupan-kampus/fasilitas", title: "Fasilitas Kampus", desc: "Asrama, Kapel, dan Perpustakaan." },
  { href: "/kehidupan-kampus/pembinaan", title: "Pembinaan Rohani", desc: "Retreat, kelompok sel, dan kapel." },
  { href: "/kehidupan-kampus/senat", title: "Senat Mahasiswa", desc: "Wadah organisasi dan kepemimpinan." },
]

export default function KehidupanKampusIndex() {
  return (
    <>
      <Head>
        <title>Kehidupan Kampus | {AppSettings.appName}</title>
      </Head>
      <PageHero title="Kehidupan Kampus" description="Menumbuhkan karakter, spiritualitas, dan kebersamaan di STTB." />
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {links.map(link => (
            <Link key={link.href} href={link.href}>
              <Card className="h-full hover:shadow-md hover:border-primary/50 transition-colors cursor-pointer">
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

KehidupanKampusIndex.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
