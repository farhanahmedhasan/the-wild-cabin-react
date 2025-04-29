import React from 'react'

import FormItem from '@/components/form/FormItem'
import { cn } from '@/lib/utils'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  children?: React.ReactNode
  containerClassName?: string
  labelClassName?: string
  errorClassName?: string
  errorMessage?: string
  required?: boolean
  label?: string
  name?: string
}

const FormTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ containerClassName, labelClassName, errorMessage, errorClassName, className, ...props }, ref) => {
    return (
      <FormItem
        className={containerClassName}
        label={props.label}
        labelClassName={labelClassName}
        name={props.name}
        errorMessage={errorMessage}
        errorClassName={errorClassName}
        required={props.required}
      >
        <textarea
          className={cn(
            'h-30 peer flex w-full rounded-md border border-gray-300 bg-white text-sm text-gray-600 px-4 py-3.5 outline-none transition-all duration-500 placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
      </FormItem>
    )
  }
)
FormTextarea.displayName = 'Textarea'

export default FormTextarea
