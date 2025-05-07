import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCabin } from '@/services/apiCabins'

import { customToastError, customToastSuccess } from '@/components/toast'

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
