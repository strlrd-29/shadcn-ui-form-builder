import * as React from "react"

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
              {fields.map(({ name, Icon }) => (
                <SidebarMenuItem key={name}>
                  <SidebarMenuButton asChild>
                    <a href="#">
                      <Icon />
                      <span>{name}</span>
                    </a>
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
