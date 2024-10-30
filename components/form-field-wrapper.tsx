import * as React from "react"

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

interface FormFieldWrapperProps {
  label: string
  description?: string
  children: React.ReactNode
}

export function FormFieldWrapper({
  children,
  label,
  description,
}: FormFieldWrapperProps) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>{children}</FormControl>
      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  )
}
