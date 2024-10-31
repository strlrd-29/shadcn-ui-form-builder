import {
  AtSignIcon,
  CalendarIcon,
  ChevronsUpDownIcon,
  CircleDotIcon,
  HashIcon,
  LockIcon,
  SquareCheckIcon,
  TextIcon,
  ToggleLeftIcon,
  TypeIcon,
} from "lucide-react"

import { FieldType, type FormField } from "@/types/field"

export const fields: FormField[] = [
  {
    type: FieldType.INPUT,
    name: "Input",
    label: "Username",
    placeholder: "shadcn",
    description: "This is your public display name.",
    Icon: TypeIcon,
  },
  {
    type: FieldType.TEXTAREA,
    name: "Textarea",
    label: "Bio",
    placeholder: "Tell us a little bit about yourself",
    description: "You can @mention other users and organizations.",
    Icon: TextIcon,
  },
  {
    type: FieldType.NUMBER_INPUT,
    name: "Number Input",
    label: "Age",
    placeholder: "24",
    description: "Input your age in dog years.",
    Icon: HashIcon,
  },
  {
    type: FieldType.EMAIL,
    name: "Email",
    label: "Email",
    placeholder: "m@example.com",
    description: "We won't spam you, we promise.",
    Icon: AtSignIcon,
  },
  {
    type: FieldType.CHECKBOX,
    name: "Checkbox",
    label: "Use different settings for my mobile devices",
    description:
      "You can manage your mobile notifications in the mobile settings page.",
    Icon: SquareCheckIcon,
  },
  {
    type: FieldType.SELECT,
    name: "Select",
    label: "Email",
    placeholder: "Select a verified email to display",
    description: "You can manage email addresses in your email settings.",
    Icon: ChevronsUpDownIcon,
    choices: [
      {
        value: "m@example.com",
        label: "m@example.com",
      },
      {
        value: "m@google.com",
        label: "m@google.com",
      },
      {
        value: "m@support.com",
        label: "m@support.com",
      },
    ],
  },
  {
    type: FieldType.DATE,
    name: "Date",
    label: "Date of birth",
    description: "Your date of birth is used to calculate your age.",
    Icon: CalendarIcon,
  },
  {
    type: FieldType.RADIO_GROUP,
    name: "Radio Group",
    label: "Notify me about...",
    Icon: CircleDotIcon,
    choices: [
      {
        value: "all",
        label: "All new messages",
      },
      {
        value: "mentions",
        label: "Direct messages and mentions",
      },
      {
        value: "none",
        label: "Nothing",
      },
    ],
  },
  {
    type: FieldType.SWITCH,
    name: "Switch",
    label: "Marketing emails",
    description: "Receive emails about new products, features, and more.",
    Icon: ToggleLeftIcon,
  },
  {
    type: FieldType.COMBOBOX,
    name: "Combobox",
    label: "Language",
    Icon: ChevronsUpDownIcon,
    description: "This is the language that will be used in the dashboard.",
    choices: [
      { label: "English", value: "en" },
      { label: "French", value: "fr" },
      { label: "German", value: "de" },
      { label: "Spanish", value: "es" },
      { label: "Portuguese", value: "pt" },
      { label: "Russian", value: "ru" },
      { label: "Japanese", value: "ja" },
      { label: "Korean", value: "ko" },
      { label: "Chinese", value: "zh" },
    ],
  },
  {
    type: FieldType.PASSWORD,
    name: "Password",
    label: "Password",
    placeholder: "super-secret-123",
    description: "Enter your password.",
    Icon: LockIcon,
  },
]
