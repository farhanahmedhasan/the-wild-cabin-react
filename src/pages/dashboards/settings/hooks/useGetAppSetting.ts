import { getAppSettings } from '@/services/apiSetting'
import { useQuery } from '@tanstack/react-query'

export default function useGetAppSetting() {
  const {
    data: settings = {},
    isPending: isLoading,
    isSuccess,
    isError
  } = useQuery({ queryKey: ['settings'], queryFn: getAppSettings })

  return { settings, isLoading, isSuccess, isError }
}
