import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/Dialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip'
import DashboardCabinEdit from '@/pages/dashboards/cabins/DashboardCabinEdit'
import { customToastError, customToastSuccess } from '@/components/toast'
import DataTableRoot from '@/components/dataTable/DataTableRoot'
import { delteCabin, getCabins } from '@/services/apiCabins'
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
      // TODO: Fix the eslint issue
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const queryClient = useQueryClient()
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { isPending: isDeleting, mutate } = useMutation({
        mutationFn: ({ id, image }: { id: number; image: string }) => delteCabin(id, image),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['cabins']
          })
          customToastSuccess('Cabin has been deleted successfully.')
        },
        onError: (err) => customToastError(err.message)
      })

      return (
        <div className="flex items-center gap-1.5">
          <Dialog>
            <DialogTrigger>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PencilIcon className="h-5 text-gray-700 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent children="Edit this cabin" />
              </Tooltip>
            </DialogTrigger>

            <DialogContent className="font-poppins">
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

          <button disabled={isDeleting}>
            <TrashIcon
              className="h-5 text-red-600 cursor-pointer"
              onClick={() => mutate({ id: row.original.id, image: row.original.image })}
            />
          </button>
        </div>
      )
    }
  }
]

export default function DashboardCabinsTable() {
  const { isPending, data: cabins = [], isError } = useQuery({ queryKey: ['cabins'], queryFn: getCabins })

  if (isPending) return <Spinner containerClassName="relative -left-10 top-20" />
  if (isError) return <div className="text-xl text-red-700">Failed to load the cabins Try again later...</div>

  return <DataTableRoot columns={columns} data={cabins} />
}
