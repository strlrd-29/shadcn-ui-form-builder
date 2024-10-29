import {
  Calendar,
  ChevronsUpDown,
  CircleCheck,
  Ellipsis,
  SlidersHorizontal,
  Text,
  ToggleLeft,
  Type,
} from "lucide-react"

import type { FieldType } from "@/types/field"

export const fields: FieldType[] = [
  {
    name: "Input",
    Icon: Type,
  },
  {
    name: "Textarea",
    Icon: Text,
  },
  {
    name: "Select",
    Icon: ChevronsUpDown,
  },
  {
    name: "Date Picker",
    Icon: Calendar,
  },
  {
    name: "Checkbox",
    Icon: CircleCheck,
  },
  {
    name: "Switch",
    Icon: ToggleLeft,
  },
  {
    name: "Radio Group",
    Icon: Ellipsis,
  },
  {
    name: "Slider",
    Icon: SlidersHorizontal,
  },
  {
    name: "Combobox",
    Icon: ChevronsUpDown,
  },
]
