"use client"

import * as React from "react"
import { useFormStore } from "@/stores/form"
import {
  CheckIcon,
  CopyIcon,
  LoaderIcon,
  SquareTerminalIcon,
} from "lucide-react"

import { api } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { TooltipWrapper } from "./tooltip-wrapper"

export function Cli() {
  const { toast } = useToast()
  const formFields = useFormStore((state) => state.formFields)
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasCopied, setHasCopied] = React.useState(false)
  const command = React.useMemo(
    () => `npx shadcn@latest add "https://forms.ouassim.tech/api/registry?id=`,
    []
  )

  const copyCommand = React.useCallback(async () => {
    setIsLoading(true)
    await api
      .post("/registry", formFields)
      .then(({ data }) => {
        navigator.clipboard.writeText(`${command}${data.id}"`)
        setHasCopied(true)
        toast({
          description: "Command copied successfully!",
        })
      })
      .catch(() =>
        toast({
          title: "Oops! Something went wrong.",
          variant: "destructive",
        })
      )
      .finally(() => setIsLoading(false))
  }, [formFields, command, toast])

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <Dialog>
      <TooltipWrapper text="Use Shadcn CLI">
        <DialogTrigger asChild>
          <Button size="sm" className="absolute bottom-2 right-4">
            CLI
            <SquareTerminalIcon className="size-4" />
          </Button>
        </DialogTrigger>
      </TooltipWrapper>
      <DialogContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Add through the shadcn CLI</DialogTitle>
          <DialogDescription>
            Use the cli to automatically add the component to your code base,
            instead of copy pasting the code and installing the required
            dependencies and adding missing shadcn components.
          </DialogDescription>
        </DialogHeader>
        <button
          className="hover:border-alpha-600 flex h-8 w-full items-center justify-between gap-1 truncate rounded-md border px-3 pr-1.5 text-left font-mono text-sm font-normal transition-all disabled:pointer-events-none disabled:opacity-50"
          onClick={copyCommand}
          disabled={isLoading}
        >
          <span className="flex-1 truncate">{command}</span>
          {isLoading ? (
            <LoaderIcon className="size-3 animate-spin" />
          ) : hasCopied ? (
            <CheckIcon className="size-3" />
          ) : (
            <CopyIcon className="size-3" />
          )}
        </button>
      </DialogContent>
    </Dialog>
  )
}
