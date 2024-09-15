import { Control } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { SelectProps } from '@radix-ui/react-select'

type MaskType = 'number' | 'cpf'

interface OptionsSelect {
  value: string
  label: React.ReactNode
}

interface CustomSelectProps extends SelectProps {
  control: Control<any>
  name: string
  label?: string
  placeholder?: string
  mask?: MaskType
  defaultValue?: string
  required?: boolean
  options?: OptionsSelect[]
}

export const CustomSelect = ({
  defaultValue,
  name,
  label,
  control,
  placeholder,
  required = false,
  options,
  ...rest
}: CustomSelectProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange, ...fieldProps } }) => {
        return (
          <FormItem>
            <FormLabel required={required} htmlFor={name}>
              {label}
            </FormLabel>
            <Select
              onValueChange={onChange}
              defaultValue={defaultValue}
              value={value}
              disabled={fieldProps.disabled}
              name={fieldProps.name}
              {...rest}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options?.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
