import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Book, GraduationCap } from "lucide-react"

export const ProgramInfo = ({ credits, duration, degree }: { credits: number, duration: string, degree: string }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
      <Card className="bg-primary text-primary-foreground border-transparent">
        <CardContent className="p-6 flex items-center space-x-4">
          <Book className="w-10 h-10 opacity-80" />
          <div>
            <p className="text-primary-foreground/80 font-medium text-sm">Beban Studi</p>
            <p className="text-2xl font-bold">{credits} SKS</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-secondary text-secondary-foreground border-transparent">
        <CardContent className="p-6 flex items-center space-x-4">
          <Clock className="w-10 h-10 opacity-80" />
          <div>
            <p className="text-secondary-foreground/80 font-medium text-sm">Masa Studi</p>
            <p className="text-2xl font-bold">{duration}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-accent text-accent-foreground border-transparent">
        <CardContent className="p-6 flex items-center space-x-4">
          <GraduationCap className="w-10 h-10 opacity-80" />
          <div>
            <p className="text-accent-foreground/80 font-medium text-sm">Gelar Akademik</p>
            <p className="text-2xl font-bold">{degree}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
