import { CopyIcon, PencilIcon } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/Dialog'
import DashboardCabinDeleteDialog from '@/pages/dashboards/cabins/partials/DashboardCabinDeleteDialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip'
import DashboardCabinEdit from '@/pages/dashboards/cabins/DashboardCabinEdit'
import useCreateCabin from '@/pages/dashboards/cabins/hooks/useCreateCabin'
import useGetCabins from '@/pages/dashboards/cabins/hooks/useGetCabins'
import DataTableRoot from '@/components/dataTable/DataTableRoot'
import { CabinSchemaType } from '@/schemas/cabinSchema'
import Spinner from '@/components/ui/Spinner'
import { formatCurrency } from '@/lib/utils'
import { ICabin } from '@/types/cabin'

const columns: ColumnDef<ICabin>[] = [
  {
    accessorKey: 'image',
    header: 'Thumbnail',
    size: 80,
    cell: ({ row }) => (
      <div className="w-full h-18 rounded-md bg-gray-200">
        {!row.getValue('image') ? (
          <span className="h-full w-full"></span>
        ) : (
          <img
            src={row.getValue('image')}
            alt={row.getValue('name')}
            className="h-full w-full rounded-md object-cover"
          />
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
    cell: ({ row }) => `Upto ${row.getValue('max_capacity')} guests`
  },
  {
    accessorKey: 'regular_price',
    header: 'Price',
    cell: ({ row }) => formatCurrency(row.getValue('regular_price'))
  },
  {
    accessorKey: 'discount',
    header: 'Discount',
    cell: ({ row }) => <span className="text-green-700">{formatCurrency(row.getValue('discount'))}</span>
  },
  {
    header: 'Actions',
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { isCreating, createCabinMutate } = useCreateCabin()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      function handleDuplicate({ id, ...cabin }: CabinSchemaType) {
        const newCabinDuplicate = {
          ...cabin,
          name: `Copy of ${cabin.name}`
        }
        createCabinMutate(newCabinDuplicate)
      }

      return (
        <div className="flex items-center gap-1.5">
          <button disabled={isCreating} onClick={() => handleDuplicate(row.original)}>
            <CopyIcon className="h-5 cursor-pointer" />
          </button>

          <Dialog>
            <DialogTrigger>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PencilIcon className="h-5 text-gray-700 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent children="Edit this cabin" />
              </Tooltip>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Edit cabin :
                  <span className="text-xl ml-1 font-sono text-primary-700 font-medium">{row.original.name}</span>
                </DialogTitle>
                <DialogDescription>Edit cabin informations here. Click update when you're done.</DialogDescription>
              </DialogHeader>

              <DashboardCabinEdit cabin={row.original} />
            </DialogContent>
          </Dialog>

          <DashboardCabinDeleteDialog id={row.original.id} image={row.original.image} />
        </div>
      )
    }
  }
]

export default function DashboardCabinsIndexTable() {
  const { isPending, cabins, isError } = useGetCabins()

  if (isPending) return <Spinner containerClassName="relative -left-10 top-20" />
  if (isError) return <div className="text-xl text-red-700">Failed to load the cabins Try again later...</div>

  return <DataTableRoot columns={columns} data={cabins} />
}
