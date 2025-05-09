import { useMutation, useQueryClient } from '@tanstack/react-query'

import { customToastError, customToastSuccess } from '@/components/toast'
import { updateAppSettings } from '@/services/apiSetting'

export default function useUpdateAppSetting() {
  const queryClient = useQueryClient()

  const { isPending: isUpdating, mutate: updateMutateAppSettings } = useMutation({
    mutationFn: updateAppSettings,
    onSuccess: () => {
      customToastSuccess('Settings has been updated successfully')
      queryClient.invalidateQueries({
        queryKey: ['settings']
      })
    },
    onError: () => {
      customToastError('Sorry!!! We could not update the settings at the moment.')
    }
  })

  return { isUpdating, updateMutateAppSettings }
}
