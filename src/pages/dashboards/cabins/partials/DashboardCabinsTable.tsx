import { ColumnDef } from '@tanstack/react-table'
import { useQuery } from '@tanstack/react-query'

import DataTableRoot from '@/components/dataTable/DataTableRoot'
import { getCabins } from '@/services/apiCabins'
import Spinner from '@/components/ui/Spinner'
import ICabin from '@/types/cabin'

const columns: ColumnDef<ICabin>[] = [
  {
    header: 'Thumbnail',
    accessorKey: 'image_url',
    size: 80,
    cell: ({ row }) => (
      <div className="w-28 min-w-28 max-w-28">
        <img
          src={row.getValue('image_url')}
          alt={row.getValue('name')}
          className="h-full w-full rounded-md object-contain"
        />
      </div>
    )
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'max_capacity',
    header: 'Capacity'
  },
  {
    accessorKey: 'regular_price',
    header: 'Price'
  },
  {
    accessorKey: 'discount',
    header: 'Discount',
    cell: ({ row }) => row.getValue('discount') + '%'
  }
]

export default function DashboardCabinsTable() {
  const { isPending, data: cabins = [], isError } = useQuery({ queryKey: ['cabins'], queryFn: getCabins })

  if (isPending) return <Spinner containerClassName="relative -left-10 top-20" />
  if (isError) return <div className="text-xl text-red-700">Failed to load the cabins Try again later...</div>

  return (
    <div>
      <DataTableRoot columns={columns} data={cabins} />
    </div>
  )
}
