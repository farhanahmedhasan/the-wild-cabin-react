import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'

interface IProps {
  value: string
  onChange: (value: string) => void
}

export default function Filter(props: IProps) {
  return (
    <Select value={props.value} onValueChange={(val) => props.onChange(val)}>
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
