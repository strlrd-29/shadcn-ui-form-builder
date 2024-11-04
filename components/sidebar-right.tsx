"use client"

import * as React from "react"
import { useFormStore } from "@/stores/form"
import { useShallow } from "zustand/shallow"

import { FormState } from "@/types/form-store"
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

const selector = (state: FormState) => ({
  addFormField: state.addFormField,
  setIsEditFormFieldOpen: state.setIsEditFormFieldOpen,
  setSelectedFormField: state.setSelectedFormField,
})

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { addFormField, setSelectedFormField, setIsEditFormFieldOpen } =
    useFormStore(useShallow(selector))
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
                    onClick={() => {
                      const newFormField = {
                        ...field,
                        id: Math.random().toString().slice(-10),
                        name: `${field.name.toLowerCase().replaceAll(" ", "_")}_${Math.random().toString().slice(-10)}`,
                      }
                      addFormField(newFormField)
                      setSelectedFormField(newFormField.id)
                      setIsEditFormFieldOpen(true)
                    }}
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
