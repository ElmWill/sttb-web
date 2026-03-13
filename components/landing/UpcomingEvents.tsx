import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { PageContainer } from "@/components/layouts/PageContainer"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { useEventList } from "@/components/kegiatan/hooks/useEventData"

const MONTHS_ID = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"]

export const UpcomingEvents = () => {
  const { events, isLoading } = useEventList(1, undefined, "published");

  // Filter events that haven't ended yet and take the first 3
  const now = new Date();
  const upcoming = events
    .filter((e) => {
      const end = e.endDate || (e as any).EndDate || e.startDate || (e as any).StartDate;
      return end ? new Date(end) >= now : true;
    })
    .slice(0, 3);

  // Fallback static cards while loading or if no data yet
  const fallback = [
    { id: 1, title: "Ibadah Tengah Minggu", date: "16", month: "Okt", time: "17:00 WIB", location: "Kapel Utama STTB", slug: "" },
    { id: 2, title: "Diskusi Teologi Mahasiswa", date: "18", month: "Okt", time: "14:00 WIB", location: "Ruang Serbaguna", slug: "" },
    { id: 3, title: "Pembekalan Pelayanan Praktik", date: "21", month: "Okt", time: "09:00 WIB", location: "Laboratorium Khotbah", slug: "" },
  ];

  const cards = (!isLoading && upcoming.length > 0)
    ? upcoming.map((e) => {
        const startRaw = e.startDate || (e as any).StartDate || "";
        const d = startRaw ? new Date(startRaw) : null;
        const time = d
          ? d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB"
          : "";
        return {
          id: e.eventId || (e as any).EventId,
          title: e.title || (e as any).Title || "",
          date: d ? String(d.getDate()).padStart(2, "0") : "",
          month: d ? MONTHS_ID[d.getMonth()] : "",
          time,
          location: e.location || (e as any).Location || "",
          slug: e.slug || (e as any).Slug || "",
        };
      })
    : fallback;

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
        {cards.map((event) => (
          <Card key={event.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-0 flex flex-row">
              <div className="bg-primary/10 text-primary w-24 flex flex-col items-center justify-center p-4 border-r rounded-l-xl shrink-0">
                <span className="text-3xl font-bold">{event.date}</span>
                <span className="text-sm font-medium uppercase">{event.month}</span>
              </div>
              <div className="p-4 flex-1 min-w-0">
                {event.slug ? (
                  <Link href={`/kegiatan/${event.slug}`}>
                    <h3 className="font-semibold text-lg line-clamp-1 mb-2 hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                  </Link>
                ) : (
                  <h3 className="font-semibold text-lg line-clamp-1 mb-2">{event.title}</h3>
                )}
                <div className="space-y-1">
                  {event.time && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 mr-2 shrink-0" />
                      {event.time}
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3 mr-2 shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  )
}
