import * as React from "react"
import { useFormStore } from "@/stores/form"
import { produce } from "immer"
import { Plus, Trash2 } from "lucide-react"
import { useShallow } from "zustand/shallow"

import { FieldType, type FormField } from "@/types/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"

interface RenderEditFormFieldInputsProps {
  selectedField: FormField
}

export const RenderEditFormFieldInputs = ({
  selectedField,
}: RenderEditFormFieldInputsProps) => {
  const updateFormField = useFormStore(
    useShallow((state) => state.updateFormField)
  )

  const updateChoiceItemValue = React.useCallback(
    (idx: number, value: string) => {
      switch (selectedField.type) {
        case FieldType.SELECT:
        case FieldType.RADIO_GROUP:
        case FieldType.COMBOBOX:
          const newSelectedField = produce(selectedField, (draft) => {
            const choice = draft.choices.at(idx)
            if (choice) choice.value = value
          })
          updateFormField({ ...newSelectedField })
          break
      }
    },
    [selectedField, updateFormField]
  )

  const updateChoiceItemLabel = React.useCallback(
    (idx: number, label: string) => {
      switch (selectedField.type) {
        case FieldType.SELECT:
        case FieldType.RADIO_GROUP:
        case FieldType.COMBOBOX:
          const newSelectedField = produce(selectedField, (draft) => {
            const choice = draft.choices.at(idx)
            if (choice) choice.label = label
          })
          updateFormField({ ...newSelectedField })
          break
      }
    },
    [selectedField, updateFormField]
  )

  const addChoiceItem = React.useCallback(() => {
    switch (selectedField.type) {
      case FieldType.SELECT:
      case FieldType.RADIO_GROUP:
      case FieldType.COMBOBOX:
        updateFormField({
          ...selectedField,
          choices: [
            ...selectedField.choices,
            { value: "value", label: "label" },
          ],
        })
        break
    }
  }, [selectedField, updateFormField])

  const deleteChoiceItem = React.useCallback(
    (idx: number) => {
      switch (selectedField.type) {
        case FieldType.SELECT:
        case FieldType.RADIO_GROUP:
        case FieldType.COMBOBOX:
          const newSelectedField = produce(selectedField, (draft) => {
            draft.choices.splice(idx, 1)
          })
          updateFormField({
            ...newSelectedField,
          })
          break
      }
    },
    [selectedField, updateFormField]
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
      return (
        <>
          <ScrollArea>
            <div className="max-h-96 space-y-2">
              <Label>Possible values</Label>
              {selectedField.choices.map((choice, idx) => (
                <div className="flex items-end gap-2" key={idx}>
                  <div>
                    <Label htmlFor={`label-${idx}`} className="text-xs">
                      Label
                    </Label>
                    <Input
                      id={`label-${idx}`}
                      placeholder="Label"
                      value={choice.label}
                      onChange={(e) =>
                        updateChoiceItemLabel(idx, e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`value-${idx}`} className="text-xs">
                      Value
                    </Label>
                    <Input
                      id={`value-${idx}`}
                      placeholder="Value"
                      value={choice.value}
                      onChange={(e) =>
                        updateChoiceItemValue(idx, e.target.value)
                      }
                    />
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteChoiceItem(idx)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              ))}
              <Button
                className="w-full gap-2"
                variant="outline"
                onClick={addChoiceItem}
              >
                <Plus />
                Add
              </Button>
            </div>
          </ScrollArea>
        </>
      )
    case FieldType.SWITCH:
    case FieldType.CHECKBOX:
    case FieldType.DATE:
      return <p>hello world</p>
    case FieldType.SLIDER:
      return (
        <>
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
                    min: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="step">Step</Label>
              <Input
                id="step"
                placeholder="1"
                value={selectedField.step}
                onChange={(e) =>
                  updateFormField({
                    ...selectedField,
                    step: parseFloat(e.target.value),
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
                    max: parseFloat(e.target.value),
                  })
                }
              />
            </div>
          </div>
        </>
      )
  }
}
