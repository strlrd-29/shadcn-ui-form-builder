import * as React from "react"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { FormEditor } from "@/components/form-editor"
import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarRight } from "@/components/sidebar-right"

export default function Home() {
  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset className="px-4">
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
          <div className="flex flex-1 items-center gap-2">
            <SidebarTrigger />
          </div>
        </header>
        <div className="mx-auto flex w-full flex-col gap-4 rounded-md border shadow-sm md:w-2/3">
          <div className="flex items-center gap-1.5 border-b p-4">
            <div
              className="h-2.5 w-2.5 rounded-full bg-red-500"
              data-v-241c1152=""
            ></div>
            <div
              className="h-2.5 w-2.5 rounded-full bg-yellow-500"
              data-v-241c1152=""
            ></div>
            <div
              className="h-2.5 w-2.5 rounded-full bg-green-500"
              data-v-241c1152=""
            ></div>
          </div>
          <FormEditor />
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  )
}
