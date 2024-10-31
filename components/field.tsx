import * as React from "react"
import { GripVertical } from "lucide-react"
import type { UseFormReturn } from "react-hook-form"

import type { FormField as FormFieldType } from "@/types/field"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form"
import { renderFormFieldComponent } from "@/components/render-form-field-component"

export interface FieldProps {
  formField: FormFieldType
  form?: UseFormReturn<
    {
      [x: string]: any
    },
    any,
    undefined
  >
  style?: React.CSSProperties
  isDragging?: boolean
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ formField, form, style, isDragging, ...props }, ref) => {
    return (
      <div
        className={cn("flex items-center gap-2", {
          "rounded-md bg-muted opacity-60": isDragging,
        })}
        style={style}
        ref={ref}
      >
        <div className="w-full">
          <FormField
            control={form?.control}
            name={formField.name}
            render={({ field }) =>
              renderFormFieldComponent({ field, formField })
            }
          />
        </div>
        <Button size="icon" variant="ghost" type="button" {...props}>
          <GripVertical className="size-4" />
        </Button>
      </div>
    )
  }
)

Field.displayName = "Field"
