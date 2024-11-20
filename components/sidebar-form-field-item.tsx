import * as React from "react"

import { cn } from "@/lib/utils"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

import type { FormField } from "@/types/field"

export interface SidebarFormFieldItemProps {
  formField: FormField
  style?: React.CSSProperties
  isDragging?: boolean
}

export const SidebarFormFieldItem = React.forwardRef<
  HTMLLIElement,
  SidebarFormFieldItemProps
>(({ formField, style, isDragging, ...props }, ref) => {
  return (
    <SidebarMenuItem
      style={style}
      ref={ref}
      className={cn({
        "bg-muted opacity-60": isDragging,
      })}
      {...props}
    >
      <SidebarMenuButton className="text-sm">
        <span className="truncate">{formField.name}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
})

SidebarFormFieldItem.displayName = "SidebarFormFieldItem"
