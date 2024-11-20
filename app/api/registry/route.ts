import { NextRequest } from "next/server"
import { eq } from "drizzle-orm"

import { decodeString } from "@/lib/encode-decode"
import { generateRegistryJson } from "@/lib/generate-registry-json"
import { db } from "@/db"
import { forms } from "@/db/schema/forms"

import { FormField } from "@/types/field"

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get("id")

  if (id) {
    const parsedId = parseInt(id)
    const form = await db.select().from(forms).where(eq(forms.id, parsedId))

    if (!form) {
      return Response.json(
        { message: "Form not found!" },
        {
          status: 404,
        }
      )
    }

    const decodedRegistry = decodeString(form[0].content)
    return Response.json(decodedRegistry)
  }

  return Response.json(
    { message: "Please make sure to provide a valid id" },
    { status: 401 }
  )
}

export async function POST(req: NextRequest) {
  try {
    const formFields = (await req.json()) as FormField[]

    const id = await generateRegistryJson(formFields)

    return Response.json({ id })
  } catch {
    return Response.json(
      { message: "Oops! something went wrong." },
      { status: 500 }
    )
  }
}
