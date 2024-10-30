import * as React from "react"
import type { UseFormReturn } from "react-hook-form"

import type { FormField as FormFieldType } from "@/types/field"
import { FormField } from "@/components/ui/form"
import { renderFormFieldComponent } from "@/components/render-form-field-component"

interface FieldProps {
  formField: FormFieldType
  form: UseFormReturn<
    {
      [x: string]: any
    },
    any,
    undefined
  >
}

export const Field = React.memo(({ formField, form }: FieldProps) => {
  return (
    <FormField
      control={form.control}
      name={formField.name}
      render={({ field }) => renderFormFieldComponent({ field, formField })}
    />
  )
})

Field.displayName = "Field"
