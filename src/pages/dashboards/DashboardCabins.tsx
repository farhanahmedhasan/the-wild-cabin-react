import { useEffect } from 'react'

import { getCabins } from '@/services/apiCabins'

export default function DashboardCabins() {
  useEffect(() => {
    const fetchCabins = async () => {
      const cabins = await getCabins()
      console.log(cabins)
    }

    fetchCabins()
  }, [])
  return <div>DashboardCabins</div>
}
