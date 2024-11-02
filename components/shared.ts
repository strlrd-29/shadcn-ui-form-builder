import * as React from "react"
import { jsx, jsxs } from "react/jsx-runtime"
import { toJsxRuntime } from "hast-util-to-jsx-runtime"
import { codeToHast } from "shiki/bundle/web"

export async function highlight(code: string) {
  const out = await codeToHast(code, {
    lang: "tsx",
    theme: "kanagawa-dragon",
  })

  return toJsxRuntime(out, {
    Fragment: React.Fragment,
    jsx,
    jsxs,
  })
}
