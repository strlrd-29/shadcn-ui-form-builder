"use client"

import * as React from "react"
import { useFormStore } from "@/stores/form"

import { fields } from "@/lib/constants"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const addFormField = useFormStore((state) => state.addFormField)
  return (
    <Sidebar
      collapsible="none"
      className="sticky top-0 hidden h-svh border-l md:flex"
      {...props}
    >
      <SidebarHeader className="h-16"></SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Fields</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {fields.map((field) => (
                <SidebarMenuItem key={field.name}>
                  <SidebarMenuButton
                    onClick={() =>
                      addFormField({
                        ...field,
                        name: `${field.name.toLowerCase().replace(" ", "_")}_${Math.random().toString().slice(-10)}`,
                      })
                    }
                  >
                    <field.Icon />
                    <span>{field.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
