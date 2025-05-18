import { useSearchParams } from 'react-router'
import { useEffect, useState } from 'react'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'

export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialFilter = searchParams.get('discount') || 'all'
  const [filterValue, setFilterValue] = useState(initialFilter)

  function handleFilter(value: string) {
    setFilterValue(value)
  }

  useEffect(() => {
    searchParams.set('discount', filterValue)
    setSearchParams(searchParams)
  }, [filterValue, searchParams, setSearchParams])

  return (
    <Select value={filterValue} onValueChange={handleFilter}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="All Cabins" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">All cabins</SelectItem>
          <SelectItem value="discount">With discount</SelectItem>
          <SelectItem value="no-discount">No Discount</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
