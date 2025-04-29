import toast from 'react-hot-toast'

import ToastLayout from '@/components/toast/ToastLayout'

export function customToastSuccess(message: string) {
  toast.custom((t) => <ToastLayout message={message} t={t} type="success" />, {
    duration: 3000
  })
}

export function customToastError(message: string) {
  toast.custom((t) => <ToastLayout message={message} t={t} type="error" />, {
    duration: 5000
  })
}

export function customToastLoading(message: string) {
  toast.custom((t) => <ToastLayout message={message} t={t} type="loading" />, {
    duration: 2000
  })
}
