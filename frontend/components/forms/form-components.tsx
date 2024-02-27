"use client"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input" 

type CustomFormFieldProps = {
  name: string;
  label: string;
  control: any;
  description?: string;
  placeholder?: string;
  type?: string;
}

export const CustomFormField = (props: CustomFormFieldProps) => {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <Input placeholder={props.placeholder || ""} type={props.type} {...field} />
          </FormControl>
          <FormDescription>{props.description || ""}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}