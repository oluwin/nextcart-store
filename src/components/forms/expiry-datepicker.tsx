"use client";

import { Button } from "@/components/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/components/ui/popover";
import { cn } from "@/components/lib/utils";
import { CalendarIcon} from "lucide-react";
import { format } from "date-fns";
import { FieldPath, FieldValues, useFormContext, UseFormReturn } from "react-hook-form";
import { DayPicker } from "react-day-picker";


export function ExpiryDatePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  form,
  name,
  label,
  placeholder = "MM/YY",
}: {
  form: UseFormReturn<TFieldValues>;
  name: TName;
  label: string;
  placeholder?: string;
}) {
    const { control, setValue, watch } = useFormContext();
    const selected = watch('date'); // Assuming your form has a 'date' field
  
    const handleDateSelect = (date: Date | undefined) => {
      if (date) {
        // Normalize to the first day of the month
        const normalizedDate = new Date(date.getFullYear(), date.getMonth(), 1);
        setValue('date', normalizedDate); // Update the form value
      }
    };
  
    const handleDateDisabled = (date: Date) => {
      const today = new Date();
      const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const fiveYearsLater = new Date(today.getFullYear() + 5, 11, 31);
      return date < currentMonth || date > fiveYearsLater;
    };
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
              <DayPicker
                mode="single"
                selected={selected}
                onSelect={handleDateSelect}
                disabled={handleDateDisabled}
                footer={
                  selected
                    ? `Selected: ${selected.toLocaleDateString()}`
                    : "Pick a day."
                }
                initialFocus
                defaultMonth={field.value || new Date()}
                fromMonth={new Date()}
                toMonth={new Date(new Date().getFullYear() + 5, 11, 31)}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
