import type { FormField } from "@/types/field"

export type FormState = {
  formFields: FormField[]
  setFormFields: (fields: FormField[]) => void
  deleteFormField: (fieldName: string) => void
  addFormField: (formField: FormField) => void
}
