import * as z from "zod"

import { FieldType, FormField } from "@/types/field"

const zodEnum = <T>(arr: T[]): [T, ...T[]] => arr as [T, ...T[]]

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
        break
      case FieldType.SELECT:
        fieldSchema = z.string()
        break
      case FieldType.DATE:
        fieldSchema = z.date()
        break
      case FieldType.RADIO_GROUP:
        const values = field.choices.map((choice) => choice.value as string)
        fieldSchema = z.enum(zodEnum(values))
        break
      case FieldType.SWITCH:
        fieldSchema = z.boolean().default(false)
        break
      case FieldType.COMBOBOX:
        fieldSchema = z.string()
        break
    }
    formSchemaObject[field.name] = fieldSchema
  })

  return z.object(formSchemaObject)
}
