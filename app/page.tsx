import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/code-block"
import { EditFormField } from "@/components/edit-form-field"
import { FormEditor } from "@/components/form-editor"
import { SidebarLeft } from "@/components/sidebar-left"

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
        <Tabs defaultValue="preview">
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
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-1">
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
      </SidebarInset>
    </SidebarProvider>
  )
}
