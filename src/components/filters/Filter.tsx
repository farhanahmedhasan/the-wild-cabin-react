import { useSearchParams } from 'react-router'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'

interface IProps {
  value: string
  onChange: (value: string) => void
}

export default function Filter(props: IProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  function handleChange(val: string) {
    props.onChange(val)

    if (val === 'all') searchParams.delete('discount')

    if (val !== 'all') {
      searchParams.set('discount', val)
    }

    setSearchParams(searchParams)
  }

  return (
    <Select value={props.value} onValueChange={handleChange}>
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
