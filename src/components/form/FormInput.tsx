import React from 'react'

import FormItem from '@/components/form/FormItem'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode
  containerClassName?: string
  labelClassName?: string
  errorClassName?: string
  errorMessage?: string
  required?: boolean
  label?: string
  name?: string
}

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ children, className, containerClassName, labelClassName, errorMessage, errorClassName, ...props }, ref) => {
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
        <div className="relative">
          <input
            className={cn(
              'peer flex w-full rounded-md border border-gray-300 bg-white text-sm text-gray-600 px-4 py-3.5 outline-none transition-all duration-500 placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            id={props.name}
            ref={ref}
            {...props}
          />

          {children}
        </div>
      </FormItem>
    )
  }
)

FormInput.displayName = 'Input'

export default FormInput
