"use client"

import * as React from "react"
import { CheckIcon, ClipboardIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

interface CopyButtonProps {
  value: string
}

export async function copyToClipboard(value: string) {
  navigator.clipboard.writeText(value)
}

export function CopyBtn({ value }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => {
        copyToClipboard(value)
        setHasCopied(true)
      }}
      className="absolute right-4 top-4 invert dark:invert-0 [&_svg]:h-4 [&_svg]:w-4"
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
    </Button>
  )
}
