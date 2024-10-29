import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarRight } from "@/components/sidebar-right"

export default function Home() {
  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    My Form
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 rounded-md border shadow-sm">
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
          <div className="flex flex-col gap-4 p-4">
            <div className="mx-auto h-24 w-full max-w-4xl rounded-xl bg-muted/50" />
            <div className="mx-auto h-64 w-full max-w-4xl rounded-xl bg-muted/50" />
          </div>
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  )
}
