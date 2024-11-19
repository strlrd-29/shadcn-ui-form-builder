import pako from "pako"

const registry = {
  name: "accordion",
  type: "registry:ui",
  dependencies: ["@radix-ui/react-accordion"],
  files: [
    {
      path: "ui/accordion.tsx",
      content:
        '"use client"\n\nimport * as React from "react"\nimport * as AccordionPrimitive from "@radix-ui/react-accordion"\nimport { ChevronDown } from "lucide-react"\n\nimport { cn } from "@/lib/utils"\n\nconst Accordion = AccordionPrimitive.Root\n\nconst AccordionItem = React.forwardRef<\n  React.ElementRef<typeof AccordionPrimitive.Item>,\n  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>\n>(({ className, ...props }, ref) => (\n  <AccordionPrimitive.Item\n    ref={ref}\n    className={cn("border-b", className)}\n    {...props}\n  />\n))\nAccordionItem.displayName = "AccordionItem"\n\nconst AccordionTrigger = React.forwardRef<\n  React.ElementRef<typeof AccordionPrimitive.Trigger>,\n  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>\n>(({ className, children, ...props }, ref) => (\n  <AccordionPrimitive.Header className="flex">\n    <AccordionPrimitive.Trigger\n      ref={ref}\n      className={cn(\n        "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",\n        className\n      )}\n      {...props}\n    >\n      {children}\n      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />\n    </AccordionPrimitive.Trigger>\n  </AccordionPrimitive.Header>\n))\nAccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName\n\nconst AccordionContent = React.forwardRef<\n  React.ElementRef<typeof AccordionPrimitive.Content>,\n  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>\n>(({ className, children, ...props }, ref) => (\n  <AccordionPrimitive.Content\n    ref={ref}\n    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"\n    {...props}\n  >\n    <div className={cn("pb-4 pt-0", className)}>{children}</div>\n  </AccordionPrimitive.Content>\n))\nAccordionContent.displayName = AccordionPrimitive.Content.displayName\n\nexport { Accordion, AccordionItem, AccordionTrigger, AccordionContent }\n',
      type: "registry:ui",
      target: "",
    },
  ],
  tailwind: {
    config: {
      theme: {
        extend: {
          keyframes: {
            "accordion-down": {
              from: {
                height: "0",
              },
              to: {
                height: "var(--radix-accordion-content-height)",
              },
            },
            "accordion-up": {
              from: {
                height: "var(--radix-accordion-content-height)",
              },
              to: {
                height: "0",
              },
            },
          },
          animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
          },
        },
      },
    },
  },
}

function encodeJson(jsonData: object) {
  const jsonString = JSON.stringify(jsonData, null, 0)

  const compressed = pako.deflate(jsonString, { level: 9 })

  const base64 = btoa(String.fromCharCode(...compressed))
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

const decodeString = (encodedData: string) => {
  const base64 = encodedData.replace(/-/g, "+").replace(/_/g, "/")
  const binary = atob(base64)

  const compressed = Uint8Array.from(binary, (char) => char.charCodeAt(0))

  const decompressed = pako.inflate(compressed, { to: "string" })

  return JSON.parse(decompressed)
}

export async function GET() {
  // const searchParams = req.nextUrl.searchParams
  // const token = searchParams.get("token")
  const encodedJsonString = encodeJson(registry)
  console.info(encodedJsonString)
  decodeString(encodedJsonString)
  return Response.json({ message: "Test" })
}
