import { IDashboardCabinDiscountFilter } from '@/types/filters/dashboardCabinDiscountFilter'

export const dashboardCabinDiscountFilter: IDashboardCabinDiscountFilter = {
  placeholder: 'Filter by discount',
  filterKey: 'discount',
  options: [
    {
      value: 'all',
      name: 'All cabins'
    },
    {
      value: 'discount',
      name: 'With discount'
    },
    {
      value: 'no-discount',
      name: 'No Discount'
    }
  ]
}
