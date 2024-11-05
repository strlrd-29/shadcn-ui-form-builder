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
        fieldSchema = z.boolean()
        break
      case FieldType.SELECT:
        fieldSchema = z.string()
        break
      case FieldType.DATE:
        fieldSchema = z.date()
        break
      case FieldType.RADIO_GROUP:
        fieldSchema = z.string()
        break
      case FieldType.SWITCH:
        fieldSchema = z.boolean()
        break
      case FieldType.COMBOBOX:
        fieldSchema = z.string()
        break
      case FieldType.SLIDER:
        fieldSchema = z.coerce.number()
        break
    }
    formSchemaObject[field.name] = fieldSchema
  })

  return z.object(formSchemaObject)
}

export const generateDefaultValues = (
  formFields: FormField[]
): Record<string, any> => {
  const defaultValues: Record<string, any> = {}

  formFields.forEach((field) => {
    if (field.default) {
      defaultValues[field.name] = field.default
    }
  })

  return defaultValues
}

export const zodSchemaToString = (schema: z.ZodTypeAny): string => {
  if (schema instanceof z.ZodDefault) {
    return `${zodSchemaToString(schema._def.innerType)}.default(${JSON.stringify(schema._def.defaultValue())})`
  }

  if (schema instanceof z.ZodBoolean) {
    return `z.boolean()`
  }

  if (schema instanceof z.ZodNumber) {
    let result = "z.coerce.number()"
    if ("checks" in schema._def) {
      schema._def.checks.forEach((check: z.ZodNumberCheck) => {
        if (check.kind === "min") {
          result += `.min(${check.value})`
        } else if (check.kind === "max") {
          result += `.max(${check.value})`
        }
      })
    }
    return result
  }

  if (schema instanceof z.ZodString) {
    let result = "z.string()"
    if ("checks" in schema._def) {
      schema._def.checks.forEach((check: z.ZodStringCheck) => {
        if (check.kind === "min") {
          result += `.min(${check.value})`
        } else if (check.kind === "max") {
          result += `.max(${check.value})`
        } else if (check.kind === "email") {
          result += `.email()`
        }
      })
    }
    return result
  }

  if (schema instanceof z.ZodDate) {
    return `z.coerce.date()`
  }

  if (schema instanceof z.ZodObject) {
    const shape = schema.shape
    const shapeStrs = Object.entries(shape).map(
      ([key, value]) => `${key}: ${zodSchemaToString(value as z.ZodTypeAny)}`
    )
    return `z.object({
  ${shapeStrs.join(",\n  ")}
})`
  }

  if (schema instanceof z.ZodOptional) {
    return `${zodSchemaToString(schema.unwrap())}.optional()`
  }

  return "z.unknown()"
}

export const getZodSchemaString = (formFields: FormField[]): string => {
  const schema = generateZodSchema(formFields)
  const schemaEntries = Object.entries(schema.shape)
    .map(([key, value]) => {
      return `  ${key.replaceAll(" ", "_")}: ${zodSchemaToString(value as z.ZodTypeAny)}`
    })
    .join(",\n")

  return `const formSchema = z.object({\n${schemaEntries}\n})`
}
