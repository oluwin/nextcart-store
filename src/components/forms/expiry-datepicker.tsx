'use client'

import { Button } from '@/components/components/ui/button'
import { Calendar } from '@/components/components/ui/calendar'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/components/ui/popover'
import { cn } from '@/components/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'

export function ExpiryDatePicker<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
      form,
      name,
      label,
      placeholder = "MM/YY",
  }: {
    form: UseFormReturn<TFieldValues>
    name: TName
    label: string
    placeholder?: string
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
                                        // Normalize to first day of month
                                        const normalizedDate = new Date(date.getFullYear(), date.getMonth(), 1)
                                        field.onChange(normalizedDate)
                                    }
                                }}
                                disabled={(date) => {
                                    const today = new Date()
                                    const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1)
                                    const fiveYearsLater = new Date(today.getFullYear() + 5, 11, 31)
                                    return date < currentMonth || date > fiveYearsLater
                                }}
                                initialFocus
                                defaultMonth={field.value || new Date()}
                                fromMonth={new Date()}
                                toMonth={new Date(new Date().getFullYear() + 5, 11, 31)}
                                captionLayout="dropdown-buttons"
                                showOutsideDays={true}
                                numberOfMonths={1}
                                components={{
                                    Head: () => null,
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}