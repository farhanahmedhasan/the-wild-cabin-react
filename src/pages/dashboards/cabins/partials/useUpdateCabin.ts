import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editCabin } from '@/services/apiCabins'

import { customToastError, customToastSuccess } from '@/components/toast'

export default function useCabinUpdate() {
  const queryClient = useQueryClient()
  const { isPending: isUpdating, mutate: updateCabinMutate } = useMutation({
    mutationFn: editCabin,
    onSuccess: () => {
      customToastSuccess('Cabin has been updated successfully.')
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      })
    },
    onError: (err) => customToastError(err.message)
  })

  return { isUpdating, updateCabinMutate }
}
