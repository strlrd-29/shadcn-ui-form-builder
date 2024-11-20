import { encodeJson } from "@/lib/encode-decode"
import { generateFormCode } from "@/lib/generate-form-code"
import { db } from "@/db"
import { forms, InsertForms } from "@/db/schema/forms"

import type { FormField } from "@/types/field"
import { RegistryItemType, type RegistryType } from "@/types/registry"

export const generateRegistryJson = async (formFields: FormField[]) => {
  const formCode = generateFormCode(formFields)

  const registryDependencies: Set<string> = new Set()

  formFields.forEach((field) => {
    field.registryDependencies.forEach(
      registryDependencies.add,
      registryDependencies
    )
  })

  const registryJson: RegistryType = {
    name: "my-form",
    type: RegistryItemType.COMPONENT,
    registryDependencies: Array.from(registryDependencies),
    files: [
      {
        path: "my-form.tsx",
        type: RegistryItemType.COMPONENT,
        content: formCode,
      },
    ],
  }

  const encodedJson = encodeJson(registryJson)

  const newForm: InsertForms = {
    content: encodedJson,
  }

  const res = await db.insert(forms).values(newForm).returning()

  return res[0].id
}
