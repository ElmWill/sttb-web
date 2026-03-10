import React from "react"
import { PageHero } from "@/components/shared/PageHero"

export const ProgramHeader = ({ title, description }: { title: string, description: string }) => {
  return (
    <PageHero 
      title={title} 
      description={description} 
      backgroundImage="/placeholders/program-hero.jpg"
    />
  )
}
