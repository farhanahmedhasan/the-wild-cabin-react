import { cn } from '@/lib/utils'

interface IProps {
  containerClassName?: string
  className?: string
}

export default function Spinner(props: IProps) {
  return (
    <div className={cn('fixed inset-0 flex items-center justify-center bg-gray-50/50', props.containerClassName)}>
      <div
        className={cn(
          'h-12 w-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin',
          props.className
        )}
      />
    </div>
  )
}
