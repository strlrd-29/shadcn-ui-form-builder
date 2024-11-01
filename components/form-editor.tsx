"use client"

import * as React from "react"
import { useFormStore } from "@/stores/form"
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useShallow } from "zustand/shallow"

import { FormField } from "@/types/field"
import { FormState } from "@/types/form-store"
import { generateZodSchema } from "@/lib/form-schema"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Field } from "@/components/field"
import { SortableField } from "@/components/sortable-field"

const selector = (state: FormState) => ({
  formFields: state.formFields,
  setFormFields: state.setFormFields,
})

export function FormEditor() {
  const [activeFormField, setActiveFormField] =
    React.useState<FormField | null>(null)
  const { formFields, setFormFields } = useFormStore(useShallow(selector))

  const formSchema = generateZodSchema(formFields)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.info(values)
  }

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
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto flex w-3/4 flex-col gap-6 p-4"
        >
          <SortableContext
            items={formFields.map((formField) => formField.name)}
            strategy={verticalListSortingStrategy}
          >
            {formFields.map((formField) => (
              <SortableField
                formField={formField}
                form={form}
                key={formField.name}
              />
            ))}
          </SortableContext>
          <DragOverlay className="bg-background">
            {activeFormField ? <Field formField={activeFormField} /> : <></>}
          </DragOverlay>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </DndContext>
  )
}
