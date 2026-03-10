import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export interface CourseGroup {
  category: string
  courses: Array<{ name: string; credits: number }>
}

export const CourseTable = ({ categories }: { categories: CourseGroup[] }) => {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-6 text-foreground">Daftar Mata Kuliah</h3>
      <div className="space-y-8">
        {categories.map((group, idx) => (
          <div key={idx} className="border rounded-lg overflow-hidden">
            <div className="bg-primary/5 px-4 py-3 border-b border-primary/10">
              <h4 className="font-bold text-primary">{group.category}</h4>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80%]">Mata Kuliah</TableHead>
                  <TableHead className="w-[20%] text-right">Jumlah SKS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {group.courses.map((course, cIdx) => (
                  <TableRow key={cIdx}>
                    <TableCell className="font-medium">{course.name}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{course.credits}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
    </div>
  )
}
