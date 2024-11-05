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
                  ${field.choices
                    .map(
                      (choice) =>
                        `<SelectItem value="${choice.value}">${choice.label}</SelectItem>`
                    )
                    .join("\n\t\t\t\t  ")}
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
                  ${field.choices
                    .map(
                      (choice) =>
                        `<FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="${choice.value}" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      ${choice.label}
                    </FormLabel>
                  </FormItem>`
                    )
                    .join("\n\t\t\t\t  ")}
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
                  defaultValue={[${field.default}]}
                  onValueChange={(value) => {
                    field.onChange(value[0])
                  }}
                />
              </FormControl>
              <FormDescription>
                Selected value is{" "}
                {field.value !== undefined ? field.value : ${field.default}},
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
    case FieldType.COMBOBOX:
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
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? choices.find(
                            (choice) => choice.value === field.value
                          )?.label
                        : "Select language"}
                      <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {choices.map((choice) => (
                          <CommandItem
                            value={choice.label}
                            key={choice.value}
                            onSelect={() => field.onChange(choice.value)}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                choice.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {choice.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
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
