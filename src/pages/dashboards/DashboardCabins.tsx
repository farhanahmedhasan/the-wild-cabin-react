import { useQuery } from '@tanstack/react-query'

import { getCabins } from '@/services/apiCabins'
import Heading from '@/components/ui/Heading'
import Spinner from '@/components/ui/Spinner'

export default function DashboardCabins() {
  const { isPending, data: cabins } = useQuery({ queryKey: ['getCabins'], queryFn: getCabins })

  console.log(cabins)

  if (isPending) return <Spinner />

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading variant="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </div>

      <div>Table </div>
    </>
  )
}
