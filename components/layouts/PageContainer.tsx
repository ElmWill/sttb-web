import React from "react"
import { cn } from "@/utils"

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const PageContainer = ({ children, className, ...props }: PageContainerProps) => {
  return (
    <div className={cn("container mx-auto px-4 py-8 md:py-12", className)} {...props}>
      {children}
    </div>
  )
}
