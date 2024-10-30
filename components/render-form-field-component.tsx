import type { ControllerRenderProps } from "react-hook-form"

import { FieldType, type FormField as FormFieldType } from "@/types/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface RenderFormFieldComponentProps {
  formField: FormFieldType
  field: ControllerRenderProps<
    {
      [x: string]: any
    },
    string
  >
}

export function renderFormFieldComponent({
  formField,
  field,
}: RenderFormFieldComponentProps) {
  switch (formField.type) {
    case FieldType.INPUT:
      return <Input placeholder={formField.placeholder} {...field} />
    case FieldType.TEXTAREA:
      return (
        <Textarea
          placeholder={formField.placeholder}
          className="resize-none"
          {...field}
        />
      )
    case FieldType.NUMBER_INPUT:
      return (
        <Input placeholder={formField.placeholder} {...field} type="number" />
      )
    case FieldType.EMAIL:
      return <Input placeholder={formField.placeholder} {...field} />
  }
}
