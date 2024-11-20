import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClearForm } from "@/components/clear-form"
import { Cli } from "@/components/cli"
import { CodeBlock } from "@/components/code-block"
import { EditFormField } from "@/components/edit-form-field"
import { FormEditor } from "@/components/form-editor"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"
import { SidebarLeft } from "@/components/sidebar-left"

export default async function Home() {
  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset className="overflow-x-hidden px-4">
        <header className="sticky top-0 flex h-14 shrink-0 items-center justify-between gap-2 bg-background">
          <div className="flex flex-1 items-center gap-2">
            <SidebarTrigger />
          </div>
          <div className="flex items-center gap-1">
            <Link
              href="https://github.com/strlrd-29/shadcn-ui-form-builder"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "h-8 w-8 px-0"
                )}
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href="https://x.com/strlrd29"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "h-8 w-8 px-0"
                )}
              >
                <Icons.twitter className="h-3 w-3 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <ModeToggle />
          </div>
        </header>
        <Tabs defaultValue="preview" className="flex-1">
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 rounded-md border shadow-sm">
            <div className="flex items-center gap-1.5 border-b p-4">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
              <ClearForm />
            </div>
            <TabsList className="relative w-full justify-start rounded-none border-b bg-transparent p-1">
              <TabsTrigger
                value="preview"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Code
              </TabsTrigger>
              <Cli />
            </TabsList>
            <TabsContent value="preview">
              <FormEditor />
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock />
            </TabsContent>
          </div>
        </Tabs>
        <EditFormField />
        <footer className="mb-4 mt-8 text-center text-muted-foreground">
          <p>
            Built by{" "}
            <Link
              target="_blank"
              href="https://www.ouassim.tech"
              className="underline"
            >
              ouassim.
            </Link>{" "}
            The source code is availabe on{" "}
            <Link
              target="_blank"
              href="https://github.com/strlrd-29/shadcn-ui-form-builder"
              className="underline"
            >
              GitHub.
            </Link>
          </p>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  )
}
