import * as React from "react"
import { useFormStore } from "@/stores/form"
import { useShallow } from "zustand/shallow"

import { FieldType, type FormField } from "@/types/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface RenderEditFormFieldInputsProps {
  selectedField: FormField
}

export const RenderEditFormFieldInputs = ({
  selectedField,
}: RenderEditFormFieldInputsProps) => {
  const updateFormField = useFormStore(
    useShallow((state) => state.updateFormField)
  )

  switch (selectedField.type) {
    case FieldType.INPUT:
    case FieldType.TEXTAREA:
    case FieldType.EMAIL:
      return (
        <>
          <div>
            <Label htmlFor="placeholder">Placeholder</Label>
            <Input
              id="placeholder"
              value={selectedField.placeholder}
              onChange={(e) =>
                updateFormField({
                  ...selectedField,
                  placeholder: e.target.value,
                })
              }
            />
          </div>
        </>
      )
    case FieldType.NUMBER_INPUT:
      return (
        <>
          <div>
            <Label htmlFor="placeholder">Placeholder</Label>
            <Input
              id="placeholder"
              value={selectedField.placeholder}
              onChange={(e) =>
                updateFormField({
                  ...selectedField,
                  placeholder: e.target.value,
                })
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <div>
              <Label htmlFor="min">Minumum value</Label>
              <Input
                id="min"
                placeholder="0"
                value={selectedField.min}
                onChange={(e) =>
                  updateFormField({
                    ...selectedField,
                    min: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="max">Maximum value</Label>
              <Input
                id="max"
                placeholder="100"
                value={selectedField.max}
                onChange={(e) =>
                  updateFormField({
                    ...selectedField,
                    max: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </div>
        </>
      )
    case FieldType.SELECT:
    case FieldType.RADIO_GROUP:
    case FieldType.COMBOBOX:
    case FieldType.SWITCH:
    case FieldType.CHECKBOX:
    case FieldType.DATE:
    case FieldType.SLIDER:
      return <p>hello world</p>
  }
}
