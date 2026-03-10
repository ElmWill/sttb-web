import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export const RequirementSection = ({ requirements }: { requirements: string[] }) => {
  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle className="text-2xl">Persyaratan Pendaftaran</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requirements.map((req, idx) => (
            <li key={idx} className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-primary mr-3 shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{req}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
