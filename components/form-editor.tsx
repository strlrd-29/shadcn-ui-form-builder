import { useFormStore } from "@/stores/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useShallow } from "zustand/shallow"

import { FormState } from "@/types/form-store"
import { generateZodSchema } from "@/lib/form-schema"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/field"

import { Form } from "./ui/form"

const selector = (state: FormState) => ({
  formFields: state.formFields,
  setFormFields: state.setFormFields,
})

export function FormEditor() {
  const { formFields } = useFormStore(useShallow(selector))

  const formSchema = generateZodSchema(formFields)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.info(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-3/4 flex-col gap-6 p-4"
      >
        {formFields.map((formField) => (
          <Field formField={formField} form={form} key={formField.name} />
        ))}
        <Button type="submit" className="w-fit">
          Submit
        </Button>
      </form>
    </Form>
  )
}
