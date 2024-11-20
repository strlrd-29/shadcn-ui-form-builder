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

import { generateDefaultValues, generateZodSchema } from "@/lib/form-schema"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Field } from "@/components/field"
import { SortableField } from "@/components/sortable-field"

import { FormField } from "@/types/field"
import { FormState } from "@/types/form-store"

const selector = (state: FormState) => ({
  formFields: state.formFields,
  setFormFields: state.setFormFields,
})

export function FormEditor() {
  const [activeFormField, setActiveFormField] =
    React.useState<FormField | null>(null)
  const { formFields, setFormFields } = useFormStore(useShallow(selector))

  const formSchema = React.useMemo(
    () => generateZodSchema(formFields),
    [formFields]
  )
  const defaultValues = React.useMemo(
    () => generateDefaultValues(formFields),
    [formFields]
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  React.useEffect(() => {
    form.reset(defaultValues)
  }, [form, defaultValues])

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] overflow-auto rounded-md bg-slate-950 p-4">
          <code className="overflow-auto text-white">
            {JSON.stringify(values, null, 2)}
          </code>
        </pre>
      ),
    })
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
      {formFields.length !== 0 ? (
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
      ) : (
        <div className="grid place-items-center p-4">
          <h3 className="text-2xl font-semibold">No Fields were added</h3>
          <p className="text-muted-foreground">
            Select fields from the sidebar...
          </p>
        </div>
      )}
    </DndContext>
  )
}
