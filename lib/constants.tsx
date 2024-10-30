import { AtSign, Hash, SquareCheck, Text, Type } from "lucide-react"

import { FieldType, type FormField } from "@/types/field"

export const fields: FormField[] = [
  {
    type: FieldType.INPUT,
    name: "Input",
    label: "Username",
    placeholder: "shadcn",
    description: "This is your public display name.",
    Icon: Type,
  },
  {
    type: FieldType.TEXTAREA,
    name: "Textarea",
    label: "Bio",
    placeholder: "Tell us a little bit about yourself",
    description: "You can @mention other users and organizations.",
    Icon: Text,
  },
  {
    type: FieldType.NUMBER_INPUT,
    name: "Number Input",
    label: "Age",
    placeholder: "24",
    description: "Input your age in dog years.",
    Icon: Hash,
  },
  {
    type: FieldType.EMAIL,
    name: "Email",
    label: "Email",
    placeholder: "m@example.com",
    description: "We won't spam you, we promise.",
    Icon: AtSign,
  },
  {
    type: FieldType.CHECKBOX,
    name: "Checkbox",
    label: "Use different settings for my mobile devices",
    description:
      "You can manage your mobile notifications in the mobile settings page.",
    Icon: SquareCheck,
  },
]
