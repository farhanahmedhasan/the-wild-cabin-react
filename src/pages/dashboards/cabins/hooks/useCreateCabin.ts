import { useMutation, useQueryClient } from '@tanstack/react-query'

import { customToastError, customToastSuccess } from '@/components/toast'
import { createCabin } from '@/services/apiCabins'

export default function useCreateCabin() {
  const queryClient = useQueryClient()
  const { isPending: isCreating, mutate: createCabinMutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      customToastSuccess('Cabin has been created successfully.')
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      })
    },

    onError: (err) => customToastError(err.message)
  })
  return { isCreating, createCabinMutate }
}
