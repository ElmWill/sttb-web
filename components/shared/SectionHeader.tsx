import React from "react"
import { cn } from "@/utils"

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  align?: "left" | "center" | "right"
}

export const SectionHeader = ({
  title,
  description,
  align = "left",
  className,
  ...props
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        "mb-10 lg:mb-14",
        {
          "text-left": align === "left",
          "text-center": align === "center",
          "text-right": align === "right",
        },
        className
      )}
      {...props}
    >
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  )
}
