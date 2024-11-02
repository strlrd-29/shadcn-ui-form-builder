import { FieldType, type FormField } from "@/types/field"
import { getZodSchemaString } from "@/lib/form-schema"
import { generateCodeSnippet } from "@/components/generate-form-field-code"

const generateImports = (formFields: FormField[]) => {
  const importSet = new Set([
    `"use client"\n`,
    `import * as React from 'react'`,
    `import { zodResolver } from "@hookform/resolvers/zod"`,
    `import { useForm } from "react-hook-form"`,
    `import { z } from "zod"\n`,
    `import { cn } from "@/lib/utils"`,
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
        importSet.add(`import { ChevronsUpDownIcon } from "lucide-react"`)
        break
      case FieldType.SLIDER:
        importSet.add(`import { Slider } from "@/components/ui/slider"`)
        break
    }
  })

  return importSet
}

export const generateFormCode = (formFields: FormField[]) => {
  const imports = Array.from(generateImports(formFields)).join("\n")
  const formSchema = getZodSchemaString(formFields)
  const component = `
export default function MyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.info(values);
    } catch (error) {
      console.error("Form submission error", error);
    }
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
