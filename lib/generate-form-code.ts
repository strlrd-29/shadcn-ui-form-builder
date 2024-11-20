import { getZodSchemaString } from "@/lib/form-schema"
import { generateCodeSnippet } from "@/components/generate-form-field-code"

import { FieldType, type FormField } from "@/types/field"

const generateImports = (formFields: FormField[]) => {
  const importSet = new Set([
    `"use client"\n`,
    `import * as React from 'react'`,
    `import { zodResolver } from "@hookform/resolvers/zod"`,
    `import { useForm } from "react-hook-form"`,
    `import { z } from "zod"\n`,
    `import { cn } from "@/lib/utils"`,
    `import { toast } from "@/hooks/use-toast"`,
    `import { Button } from "@/components/ui/button"`,
    `import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"`,
  ])

  formFields.map((formField) => {
    switch (formField.type) {
      case FieldType.INPUT:
      case FieldType.NUMBER_INPUT:
      case FieldType.EMAIL:
        importSet.add(`import { Input } from "@/components/ui/input"`)
        break
      case FieldType.TEXTAREA:
        importSet.add(`import { Textarea } from "@/components/ui/textarea"`)
        break
      case FieldType.CHECKBOX:
        importSet.add(`import { Checkbox } from "@/components/ui/checkbox"`)
        break
      case FieldType.SELECT:
        importSet.add(`import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"`)
        break
      case FieldType.DATE:
        importSet.add(`import { Calendar } from "@/components/ui/calendar"`)
        importSet.add(`import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"`)
        importSet.add(`import { CalendarIcon } from "lucide-react"`)
        importSet.add(`import { format } from "date-fns"`)
        break
      case FieldType.RADIO_GROUP:
        importSet.add(
          `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`
        )
        break
      case FieldType.SWITCH:
        importSet.add(`import { Switch } from "@/components/ui/switch"`)
        break
      case FieldType.COMBOBOX:
        importSet.add(`import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"`)
        importSet.add(`import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"`)
        importSet.add(
          `import { ChevronsUpDownIcon, CheckIcon } from "lucide-react"`
        )
        break
      case FieldType.SLIDER:
        importSet.add(`import { Slider } from "@/components/ui/slider"`)
        break
    }
  })

  return importSet
}

export const generateConstants = (formFields: FormField[]): Set<string> => {
  const constantSet: Set<string> = new Set()

  formFields.forEach((field) => {
    if (field.type === FieldType.COMBOBOX) {
      constantSet.add(`const choices = [
    ${field.choices
      .map(
        (choice) => `{ label: "${choice.label}", value: "${choice.value}" },`
      )
      .join("\n\t")}
  ]`)
    }
  })

  return constantSet
}

export const generateDefaultValuesString = (fields: FormField[]): string => {
  const defaultValues: Record<string, any> = {}
  const dateFields: string[] = []

  fields.forEach((field) => {
    if (field.default) defaultValues[field.name] = field.default
  })

  if (Object.keys(defaultValues).length === 0 && dateFields.length === 0) {
    return ""
  }

  // Convert defaultValues to string, handling both regular values and date fields
  const regularValuesString =
    Object.keys(defaultValues).length > 0
      ? JSON.stringify(defaultValues, null, 6).slice(1, -1) // Remove the outer {}
      : ""

  const combinedString = regularValuesString

  return `defaultValues: {${combinedString}\t},`
}

export const generateFormCode = (formFields: FormField[]) => {
  const imports = Array.from(generateImports(formFields)).join("\n")
  const formSchema = getZodSchemaString(formFields)
  const constants = Array.from(generateConstants(formFields)).join("\n\n  ")
  const defaultValuesString = generateDefaultValuesString(formFields)
  const component = `
export function MyForm() {
  ${constants}
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    ${defaultValuesString}
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] overflow-auto rounded-md bg-slate-950 p-4">
          <code className="overflow-auto text-white">
            {JSON.stringify(values, null, 2)}
          </code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
        ${formFields.map((field) => generateCodeSnippet(field)).join("\n        ")}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
`
  return imports + "\n\n" + formSchema + "\n" + component
}
