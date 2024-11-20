export enum RegistryItemType {
  STYLE = "registry:style",
  LIB = "registry:lib",
  EXAMPLE = "registry:example",
  BLOCK = "registry:block",
  COMPONENT = "registry:component",
  UI = "registry:ui",
  HOOK = "registry:hook",
  THEME = "registry:theme",
  PAGE = "registry:page",
}

type RegistryItemFileType = {
  path: string
  content: string
  type: RegistryItemType
}

export type RegistryType = {
  name: string
  type: RegistryItemType
  dependencies?: string[]
  devDependencies?: string[]
  registryDependencies?: string[]
  files: RegistryItemFileType[]
}
