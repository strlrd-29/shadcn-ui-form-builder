import * as React from "react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface TooltipWrapperProps {
  children: React.ReactNode
  text: string
  side?: "top" | "right" | "bottom" | "left" | undefined
}

export function TooltipWrapper({ children, text, side }: TooltipWrapperProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>{text}</TooltipContent>
    </Tooltip>
  )
}
