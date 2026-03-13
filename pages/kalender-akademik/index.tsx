import React, { useState, useMemo } from "react"
import Head from "next/head"
import Link from "next/link"
import useSWR from "swr"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import { eventsApi } from "@/functions/api/eventsApi"
import { EventListItem, PagedResult } from "@/types/Models"
import { useSwrFetcherWithAccessToken } from "@/functions/useSwrFetcherWithAccessToken"
import { ChevronLeft, ChevronRight, CalendarDays, MapPin } from "lucide-react"

// ── helpers ──────────────────────────────────────────────────────────────────
const MONTH_NAMES_ID = [
  "Januari","Februari","Maret","April","Mei","Juni",
  "Juli","Agustus","September","Oktober","November","Desember",
]
const DAY_NAMES_ID = ["Min","Sen","Sel","Rab","Kam","Jum","Sab"]

/** Returns all YYYY-MM-DD strings an event spans (inclusive). */
function spanDates(item: EventListItem): string[] {
  const start = new Date(item.startDate || (item as any).StartDate)
  const rawEnd = item.endDate || (item as any).EndDate
  const end = rawEnd ? new Date(rawEnd) : start
  const dates: string[] = []
  const cur = new Date(start)
  while (cur <= end) {
    dates.push(cur.toISOString().slice(0, 10))
    cur.setDate(cur.getDate() + 1)
  }
  return dates
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function firstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

// ── Calendar grid ─────────────────────────────────────────────────────────────
interface CalendarGridProps {
  year: number
  month: number
  eventsByDate: Map<string, EventListItem[]>
  selectedDay: number | null
  onSelectDay: (day: number) => void
}

function CalendarGrid({ year, month, eventsByDate, selectedDay, onSelectDay }: CalendarGridProps) {
  const numDays = daysInMonth(year, month)
  const firstDay = firstDayOfMonth(year, month)
  const today = new Date()
  const todayYMD = today.toISOString().slice(0, 10)

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= numDays; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div className="select-none">
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_NAMES_ID.map((d) => (
          <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-1">{d}</div>
        ))}
      </div>
      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, idx) => {
          if (!day) return <div key={idx} />

          const ymd = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
          const events = eventsByDate.get(ymd) ?? []
          const isToday = ymd === todayYMD
          const isSelected = day === selectedDay
          const hasEvents = events.length > 0

          return (
            <button
              key={idx}
              onClick={() => onSelectDay(day)}
              className={[
                "relative flex flex-col items-center rounded-lg py-1 px-0.5 transition-colors focus:outline-none",
                isSelected ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                isToday && !isSelected ? "ring-2 ring-primary ring-offset-1" : "",
              ].join(" ")}
            >
              <span className={["text-sm font-medium leading-6", isSelected ? "text-primary-foreground" : ""].join(" ")}>
                {day}
              </span>
              {hasEvents && (
                <div className="flex gap-0.5 mt-0.5">
                  <span
                    className={["w-1.5 h-1.5 rounded-full bg-primary", isSelected ? "opacity-60" : ""].join(" ")}
                  />
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Event card ────────────────────────────────────────────────────────────────
function EventCard({ item }: { item: EventListItem }) {
  const title = item.title || (item as any).Title || ""
  const slug = item.slug || (item as any).Slug || ""
  const startDate = item.startDate || (item as any).StartDate || ""
  const endDate = item.endDate || (item as any).EndDate
  const location = item.location || (item as any).Location
  const description = (item as any).description || (item as any).Description
  const featuredImageId = item.featuredImageId || (item as any).FeaturedImageId || null

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })

  const dateStr = endDate
    ? `${formatDate(startDate)} – ${formatDate(endDate)}`
    : formatDate(startDate)

  return (
    <div className="rounded-lg border overflow-hidden hover:shadow-sm transition-shadow bg-primary/5 border-primary/20">
      {featuredImageId && (
        <div
          className="w-full h-36 bg-cover bg-center bg-muted"
          style={{ backgroundImage: `url(/api/media-file/${featuredImageId})` }}
        />
      )}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            {slug ? (
              <Link href={`/kalender-akademik/${slug}`} className="block font-semibold text-sm leading-snug hover:underline line-clamp-2">
                {title}
              </Link>
            ) : (
              <p className="font-semibold text-sm leading-snug line-clamp-2">{title}</p>
            )}
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <CalendarDays className="w-3 h-3 shrink-0" />
              <span>{dateStr}</span>
            </div>
            {location && (
              <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="line-clamp-1">{location}</span>
              </div>
            )}
            {description && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── hook: fetch published events for a given month ────────────────────────────
function usePublishedEvents(year: number, month: number) {
  const fetcher = useSwrFetcherWithAccessToken()

  // ISO date strings for the first and last day of the given month
  const startDateFrom = `${year}-${String(month + 1).padStart(2, "0")}-01`
  const lastDay = new Date(year, month + 1, 0).getDate()
  const startDateTo = `${year}-${String(month + 1).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`

  const { data, error, isLoading } = useSWR<PagedResult<EventListItem>>(
    eventsApi.keys.list(1, undefined, "published", undefined, startDateFrom, startDateTo),
    fetcher,
  )
  const events: EventListItem[] =
    data?.events || (data as any)?.Events || data?.items || (data as any)?.Items || []
  return { events, isLoading, error }
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function KalenderAkademik() {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const [selectedDay, setSelectedDay] = useState<number | null>(now.getDate())

  const { events, isLoading, error } = usePublishedEvents(year, month)

  // Build date → events map spanning multi-day events
  const eventsByDate = useMemo(() => {
    const map = new Map<string, EventListItem[]>()
    for (const item of events) {
      for (const ymd of spanDates(item)) {
        if (!map.has(ymd)) map.set(ymd, [])
        map.get(ymd)!.push(item)
      }
    }
    return map
  }, [events])

  // Events visible in the right panel
  const panelEvents = useMemo(() => {
    if (selectedDay !== null) {
      const ymd = `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`
      return eventsByDate.get(ymd) ?? []
    }
    // fallback: all events in current month (deduplicated)
    const prefix = `${year}-${String(month + 1).padStart(2, "0")}`
    const result = new Map<number, EventListItem>()
    for (const [ymd, items] of eventsByDate.entries()) {
      if (ymd.startsWith(prefix)) {
        for (const item of items) {
          const id = item.eventId || (item as any).EventId
          result.set(id, item)
        }
      }
    }
    return [...result.values()]
  }, [selectedDay, year, month, eventsByDate])

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11) }
    else setMonth(m => m - 1)
    setSelectedDay(null)
  }
  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0) }
    else setMonth(m => m + 1)
    setSelectedDay(null)
  }
  const goToday = () => {
    setYear(now.getFullYear())
    setMonth(now.getMonth())
    setSelectedDay(now.getDate())
  }

  const selectedDateLabel = selectedDay !== null
    ? `${selectedDay} ${MONTH_NAMES_ID[month]} ${year}`
    : `${MONTH_NAMES_ID[month]} ${year}`

  return (
    <>
      <Head><title>Kalender Akademik | {AppSettings.appName}</title></Head>

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <div className="bg-primary/5 border-b py-10 px-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Kalender Akademik</h1>
          <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
            Jadwal kegiatan akademik STTB — perkuliahan, ujian, libur, dan acara penting setiap semester.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {isLoading && (
            <div className="text-center py-16 text-muted-foreground">Memuat kalender...</div>
          )}
          {error && (
            <div className="text-center py-16 text-destructive">
              Gagal memuat data kalender.
            </div>
          )}

          {!isLoading && !error && (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* ── Left: Calendar ── */}
              <div className="lg:w-[420px] shrink-0 space-y-4">
                {/* Month nav */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={prevMonth}
                    className="p-1.5 rounded hover:bg-muted transition-colors"
                    aria-label="Bulan sebelumnya"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="text-center">
                    <p className="font-bold text-lg">{MONTH_NAMES_ID[month]} {year}</p>
                    <button onClick={goToday} className="text-xs text-primary hover:underline mt-0.5">
                      Hari ini
                    </button>
                  </div>
                  <button
                    onClick={nextMonth}
                    className="p-1.5 rounded hover:bg-muted transition-colors"
                    aria-label="Bulan berikutnya"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <CalendarGrid
                  year={year}
                  month={month}
                  eventsByDate={eventsByDate}
                  selectedDay={selectedDay}
                  onSelectDay={setSelectedDay}
                />
              </div>

              {/* ── Right: Event list ── */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-base">
                    Kegiatan — <span className="text-muted-foreground font-normal">{selectedDateLabel}</span>
                  </h2>
                  {selectedDay !== null && (
                    <button
                      onClick={() => setSelectedDay(null)}
                      className="text-xs text-muted-foreground hover:text-foreground underline"
                    >
                      Lihat semua bulan ini
                    </button>
                  )}
                </div>

                {panelEvents.length === 0 ? (
                  <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground text-sm">
                    Tidak ada kegiatan pada {selectedDateLabel}.
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                    {panelEvents.map((item) => {
                      const id = item.eventId || (item as any).EventId
                      return <EventCard key={id} item={item} />
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

KalenderAkademik.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
