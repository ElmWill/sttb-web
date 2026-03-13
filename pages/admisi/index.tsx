import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import { PageContainer } from "@/components/layouts/PageContainer"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"

const links = [
  { href: "/admisi/jadwal", title: "Jadwal Admisi", desc: "Informasi gelombang pendaftaran." },
  { href: "/admisi/prosedur", title: "Prosedur", desc: "Tahapan tata cara mendaftar." },
  { href: "/admisi/persyaratan", title: "Persyaratan", desc: "Persiapan dokumen dan berkas." },
  { href: "/admisi/faq", title: "FAQ", desc: "Tanya jawab seputar pendaftaran." },
]

export default function AdmisiIndex() {
  return (
    <>
      <Head>
        <title>Informasi Pendaftaran | {AppSettings.appName}</title>
      </Head>
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

AdmisiIndex.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
