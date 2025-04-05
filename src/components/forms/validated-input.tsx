'use client'

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/components/ui/form'
import { Input } from '@/components/components/ui/input'
import { ReactNode } from 'react'
import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'

export function ValidatedInput<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
      form,
      name,
      label,
      description,
      placeholder,
      type = 'text',
      onChange,
  }: {
    form: UseFormReturn<TFieldValues>
    name: TName
    label: string
    description?: string
    placeholder?: string
    type?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            type={type}
                            onChange={(e) => {
                                if (type === 'number') {
                                    field.onChange(e.target.valueAsNumber)
                                } else {
                                    field.onChange(e.target.value)
                                }
                            }}
                        />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}