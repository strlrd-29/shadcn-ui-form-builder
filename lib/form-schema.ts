import * as z from "zod"

import { FieldType, FormField } from "@/types/field"

export function generateZodSchema(formFields: FormField[]) {
  const formSchemaObject: Record<string, z.ZodType<any, any>> = {}
  formFields.forEach((field) => {
    let fieldSchema: z.ZodTypeAny
    switch (field.type) {
      case FieldType.INPUT:
        fieldSchema = z.string()
        break
      case FieldType.TEXTAREA:
        fieldSchema = z.string()
        break
      case FieldType.NUMBER_INPUT:
        fieldSchema = z.coerce.number()
        break
      case FieldType.EMAIL:
        fieldSchema = z.string().email()
        break
      case FieldType.CHECKBOX:
        fieldSchema = z.boolean().default(false)
    }
    formSchemaObject[field.name] = fieldSchema as z.ZodTypeAny // Ensure fieldSchema is of type ZodTypeAny
  })

  return z.object(formSchemaObject)
}
