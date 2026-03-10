import React from "react"
import { cn } from "@/utils"

interface PageHeroProps {
  title: string
  description?: React.ReactNode
  backgroundImage?: string
  className?: string
}

export const PageHero = ({
  title,
  description,
  backgroundImage = "/images/campus/default-hero.jpg",
  className,
}: PageHeroProps) => {
  return (
    <div
      className={cn(
        "relative flex min-h-[30vh] md:min-h-[40vh] items-center justify-center bg-cover bg-center text-white",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
      }}
    >
      <div className="container mx-auto px-4 text-center z-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
