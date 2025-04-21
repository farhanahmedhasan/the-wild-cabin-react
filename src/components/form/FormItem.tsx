import FormErrorPartial from './partials/FormError'
import { Label } from './partials/Label'

interface IProps {
  children?: React.ReactNode
  className?: string
  label?: string
  labelClassName?: string
  name?: string
  required?: boolean
  errorMessage?: string
  errorClassName?: string
}

export default function FormItem(props: IProps) {
  return (
    <div className={props.className}>
      {props.label && (
        <div className={props.label && 'pb-1.5'}>
          <Label className={props.labelClassName} htmlFor={props.name}>
            {props.label}
          </Label>
          {props.required && props.label && <span className="text-red-500">&nbsp;*</span>}
        </div>
      )}

      {props.children}

      {props.errorMessage && <FormErrorPartial className={props.errorClassName} message={props.errorMessage} />}
    </div>
  )
}
