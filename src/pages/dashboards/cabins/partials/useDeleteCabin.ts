import { useMutation, useQueryClient } from '@tanstack/react-query'
import { delteCabin } from '@/services/apiCabins'

import { customToastError, customToastSuccess } from '@/components/toast'

export default function useDeleteCabin() {
  const queryClient = useQueryClient()

  const { isPending: isDeleting, mutate: deleteCabinMutate } = useMutation({
    mutationFn: ({ id, image }: { id: number; image: string }) => delteCabin(id, image),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      })
      customToastSuccess('Cabin has been deleted successfully.')
    },
    onError: (err) => customToastError(err.message)
  })

  return { isDeleting, deleteCabinMutate }
}
