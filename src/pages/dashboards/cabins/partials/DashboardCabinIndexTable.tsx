import { ColumnDef, ColumnFiltersState, SortingState } from '@tanstack/react-table'
import { useSearchParams } from 'react-router'
import { useEffect, useState } from 'react'

import DashboardCabinIndexTableActions from '@/pages/dashboards/cabins/partials/DashboardCabinIndexTableActions'
import useGetCabins from '@/pages/dashboards/cabins/hooks/useGetCabins'
import DataTableRoot from '@/components/dataTable/DataTableRoot'
import Spinner from '@/components/ui/Spinner'
import { formatCurrency } from '@/lib/utils'
import { ICabin } from '@/types/cabin'

export default function DashboardCabinsIndexTable() {
  const { isPending, cabins, isError } = useGetCabins()
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [searchParams] = useSearchParams()

  const discountFilterVal = searchParams.get('discount') ?? ''
  const sortByFilterVal = searchParams.get('sortBy') ?? ''

  useEffect(() => {
    setColumnFilters(discountFilterVal === '' ? [] : [{ id: 'discount', value: discountFilterVal }])
  }, [discountFilterVal])

  useEffect(() => {
    function getSortingFromFilter(val: string): SortingState {
      if (val === 'name-asc') return [{ id: 'name', desc: false }]
      if (val === 'name-desc') return [{ id: 'name', desc: true }]
      if (val === 'price-asc') return [{ id: 'regular_price', desc: false }]
      if (val === 'price-desc') return [{ id: 'regular_price', desc: true }]
      if (val === 'guest-asc') return [{ id: 'max_capacity', desc: false }]
      if (val === 'guest-desc') return [{ id: 'max_capacity', desc: true }]
      return []
    }

    setSorting(getSortingFromFilter(sortByFilterVal))
  }, [sortByFilterVal])

  const columns = getCabinsColumns(discountFilterVal)

  if (isPending) return <Spinner containerClassName="relative -left-10 top-20" />
  if (isError) return <div className="text-xl text-red-700">Failed to load the cabins Try again later...</div>

  return <DataTableRoot columns={columns} data={cabins || []} columnFilters={columnFilters} sorting={sorting} />
}

function getCabinsColumns(discountFilter: string): ColumnDef<ICabin>[] {
  return [
    {
      accessorKey: 'image',
      header: 'Thumbnail',
      size: 80,
      cell: ({ row }) => (
        <div className="w-full h-18 rounded-md bg-gray-200">
          {!row.original.image ? (
            <span className="h-full w-full"></span>
          ) : (
            <img src={row.original.image} alt={row.original.name} className="h-full w-full rounded-md object-cover" />
          )}
        </div>
      )
    },
    {
      accessorKey: 'name',
      header: 'Name',
      enableSorting: true
    },
    {
      accessorKey: 'max_capacity',
      header: 'Capacity',
      enableSorting: true,
      cell: ({ row }) => `Upto ${row.original.max_capacity} guests`
    },
    {
      accessorKey: 'regular_price',
      header: 'Price',
      enableSorting: true,
      cell: ({ row }) => formatCurrency(row.original.regular_price)
    },
    {
      accessorKey: 'discount',
      header: 'Discount',
      cell: ({ row }) => <span className="text-green-700">{formatCurrency(row.original.discount)}</span>,
      filterFn: (row) => {
        if (discountFilter === 'discount') return row.original.discount > 0
        if (discountFilter === 'no-discount') return row.original.discount === 0
        return true
      }
    },
    {
      header: 'Actions',
      cell: ({ row }) => {
        return <DashboardCabinIndexTableActions cabin={row.original} />
      }
    }
  ]
}
