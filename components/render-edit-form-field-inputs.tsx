import * as React from "react"
import { useFormStore } from "@/stores/form"
import { format } from "date-fns"
import { produce } from "immer"
import { CalendarIcon, Plus, Trash2 } from "lucide-react"
import { useShallow } from "zustand/shallow"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { FieldType, type FormField } from "@/types/field"

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
          <div>
            <Label htmlFor="default">Default</Label>
            <Input
              id="default"
              value={selectedField.default as string}
              placeholder="input your default value here..."
              onChange={(e) =>
                updateFormField({
                  ...selectedField,
                  default: e.target.value,
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
              placeholder="placeholder goes here..."
              value={selectedField.placeholder}
              onChange={(e) =>
                updateFormField({
                  ...selectedField,
                  placeholder: e.target.value,
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="default">Default</Label>
            <Input
              id="default"
              value={selectedField.default as string}
              type="number"
              placeholder="input your default value here"
              onChange={(e) =>
                updateFormField({
                  ...selectedField,
                  default: parseFloat(e.target.value),
                })
              }
            />
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
          <div>
            <Label htmlFor="default">Default</Label>
            <Select
              onValueChange={(value) => {
                updateFormField({
                  ...selectedField,
                  default: value,
                })
              }}
              value={selectedField.default as string}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a default value" />
              </SelectTrigger>
              <SelectContent>
                {selectedField.choices.map((choice, idx) => (
                  <SelectItem
                    value={choice.value !== "" ? choice.value : "hello"}
                    key={idx}
                  >
                    {choice.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      )
    case FieldType.SWITCH:
    case FieldType.CHECKBOX:
      return (
        <>
          <div>
            <Label htmlFor="default">Default</Label>
            <div className="flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
              <button
                className="flex w-full items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
                data-state={selectedField.default ? "inactive" : "active"}
                onClick={() => {
                  updateFormField({
                    ...selectedField,
                    default: false,
                  })
                }}
              >
                False
              </button>
              <button
                className="flex w-full items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
                data-state={selectedField.default ? "active" : "inactive"}
                onClick={() => {
                  updateFormField({
                    ...selectedField,
                    default: true,
                  })
                }}
              >
                True
              </button>
            </div>
          </div>
        </>
      )
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
          <div>
            <Label htmlFor="default">Default</Label>
            <Input
              id="default"
              value={selectedField.default as string}
              type="number"
              placeholder="input your default value here"
              onChange={(e) =>
                updateFormField({
                  ...selectedField,
                  default: parseFloat(e.target.value),
                })
              }
            />
          </div>
        </>
      )
    case FieldType.DATE:
      return (
        <>
          <div className="flex flex-col gap-1">
            <Label htmlFor="default">Default</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "pl-3 text-left font-normal",
                    !selectedField.default && "text-muted-foreground"
                  )}
                  id="default"
                >
                  {selectedField.default ? (
                    format(selectedField.default as string, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedField.default as Date}
                  onSelect={(date) =>
                    updateFormField({
                      ...selectedField,
                      default: date,
                    })
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
        </>
      )
  }
}
