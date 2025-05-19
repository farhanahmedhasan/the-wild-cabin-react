import { useSearchParams } from 'react-router'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { IDashboardFilter } from '@/types/dashboardFilter'

interface IProps {
  filterData: IDashboardFilter
}

export default function Filter(props: IProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const filterKey = searchParams.get(props.filterData.filterKey) ?? ''

  function handleChange(val: string) {
    if (val === 'all') searchParams.delete(props.filterData.filterKey)
    if (val !== 'all') searchParams.set(props.filterData.filterKey, val)
    setSearchParams(searchParams)
  }

  return (
    <Select value={filterKey} onValueChange={handleChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder={props.filterData.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {props.filterData.options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
