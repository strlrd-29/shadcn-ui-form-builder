import { format } from "date-fns"
import { CalendarIcon, CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import type { ControllerRenderProps } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { FormFieldWrapper } from "@/components/form-field-wrapper"

import { FieldType, type FormField as FormFieldType } from "@/types/field"

interface RenderFormFieldComponentProps {
  formField: FormFieldType
  field: ControllerRenderProps<
    {
      [x: string]: any
    },
    string
  >
}

export function renderFormFieldComponent({
  formField,
  field,
}: RenderFormFieldComponentProps) {
  switch (formField.type) {
    case FieldType.INPUT:
      return (
        <FormFieldWrapper {...formField}>
          <Input placeholder={formField.placeholder} {...field} />
        </FormFieldWrapper>
      )
    case FieldType.TEXTAREA:
      return (
        <FormFieldWrapper {...formField}>
          <Textarea
            placeholder={formField.placeholder}
            className="resize-none"
            {...field}
          />
        </FormFieldWrapper>
      )
    case FieldType.NUMBER_INPUT:
      return (
        <FormFieldWrapper {...formField}>
          <Input placeholder={formField.placeholder} {...field} type="number" />
        </FormFieldWrapper>
      )
    case FieldType.EMAIL:
      return (
        <FormFieldWrapper {...formField}>
          <Input placeholder={formField.placeholder} {...field} />
        </FormFieldWrapper>
      )
    case FieldType.CHECKBOX:
      return (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{formField.label}</FormLabel>
            <FormDescription>{formField.description}</FormDescription>
          </div>
        </FormItem>
      )
    case FieldType.SELECT:
      return (
        <FormItem>
          <FormLabel>{formField.label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={formField.default as string}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={formField.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {formField.choices.map((choice, idx) => (
                <SelectItem
                  value={choice.value !== "" ? choice.value : "hello"}
                  key={idx}
                >
                  {choice.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{formField.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )
    case FieldType.DATE:
      return (
        <FormItem className="flex flex-col">
          <FormLabel>{formField.label}</FormLabel>
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
          <FormDescription>{formField.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )
    case FieldType.RADIO_GROUP:
      return (
        <FormItem className="space-y-3">
          <FormLabel>{formField.label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={formField.default as string}
              className="flex flex-col space-y-1"
            >
              {formField.choices.map((choice, idx) => (
                <FormItem
                  className="flex items-center space-x-3 space-y-0"
                  key={idx}
                >
                  <FormControl>
                    <RadioGroupItem value={choice.value} />
                  </FormControl>
                  <FormLabel className="font-normal">{choice.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )
    case FieldType.SWITCH:
      return (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-base">{formField.label}</FormLabel>
            <FormDescription>{formField.description}</FormDescription>
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
        </FormItem>
      )
    case FieldType.COMBOBOX:
      return (
        <FormItem className="flex flex-col">
          <FormLabel>{formField.label}</FormLabel>
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
                    ? formField.choices.find(
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
                    {formField.choices.map((choice, idx) => (
                      <CommandItem
                        value={choice.value}
                        key={idx}
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
          <FormDescription>{formField.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )
    case FieldType.SLIDER:
      return (
        <FormItem>
          <FormLabel>{formField.label}</FormLabel>
          <FormControl>
            <Slider
              min={formField.min}
              max={formField.max}
              step={formField.step}
              defaultValue={[formField.default as number]}
              onValueChange={(value) => {
                field.onChange(value[0])
              }}
            />
          </FormControl>
          <FormDescription>
            Selected value is{" "}
            {field.value !== undefined ? field.value : formField.default},
            minimun valus is {formField.min}, maximim values is {formField.max},
            step size is {formField.step}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )
  }
}
