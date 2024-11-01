import * as React from "react"
import { useFormStore } from "@/stores/form"
import { GripVertical, Trash2 } from "lucide-react"
import type { UseFormReturn } from "react-hook-form"
import { useShallow } from "zustand/shallow"

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
    const deleteFormfield = useFormStore(
      useShallow((state) => state.deleteFormField)
    )
    return (
      <div
        className={cn("group relative flex items-center gap-2 rounded-md", {
          "rounded-md bg-muted opacity-60": isDragging,
        })}
        style={style}
        ref={ref}
      >
        <Button
          size="icon"
          variant="ghost"
          className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={() => deleteFormfield(formField.name)}
        >
          <Trash2 className="size-4" />
        </Button>
        <div className="w-full">
          <FormField
            control={form?.control}
            name={formField.name}
            render={({ field }) =>
              renderFormFieldComponent({ field, formField })
            }
          />
        </div>
        <Button
          size="icon"
          variant="ghost"
          type="button"
          {...props}
          className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <GripVertical className="size-4" />
        </Button>
      </div>
    )
  }
)

Field.displayName = "Field"
