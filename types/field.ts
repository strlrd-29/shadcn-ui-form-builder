import type { ForwardRefExoticComponent, RefAttributes } from "react"
import type { LucideProps } from "lucide-react"

export enum FieldType {
  INPUT = "INPUT",
  TEXTAREA = "TEXTAREA",
  NUMBER_INPUT = "NUMBER_INPUT",
  EMAIL = "EMAIL",
}

interface FormFieldBaseType {
  type: FieldType
  name: string
  label: string
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >
  description?: string
  placeholder?: string
  required?: boolean
  default?: string | number | boolean
}

export interface InputFormFieldType extends FormFieldBaseType {
  type: FieldType.INPUT
  password?: boolean
  maxChars?: number
}

export interface TextareaFormFieldType extends FormFieldBaseType {
  type: FieldType.TEXTAREA
  maxChars?: number
}

export interface NumberInputFormFieldType extends FormFieldBaseType {
  type: FieldType.NUMBER_INPUT
  min?: number
  max?: number
}

export interface EmailFormFieldType extends FormFieldBaseType {
  type: FieldType.EMAIL
}

export type FormField =
  | InputFormFieldType
  | TextareaFormFieldType
  | NumberInputFormFieldType
  | EmailFormFieldType