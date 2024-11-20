import type { FormField } from "@/types/field"
import { RegistryItemType, type RegistryType } from "@/types/registry"
import { generateFormCode } from "@/lib/generate-form-code"

export const generateRegistryJson = (formFields: FormField[]) => {
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

  return registryJson
}
