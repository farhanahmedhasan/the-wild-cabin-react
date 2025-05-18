import { ColumnDef, ColumnFiltersState } from '@tanstack/react-table'
import { useEffect, useState } from 'react'

import DashboardCabinIndexTableActions from '@/pages/dashboards/cabins/partials/DashboardCabinIndexTableActions'
import useGetCabins from '@/pages/dashboards/cabins/hooks/useGetCabins'
import DataTableRoot from '@/components/dataTable/DataTableRoot'
import Spinner from '@/components/ui/Spinner'
import { formatCurrency } from '@/lib/utils'
import { ICabin } from '@/types/cabin'

interface IProps {
  filterVal: string
}

export default function DashboardCabinsIndexTable(props: IProps) {
  const { isPending, cabins, isError } = useGetCabins()
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  useEffect(() => {
    setColumnFilters(props.filterVal === 'all' ? [] : [{ id: 'discount', value: props.filterVal }])
  }, [props.filterVal])

  const columns = getCabinsColumns(props.filterVal)

  if (isPending) return <Spinner containerClassName="relative -left-10 top-20" />
  if (isError) return <div className="text-xl text-red-700">Failed to load the cabins Try again later...</div>

  return <DataTableRoot columns={columns} data={cabins || []} columnFilters={columnFilters} />
}

function getCabinsColumns(filterVal: string): ColumnDef<ICabin>[] {
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
      header: 'Name'
    },
    {
      accessorKey: 'max_capacity',
      header: 'Capacity',
      cell: ({ row }) => `Upto ${row.original.max_capacity} guests`
    },
    {
      accessorKey: 'regular_price',
      header: 'Price',
      cell: ({ row }) => formatCurrency(row.original.regular_price)
    },
    {
      accessorKey: 'discount',
      header: 'Discount',
      cell: ({ row }) => <span className="text-green-700">{formatCurrency(row.original.discount)}</span>,
      filterFn: (row) => {
        if (filterVal === 'discount') return row.original.discount > 0
        if (filterVal === 'no-discount') return row.original.discount === 0
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
