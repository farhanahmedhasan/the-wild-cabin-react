import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { HousePlusIcon, PencilIcon, TrashIcon } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/Dialog'
import DashboardCabinCreate from '@/pages/dashboards/cabins/DashboardCabinCreate'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip'
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
        mutationFn: delteCabin,
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
                  <HousePlusIcon className="h-5 text-primary-600 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent children="Add a cabin" />
              </Tooltip>
            </DialogTrigger>

            <DialogContent className="font-poppins">
              <DialogHeader>
                <DialogTitle>Add new cabin</DialogTitle>
                <DialogDescription>Add cabin informations here. Click save when you're done.</DialogDescription>
              </DialogHeader>

              <DashboardCabinCreate />
            </DialogContent>
          </Dialog>

          <PencilIcon className="h-5 text-gray-700 cursor-pointer" />

          <button disabled={isDeleting}>
            <TrashIcon className="h-5 text-red-600 cursor-pointer" onClick={() => mutate(row.original.id)} />
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
