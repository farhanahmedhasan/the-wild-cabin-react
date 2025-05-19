export interface IDashboardCabinDiscountFilter {
  placeholder: string
  filterKey: string
  options: IOptions[]
}

type IOptions = {
  value: string
  name: string
}
