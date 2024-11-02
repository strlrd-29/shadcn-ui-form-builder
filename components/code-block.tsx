import { codeToHtml } from "shiki"
import type { BundledLanguage, BundledTheme } from "shiki"

import { CopyBtn } from "@/components/copy-btn"

type Props = {
  code: string
  lang?: BundledLanguage
  theme?: BundledTheme
}

export async function CodeBlock({
  code = `

console.info("hello world")

`,
  lang = "tsx",
  theme = "github-dark",
}: Props) {
  const html = await codeToHtml(code, {
    lang,
    theme,
  })

  return (
    <div className="relative">
      <CopyBtn value={code} />
      <div
        className="[&>pre]:rounded-b-md [&>pre]:p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
