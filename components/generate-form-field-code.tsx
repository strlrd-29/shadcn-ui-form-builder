import { FieldType, type FormField } from "@/types/field"

export const generateCodeSnippet = (field: FormField) => {
  switch (field.type) {
    case FieldType.INPUT:
    case FieldType.EMAIL:
      return `<FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${field.label}</FormLabel>
              <FormControl>
                <Input placeholder="${field.placeholder}" {...field} />
              </FormControl>
              ${
                field.description &&
                `<FormDescription>${field.description}</FormDescription>`
              }
              <FormMessage />
            </FormItem>
          )}
        />`
    case FieldType.TEXTAREA:
      return `<FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${field.label}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="${field.placeholder}"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              ${
                field.description &&
                `<FormDescription>${field.description}</FormDescription>`
              }
              <FormMessage />
            </FormItem>
          )}
        />`
    case FieldType.NUMBER_INPUT:
      return `<FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${field.label}</FormLabel>
              <FormControl>
                <Input placeholder="${field.placeholder}" {...field} type="number" />
              </FormControl>
              ${
                field.description &&
                `<FormDescription>${field.description}</FormDescription>`
              }
              <FormMessage />
            </FormItem>
          )}
        />`
    case FieldType.CHECKBOX:
      return `<FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>${field.label}</FormLabel>
                ${
                  field.description &&
                  `<FormDescription>${field.description}</FormDescription>`
                }
              </div>
            </FormItem>
          )}
        />`
    case FieldType.SELECT:
      return `<FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${field.label}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="${field.placeholder}" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
              ${
                field.description &&
                `<FormDescription>${field.description}</FormDescription>`
              }
              <FormMessage />
            </FormItem>
          )}
        />`
    case FieldType.RADIO_GROUP:
      return `<FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>${field.label}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="all" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      All new messages
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="mentions" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Direct messages and mentions
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="none" />
                    </FormControl>
                    <FormLabel className="font-normal">Nothing</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />`
    case FieldType.SWITCH:
      return `<FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  ${field.label}
                </FormLabel>
              ${
                field.description &&
                `<FormDescription>${field.description}</FormDescription>`
              }
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />`
    case FieldType.SLIDER:
      return `<FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${field.label}</FormLabel>
              <FormControl>
                <Slider
                  min={${field.min}}
                  max={${field.max}}
                  step={${field.step}}
                  defaultValue={${[field.defaultValue]}}
                  onValueChange={(value) => {
                    field.onChange(value[0])
                  }}
                />
              </FormControl>
              <FormDescription>
                Selected value is{" "}
                {field.value !== undefined ? field.value : ${field.defaultValue}},
                minimun valus is ${field.min}, maximim values is ${field.max},
                step size is ${field.step}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />`
    case FieldType.DATE:
      return `<FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>${field.label}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
              ${
                field.description &&
                `<FormDescription>${field.description}</FormDescription>`
              }
              <FormMessage />
            </FormItem>
          )}
        />`
    default:
      return null
  }
}
