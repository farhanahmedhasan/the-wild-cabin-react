import { cn } from '@/lib/utils'

interface IProps {
  className?: string
  message?: string
}

export default function FormErrorPartial(props: IProps) {
  return <p className={cn('ml-1 text-xs text-red-700 pt-1', props.className)}>{props.message}</p>
}
