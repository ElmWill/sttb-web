import React from "react"
import { PageContainer } from "@/components/layouts/PageContainer"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { FileText, Users, Calendar, Megaphone } from "lucide-react"

const StatCard = ({ title, count, icon: Icon }: { title: string, count: string | number, icon: any }) => (
  <Card>
    <CardContent className="p-6 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
        <h3 className="text-3xl font-bold">{count}</h3>
      </div>
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <Icon className="w-6 h-6" />
      </div>
    </CardContent>
  </Card>
)

export default function DashboardFeature() {
  return (
    <div className="pt-24 pb-12">
      <PageContainer>
        <div className="flex items-center justify-between mb-8">
          <SectionHeader title="Dashboard Administrator" description="Ringkasan data Content Management System STTB." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Total Berita" count={124} icon={FileText} />
          <StatCard title="Pendaftar Baru" count={48} icon={Users} />
          <StatCard title="Kegiatan Aktif" count={12} icon={Calendar} />
          <StatCard title="Publikasi Media" count={89} icon={Megaphone} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-4 py-3 border-b last:border-0">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Admin memperbarui artikel Berita</p>
                      <p className="text-xs text-muted-foreground">{i * 2} jam yang lalu</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Akses Cepat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <button className="text-left px-4 py-3 rounded-md bg-muted/50 hover:bg-muted font-medium text-sm transition-colors">Kelola Pendaftar Admisi</button>
                <button className="text-left px-4 py-3 rounded-md bg-muted/50 hover:bg-muted font-medium text-sm transition-colors">Tambah Berita Baru</button>
                <button className="text-left px-4 py-3 rounded-md bg-muted/50 hover:bg-muted font-medium text-sm transition-colors">Tinjau Pengumuman</button>
                <button className="text-left px-4 py-3 rounded-md bg-muted/50 hover:bg-muted font-medium text-sm transition-colors">Pengaturan Tampilan Depan</button>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </div>
  )
}
