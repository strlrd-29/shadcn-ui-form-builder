"use client"

import { useFormStore } from "@/stores/form"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ClearForm() {
  const clearFormFields = useFormStore((state) => state.clearFormFields)
  return (
    <Button
      className="ml-auto"
      size="sm"
      onClick={clearFormFields}
      variant="outline"
    >
      <Trash2 className="size-4" />
      Clear form fields
    </Button>
  )
}
