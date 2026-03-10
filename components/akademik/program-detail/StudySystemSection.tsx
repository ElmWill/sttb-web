import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const StudySystemSection = ({ system, description }: { system: string, description: string }) => {
  return (
    <Card className="mb-12 bg-muted/50 border-transparent">
      <CardHeader>
        <CardTitle className="text-2xl">Sistem Perkuliahan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="font-semibold text-lg">{system}</div>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}
