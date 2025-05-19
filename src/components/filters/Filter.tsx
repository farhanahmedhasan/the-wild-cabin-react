import { useSearchParams } from 'react-router'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'

export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const discountFilter = searchParams.get('discount') ?? ''

  function handleChange(val: string) {
    if (val === 'all') searchParams.delete('discount')

    if (val !== 'all') {
      searchParams.set('discount', val)
    }

    setSearchParams(searchParams)
  }

  return (
    <Select value={discountFilter} onValueChange={handleChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Filter by discount" />
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
