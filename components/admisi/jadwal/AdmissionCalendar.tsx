import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export interface Schedule {
  batch: string
  dateRange: string
  testDate: string
  resultDate: string
}

export const AdmissionCalendar = ({ schedules }: { schedules: Schedule[] }) => {
  return (
    <div className="border rounded-xl bg-card overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="font-bold">Gelombang</TableHead>
            <TableHead className="font-bold">Masa Pendaftaran</TableHead>
            <TableHead className="font-bold">Ujian Masuk</TableHead>
            <TableHead className="font-bold">Pengumuman</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedules.map((schedule, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium text-primary">{schedule.batch}</TableCell>
              <TableCell>{schedule.dateRange}</TableCell>
              <TableCell>{schedule.testDate}</TableCell>
              <TableCell>{schedule.resultDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
