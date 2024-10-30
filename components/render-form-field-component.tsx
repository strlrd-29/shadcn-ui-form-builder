import type { ControllerRenderProps } from "react-hook-form"

import { FieldType, type FormField as FormFieldType } from "@/types/field"
import { Checkbox } from "@/components/ui/checkbox"
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FormFieldWrapper } from "@/components/form-field-wrapper"

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
      return (
        <FormFieldWrapper {...formField}>
          <Input placeholder={formField.placeholder} {...field} />
        </FormFieldWrapper>
      )

    case FieldType.TEXTAREA:
      return (
        <FormFieldWrapper {...formField}>
          <Textarea
            placeholder={formField.placeholder}
            className="resize-none"
            {...field}
          />
        </FormFieldWrapper>
      )
    case FieldType.NUMBER_INPUT:
      return (
        <FormFieldWrapper {...formField}>
          <Input placeholder={formField.placeholder} {...field} type="number" />
        </FormFieldWrapper>
      )
    case FieldType.EMAIL:
      return (
        <FormFieldWrapper {...formField}>
          <Input placeholder={formField.placeholder} {...field} />
        </FormFieldWrapper>
      )
    case FieldType.CHECKBOX:
      return (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{formField.label}</FormLabel>
            <FormDescription>{formField.description}</FormDescription>
          </div>
        </FormItem>
      )
    case FieldType.SELECT:
      return (
        <FormItem>
          <FormLabel>{formField.label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={formField.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {formField.choices.map((choice) => (
                <SelectItem value={choice.value} key={choice.value}>
                  {choice.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{formField.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )
  }
}
