import React from "react"
import { HeroSection } from "./HeroSection"
import { ProgramHighlight } from "./ProgramHighlight"
import { LatestNews } from "./LatestNews"
import { UpcomingEvents } from "./UpcomingEvents"
import { CampusLife } from "./CampusLife"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <ProgramHighlight />
      <div className="bg-muted/30">
        <LatestNews />
      </div>
      <UpcomingEvents />
      <div className="bg-primary/5">
        <CampusLife />
      </div>
    </div>
  )
}
