import { useQuery } from '@tanstack/react-query'

import { getCabins } from '@/services/apiCabins'

export default function useGetCabins() {
  const { isPending, data: cabins = [], isError } = useQuery({ queryKey: ['cabins'], queryFn: getCabins })
  return { isPending, cabins, isError }
}
