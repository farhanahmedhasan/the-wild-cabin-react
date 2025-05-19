import { IDashboardFilter } from '@/types/dashboardFilter'

export const dashboardCabinDiscountFilter: IDashboardFilter = {
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

export const dashboardCabinSortByFilter: IDashboardFilter = {
  placeholder: 'Sort By',
  filterKey: 'sortBy',
  options: [
    {
      value: 'all',
      name: 'Show All'
    },
    {
      value: 'name-asc',
      name: 'Sort by name (A-Z)'
    },
    {
      value: 'name-desc',
      name: 'Sort by name (Z-A)'
    },
    {
      value: 'price-asc',
      name: 'Sort by price (low first)'
    },
    {
      value: 'price-desc',
      name: 'Sort by price (high first)'
    },
    {
      value: 'guest-asc',
      name: 'Sort by guest capacity (low first)'
    },
    {
      value: 'guest-desc',
      name: 'Sort by guest capacity (high first)'
    }
  ]
}
