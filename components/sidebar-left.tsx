"use client"

import * as React from "react"
import { useFormStore } from "@/stores/form"
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core"
import { arrayMove, SortableContext } from "@dnd-kit/sortable"
import { useShallow } from "zustand/shallow"

import { FormField } from "@/types/field"
import { FormState } from "@/types/form-store"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Logo } from "@/components/logo"
import { SortableSidebarFormFieldItem } from "@/components/sortable-sidebar-form-field-item"

const selector = (state: FormState) => ({
  formFields: state.formFields,
  setFormFields: state.setFormFields,
})

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [activeFormField, setActiveFormField] =
    React.useState<FormField | null>(null)
  const { formFields, setFormFields } = useFormStore(useShallow(selector))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = formFields.findIndex((field) => field.name === active.id)
      const newIndex = formFields.findIndex((field) => field.name === over.id)

      setFormFields(arrayMove(formFields, oldIndex, newIndex))
    }
    setActiveFormField(null)
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event
    const formField = formFields.find((field) => field.name === active.id)
    if (formField) {
      setActiveFormField(formField)
    }
  }

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader className="h-16">
        <div className="my-auto flex w-fit items-center gap-2">
          <div className="flex aspect-square size-6 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <Logo className="size-4 invert" />
          </div>
          <span className="text-sm font-semibold">Shadcn Form Builder</span>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <SidebarGroupLabel>Form fields</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SortableContext
                  items={formFields.map((formField) => formField.name)}
                >
                  {formFields.map((field) => (
                    <SortableSidebarFormFieldItem
                      key={field.name}
                      formField={field}
                    />
                  ))}
                </SortableContext>
                <DragOverlay className="bg-background">
                  {activeFormField ? (
                    <SortableSidebarFormFieldItem formField={activeFormField} />
                  ) : (
                    <></>
                  )}
                </DragOverlay>
              </SidebarMenu>
            </SidebarGroupContent>
          </DndContext>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
