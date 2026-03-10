import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { PageContainer } from "@/components/layouts/PageContainer"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Clock } from "lucide-react"
import Link from "next/link"

const events = [
  { id: 1, title: "Ibadah Tengah Minggu", date: "16", month: "Okt", time: "17:00 WIB", location: "Kapel Utama STTB" },
  { id: 2, title: "Diskusi Teologi Mahasiswa", date: "18", month: "Okt", time: "14:00 WIB", location: "Ruang Serbaguna" },
  { id: 3, title: "Pembekalan Pelayanan Praktik", date: "21", month: "Okt", time: "09:00 WIB", location: "Laboratorium Khotbah" },
]

export const UpcomingEvents = () => {
  return (
    <PageContainer>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <SectionHeader 
          title="Kegiatan Mendatang" 
          description="Aktivitas dan acara rutin di lingkungan STTB."
          className="mb-0"
        />
        <Button variant="ghost" className="mt-4 md:mt-0 flex items-center gap-2" asChild>
          <Link href="/kegiatan">
            Lihat Semua Kegiatan <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-0 flex flex-row">
              <div className="bg-primary/10 text-primary w-24 flex flex-col items-center justify-center p-4 border-r rounded-l-xl">
                <span className="text-3xl font-bold">{event.date}</span>
                <span className="text-sm font-medium uppercase">{event.month}</span>
              </div>
              <div className="p-4 flex-1">
                <h3 className="font-semibold text-lg line-clamp-1 mb-2">{event.title}</h3>
                <div className="space-y-1">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3 mr-2" />
                    {event.location}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  )
}
