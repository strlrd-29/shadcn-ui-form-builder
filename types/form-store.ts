import type { FormField } from "@/types/field"

export type FormState = {
  formFields: FormField[]
  setFormFields: (fields: FormField[]) => void
  deleteFormField: (id?: string) => void
  addFormField: (formField: FormField) => void
  selectedFormField?: string
  setSelectedFormField: (id?: string) => void
  isEditFormFieldOpen: boolean
  setIsEditFormFieldOpen: (open: boolean) => void
  updateFormField: (formField: FormField) => void
  clearFormFields: () => void
}
