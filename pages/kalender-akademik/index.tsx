import React, { useState, useMemo } from "react"
import Head from "next/head"
import Link from "next/link"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import { useAcademicCalendarList } from "@/components/kalender-akademik/hooks/useAcademicCalendarData"
import { AcademicCalendarListItem } from "@/types/Models"
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react"

// ── colour coding by event type ──────────────────────────────────────────────
const EVENT_TYPE_COLORS: Record<string, { dot: string; badge: string; text: string }> = {
  Perkuliahan: { dot: "bg-blue-500",   badge: "bg-blue-100 text-blue-800 border-blue-200",   text: "text-blue-700" },
  UTS:         { dot: "bg-red-500",    badge: "bg-red-100 text-red-800 border-red-200",       text: "text-red-700" },
  UAS:         { dot: "bg-orange-500", badge: "bg-orange-100 text-orange-800 border-orange-200", text: "text-orange-700" },
  Libur:       { dot: "bg-green-500",  badge: "bg-green-100 text-green-800 border-green-200", text: "text-green-700" },
  Wisuda:      { dot: "bg-purple-500", badge: "bg-purple-100 text-purple-800 border-purple-200", text: "text-purple-700" },
  Pendaftaran: { dot: "bg-yellow-500", badge: "bg-yellow-100 text-yellow-800 border-yellow-200", text: "text-yellow-700" },
  Lainnya:     { dot: "bg-gray-400",   badge: "bg-gray-100 text-gray-700 border-gray-200",    text: "text-gray-600" },
}

function getColors(eventType?: string) {
  return EVENT_TYPE_COLORS[eventType ?? ""] ?? EVENT_TYPE_COLORS.Lainnya
}

// ── helpers ──────────────────────────────────────────────────────────────────
const MONTH_NAMES_ID = [
  "Januari","Februari","Maret","April","Mei","Juni",
  "Juli","Agustus","September","Oktober","November","Desember",
]
const DAY_NAMES_ID = ["Min","Sen","Sel","Rab","Kam","Jum","Sab"]

function toYMD(iso: string) {
  // returns "YYYY-MM-DD"
  return iso.slice(0, 10)
}

/** Returns all YYYY-MM-DD strings an event spans (inclusive). */
function spanDates(item: AcademicCalendarListItem): string[] {
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
  eventsByDate: Map<string, AcademicCalendarListItem[]>
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
  // Pad to full weeks
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

          // Collect up to 3 unique event type dots
          const typeDots = [...new Set(events.map((e) => e.eventType || (e as any).EventType || "Lainnya"))].slice(0, 3)

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
              {typeDots.length > 0 && (
                <div className="flex gap-0.5 mt-0.5">
                  {typeDots.map((type, i) => (
                    <span
                      key={i}
                      className={["w-1.5 h-1.5 rounded-full", getColors(type).dot, isSelected ? "opacity-80" : ""].join(" ")}
                    />
                  ))}
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
function EventCard({ item }: { item: AcademicCalendarListItem }) {
  const title = item.title || (item as any).Title || ""
  const slug = item.slug || (item as any).Slug || ""
  const startDate = item.startDate || (item as any).StartDate || ""
  const endDate = item.endDate || (item as any).EndDate
  const eventType = item.eventType || (item as any).EventType || "Lainnya"
  const academicYear = item.academicYear || (item as any).AcademicYear
  const semester = item.semester || (item as any).Semester
  const description = (item as any).description || (item as any).Description

  const colors = getColors(eventType)

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })

  const dateStr = endDate
    ? `${formatDate(startDate)} – ${formatDate(endDate)}`
    : formatDate(startDate)

  return (
    <div className={["rounded-lg border p-3 hover:shadow-sm transition-shadow", colors.badge].join(" ")}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <span className={["inline-block text-xs font-semibold px-1.5 py-0.5 rounded border mb-1", colors.badge].join(" ")}>
            {eventType}
          </span>
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
          {(academicYear || semester) && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {[academicYear, semester].filter(Boolean).join(" · ")}
            </p>
          )}
          {description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{description}</p>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Legend ────────────────────────────────────────────────────────────────────
function Legend() {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
      {Object.entries(EVENT_TYPE_COLORS).map(([type, c]) => (
        <span key={type} className="flex items-center gap-1">
          <span className={["w-2 h-2 rounded-full shrink-0", c.dot].join(" ")} />
          {type}
        </span>
      ))}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function KalenderAkademik() {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const [selectedDay, setSelectedDay] = useState<number | null>(now.getDate())

  // Fetch a large page to get all entries client-side
  const { academicCalendars, isLoading, error } = useAcademicCalendarList(1)

  // Build date → events map spanning multi-day events
  const eventsByDate = useMemo(() => {
    const map = new Map<string, AcademicCalendarListItem[]>()
    for (const item of academicCalendars) {
      for (const ymd of spanDates(item)) {
        if (!map.has(ymd)) map.set(ymd, [])
        map.get(ymd)!.push(item)
      }
    }
    return map
  }, [academicCalendars])

  // Events visible in the right panel: all events that overlap the selected day or fall in the current month
  const panelEvents = useMemo(() => {
    if (selectedDay !== null) {
      const ymd = `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`
      return eventsByDate.get(ymd) ?? []
    }
    // fallback: all events in current month
    const prefix = `${year}-${String(month + 1).padStart(2, "0")}`
    const result = new Map<number, AcademicCalendarListItem>()
    for (const [ymd, items] of eventsByDate.entries()) {
      if (ymd.startsWith(prefix)) {
        for (const item of items) {
          const id = item.academicCalendarId || (item as any).AcademicCalendarId
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

                <Legend />
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
                      const id = item.academicCalendarId || (item as any).AcademicCalendarId
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
