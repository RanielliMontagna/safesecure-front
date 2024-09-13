import React from 'react'
import { Control } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

import * as masks from './masks/masks'

type MaskType = 'number' | 'cpf'

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<any>
  name: string
  label?: string
  placeholder?: string
  type?: React.InputHTMLAttributes<HTMLInputElement>['type']
  mask?: MaskType
  defaultValue?: string
  required?: boolean
}

export const CustomInput = ({
  defaultValue,
  name,
  label,
  control,
  placeholder,
  type = 'text',
  mask,
  required = false,
  ...rest
}: CustomInputProps) => {
  const handleFormat = (value: string) => {
    if (mask) {
      return masks[mask].format(value)
    } else {
      return value
    }
  }

  const handleParse = (value: string) => {
    if (mask) {
      return masks[mask].parse(value)
    } else {
      return value
    }
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <FormItem>
          <FormLabel required={required} htmlFor={name}>
            {label}
          </FormLabel>
          <FormControl>
            <Input
              defaultValue={defaultValue}
              id={name}
              data-mask={mask}
              placeholder={placeholder}
              type={type}
              autoComplete="off"
              value={handleFormat(value || '')}
              onChange={e => onChange(handleParse(e.target.value))}
              {...rest}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
