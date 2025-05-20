import { useQuery } from '@tanstack/react-query'

import { getBookings } from '@/services/apiBookings'

export default function useGetBookings() {
  const {
    isPending: isLoading,
    data: bookings = [],
    isError
  } = useQuery({ queryKey: ['bookings'], queryFn: getBookings })
  return { isLoading, bookings, isError }
}
