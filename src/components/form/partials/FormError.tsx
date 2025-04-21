import { cn } from '@/lib/utils'

interface IProps {
  className?: string
  message?: string
}

export default function FormErrorPartial(props: IProps) {
  return <p className={cn('text-xs text-red-500 pt-1', props.className)}>{props.message}</p>
}
