import { getAppSettings } from '@/services/apiSettings'
import { useQuery } from '@tanstack/react-query'

export default function useGetAppSettings() {
  const {
    data: settings = {},
    isPending: isLoading,
    isSuccess,
    isError
  } = useQuery({ queryKey: ['settings'], queryFn: getAppSettings })

  return { settings, isLoading, isSuccess, isError }
}
