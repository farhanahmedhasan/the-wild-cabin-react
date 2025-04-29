import { CheckCircle, Loader2, X, XCircle } from 'lucide-react'
import toast, { Toast } from 'react-hot-toast'

import { cn } from '@/lib/utils'

const iconMap = {
  loading: Loader2,
  success: CheckCircle,
  error: XCircle
}

const iconColorMap = {
  loading: 'text-gray-300 animate-spin',
  success: 'text-primary-700',
  error: 'text-red-700'
}

interface IToastLayoutProps {
  message: string
  t: Toast
  type: 'error' | 'success' | 'loading'
}

export default function ToastLayout(props: IToastLayoutProps) {
  const Icon = iconMap[props.type]
  const iconColor = iconColorMap[props.type]

  return (
    <div
      className={cn(
        'flex items-center px-6 py-3 bg-gray-0 shadow-md rounded-md font-poppins',
        props.t.visible ? 'animate-enter' : 'animate-leave'
      )}
    >
      <div className="flex items-center gap-2">
        <Icon className={cn('w-5 h-5', iconColor)} />
        <span>{props.message}</span>
      </div>
      <button
        onClick={() => toast.dismiss(props.t.id)}
        className="ml-4 text-gray-500 cursor-pointer hover:text-red-700"
      >
        <X className="h-4" />
      </button>
    </div>
  )
}
