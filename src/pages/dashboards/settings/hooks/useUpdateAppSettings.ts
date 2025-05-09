import { customToastError, customToastSuccess } from '@/components/toast'
import { updateAppSettings } from '@/services/apiSettings'
import { useMutation } from '@tanstack/react-query'

export default function useUpdateAppSettings() {
  const { isPending: isUpdating, mutate: updateMutateAppSettings } = useMutation({
    mutationFn: updateAppSettings,
    onSuccess: () => {
      customToastSuccess('Settings has been updated successfully')
    },
    onError: () => {
      customToastError('Sorry!!! We could not update the settings at the moment.')
    }
  })

  return { isUpdating, updateMutateAppSettings }
}
