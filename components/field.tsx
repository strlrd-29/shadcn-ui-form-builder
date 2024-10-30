import { ControllerRenderProps, UseFormReturn } from "react-hook-form"

import { FieldType, FormField as FormFieldType } from "@/types/field"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

interface RenderFormFieldComponentProps {
  formField: FormFieldType
  field: ControllerRenderProps<
    {
      [x: string]: any
    },
    string
  >
}

function renderFormFieldComponent({
  formField,
  field,
}: RenderFormFieldComponentProps) {
  switch (formField.type) {
    case FieldType.INPUT:
      return (
        <FormItem>
          <FormLabel>{formField.label}</FormLabel>
          <FormControl>
            <Input placeholder={formField.placeholder} {...field} />
          </FormControl>
          <FormDescription>{formField.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )
    case FieldType.TEXTAREA:
      return (
        <FormItem>
          <FormLabel>{formField.label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={formField.placeholder}
              className="resize-none"
              {...field}
            />
          </FormControl>
          <FormDescription>{formField.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )
    case FieldType.NUMBER_INPUT:
      return (
        <FormItem>
          <FormLabel>{formField.label}</FormLabel>
          <FormControl>
            <Input
              placeholder={formField.placeholder}
              {...field}
              type="number"
            />
          </FormControl>
          <FormDescription>{formField.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )
    case FieldType.EMAIL:
      return (
        <FormItem>
          <FormLabel>{formField.label}</FormLabel>
          <FormControl>
            <Input placeholder={formField.placeholder} {...field} />
          </FormControl>
          <FormDescription>{formField.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )
  }
}

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

export function Field({ formField, form }: FieldProps) {
  return (
    <FormField
      control={form.control}
      name={formField.name}
      render={({ field }) => renderFormFieldComponent({ field, formField })}
    />
  )
}
