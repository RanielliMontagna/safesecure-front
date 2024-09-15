import { Control } from 'react-hook-form'
import { DayPickerBase } from 'react-day-picker'
import dayjs from 'dayjs'
import { CalendarIcon } from '@radix-ui/react-icons'

import { FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'

import { cn } from '@/utils'

type MaskType = 'number' | 'cpf'

interface CustomDatePickerProps extends DayPickerBase {
  control: Control<any>
  name: string
  defaultValue?: Date
  label?: string
  placeholder?: string
  mask?: MaskType
  required?: boolean
  helperText?: string
}

export const CustomDatePicker = ({
  name,
  label,
  control,
  placeholder,
  required = false,
  defaultValue,
  helperText,
  ...rest
}: CustomDatePickerProps) => {
  return (
    <FormField
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({ field: { value, onChange } }) => {
        return (
          <FormItem className="flex flex-col">
            <FormLabel required={required} htmlFor={name}>
              {label}
            </FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'justify-start text-left font-normal',
                    !value && 'text-muted-foreground',
                  )}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {value ? (
                    dayjs(value).format('D [de] MMMM [de] YYYY')
                  ) : (
                    <span>{placeholder || 'Selecione uma data'}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={value}
                  onSelect={onChange}
                  initialFocus
                  {...rest}
                />
              </PopoverContent>
            </Popover>
            <FormMessage>{helperText}</FormMessage>
          </FormItem>
        )
      }}
    />
  )
}
