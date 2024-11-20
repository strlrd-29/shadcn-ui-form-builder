"use client"

import * as React from "react"
import { useFormStore } from "@/stores/form"
import { useShallow } from "zustand/shallow"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { RenderEditFormFieldInputs } from "@/components/render-edit-form-field-inputs"

import { FormState } from "@/types/form-store"

const selector = (state: FormState) => ({
  isEditFormFieldOpen: state.isEditFormFieldOpen,
  setIsEditFormFieldOpen: state.setIsEditFormFieldOpen,
  selectedFormField: state.selectedFormField,
  updateFormField: state.updateFormField,
  formFields: state.formFields,
})

export function EditFormField() {
  const {
    isEditFormFieldOpen,
    setIsEditFormFieldOpen,
    selectedFormField,
    updateFormField,
    formFields,
  } = useFormStore(useShallow(selector))

  const selectedField = React.useMemo(() => {
    return formFields.find((f) => f.id === selectedFormField)
  }, [selectedFormField, formFields])

  return (
    <Sheet
      open={isEditFormFieldOpen}
      onOpenChange={setIsEditFormFieldOpen}
      modal={false}
    >
      {selectedFormField && selectedField && (
        <SheetContent
          withOverlay={false}
          onInteractOutside={(e) => e.preventDefault()}
          className="sm:max-w-lg"
        >
          <SheetHeader>
            <SheetTitle>Edit {selectedField.name} Field</SheetTitle>
            <SheetDescription>Update info about this field.</SheetDescription>
          </SheetHeader>
          <Separator className="my-4" />
          <div className="space-y-6">
            <div>
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                placeholder="your field label..."
                value={selectedField.label}
                onChange={(e) =>
                  updateFormField({
                    ...selectedField,
                    label: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="your field description..."
                value={selectedField.description}
                onChange={(e) =>
                  updateFormField({
                    ...selectedField,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="your field name..."
                value={selectedField.name}
                onChange={(e) =>
                  updateFormField({
                    ...selectedField,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <RenderEditFormFieldInputs selectedField={selectedField} />
          </div>
        </SheetContent>
      )}
    </Sheet>
  )
}
