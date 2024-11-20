import type { ForwardRefExoticComponent, RefAttributes } from "react"
import type { LucideProps } from "lucide-react"

export enum FieldType {
  INPUT = "INPUT",
  TEXTAREA = "TEXTAREA",
  NUMBER_INPUT = "NUMBER_INPUT",
  EMAIL = "EMAIL",
  CHECKBOX = "CHECKBOX",
  SELECT = "SELECT",
  DATE = "DATE",
  RADIO_GROUP = "RADIO_GROUP",
  SWITCH = "SWITCH",
  COMBOBOX = "COMBOBOX",
  SLIDER = "SLIDER",
}

interface FormFieldBaseType {
  id?: string
  type: FieldType
  name: string
  label: string
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >
  description?: string
  placeholder?: string
  required?: boolean
  default?: string | number | boolean | Date
  registryDependencies: string[]
}

export interface InputFormFieldType extends FormFieldBaseType {
  type: FieldType.INPUT
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

export interface CheckboxFormFieldType extends FormFieldBaseType {
  type: FieldType.CHECKBOX
}

export interface ChoiceItem {
  value: any
  label: string
}

export interface SelectFormFieldType extends FormFieldBaseType {
  type: FieldType.SELECT
  choices: ChoiceItem[]
}

export interface DateFormFieldType extends FormFieldBaseType {
  type: FieldType.DATE
}

export interface RadioGroupFormFieldType extends FormFieldBaseType {
  type: FieldType.RADIO_GROUP
  choices: ChoiceItem[]
}

export interface SwitchFormFieldType extends FormFieldBaseType {
  type: FieldType.SWITCH
}

export interface ComboboxFormFieldType extends FormFieldBaseType {
  type: FieldType.COMBOBOX
  choices: ChoiceItem[]
}

export interface SliderFormFieldType extends FormFieldBaseType {
  type: FieldType.SLIDER
  min: number
  max: number
  step: number
}

export type FormField =
  | InputFormFieldType
  | TextareaFormFieldType
  | NumberInputFormFieldType
  | EmailFormFieldType
  | CheckboxFormFieldType
  | SelectFormFieldType
  | DateFormFieldType
  | RadioGroupFormFieldType
  | SwitchFormFieldType
  | ComboboxFormFieldType
  | SliderFormFieldType
