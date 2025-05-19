import { useSearchParams } from 'react-router'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { IDashboardCabinDiscountFilter } from '@/types/filters/dashboardCabinDiscountFilter'

interface IProps {
  discountFilter: IDashboardCabinDiscountFilter
}

export default function Filter(props: IProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const discountFilter = searchParams.get(props.discountFilter.filterKey) ?? ''

  console.log(props.discountFilter.placeholder)

  function handleChange(val: string) {
    if (val === 'all') searchParams.delete(props.discountFilter.filterKey)
    if (val !== 'all') searchParams.set(props.discountFilter.filterKey, val)
    setSearchParams(searchParams)
  }

  return (
    <Select value={discountFilter} onValueChange={handleChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder={props.discountFilter.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {props.discountFilter.options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
