import { create } from "zustand"

import { FormState } from "@/types/form-store"

export const useFormStore = create<FormState>((set, get) => ({
  formFields: [],
  setFormFields(fields) {
    set({ formFields: fields })
  },
  addFormField: (formField) => {
    set({ formFields: [...get().formFields, formField] })
  },
  deleteFormField: (fieldName) => {
    set({
      formFields: get().formFields.filter(
        (formField) => formField.name !== fieldName
      ),
    })
  },
}))
