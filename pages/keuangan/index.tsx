import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import { PageHero } from "@/components/shared/PageHero"
import { PageContainer } from "@/components/layouts/PageContainer"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"

const links = [
  { href: "/keuangan/biaya-studi", title: "Biaya Studi", desc: "Informasi harga dan rincian kuliah." },
  { href: "/keuangan/beasiswa", title: "Beasiswa", desc: "Program keringanan biaya studi." },
  { href: "/keuangan/dukung", title: "Dukung STTB", desc: "Salurkan donasi pelayanan Anda." },
]

export default function KeuanganIndex() {
  return (
    <>
      <Head>
        <title>Informasi Keuangan | {AppSettings.appName}</title>
      </Head>
      <PageHero title="Informasi Administrasi Keuangan" description="Biaya, beasiswa, dan kemitraan." />
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

KeuanganIndex.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
