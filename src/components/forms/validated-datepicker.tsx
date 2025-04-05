'use client'

import { Calendar } from '@/components/components/ui/calendar'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/components/ui/popover'
import { cn } from '@/components/lib/utils'
import { format, setMonth, setYear} from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'
import {Button} from "@/components/components/ui/button";

export function ValidatedDatePicker<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
      form,
      name,
      label,
      placeholder = "Pick a date",
      disabled,
  }: {
    form: UseFormReturn<TFieldValues>
    name: TName
    label: string
    placeholder?: string
    disabled?: boolean
}) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>{label}</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? (
                                        format(field.value, "MM/yy")
                                    ) : (
                                        <span>{placeholder}</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(date) => {
                                    if (date) {
                                        // Force the day to be 1 (for consistent MM/yy format)
                                        const normalizedDate = new Date(date)
                                        normalizedDate.setDate(1)
                                        field.onChange(normalizedDate)
                                    }
                                }}
                                disabled={(date) =>
                                    date < new Date() || date > new Date(new Date().setFullYear(new Date().getFullYear() + 5))
                                }
                                initialFocus
                                defaultMonth={field.value || new Date()}
                                fromMonth={new Date()}
                                toYear={new Date().getFullYear() + 5}
                                captionLayout="dropdown"
                                showOutsideDays={false}
                                fixedWeeks
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}