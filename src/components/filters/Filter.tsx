import { useSearchParams } from 'react-router'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'

export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const value = searchParams.get('discount') || ''

  function handleFilter(value: string) {
    if (value === 'all') {
      searchParams.delete('discount')
    }

    if (value !== 'all') {
      searchParams.set('discount', value)
    }

    setSearchParams(searchParams)
  }

  return (
    <Select value={value} onValueChange={handleFilter}>
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
