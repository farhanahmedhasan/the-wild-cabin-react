import { CopyIcon, PencilIcon, TrashIcon } from 'lucide-react'
import { useState } from 'react'

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
import useDeleteCabin from '@/pages/dashboards/cabins/hooks/useDeleteCabin'
import useCreateCabin from '@/pages/dashboards/cabins/hooks/useCreateCabin'
import { CabinSchemaType } from '@/schemas/cabinSchema'
import { Button } from '@/components/ui/Button'

interface IProps {
  cabin: CabinSchemaType
}

export default function DashboardCabinIndexTableActions(props: IProps) {
  return (
    <div className="flex items-center gap-1.5">
      <DashboardCabinDuplicateDialog cabin={props.cabin} />
      <DashboardCabinEditDialog cabin={props.cabin} />
      <DashboardCabinDeleteDialog id={props.cabin.id!} image={props.cabin.image} />
    </div>
  )
}

// -------------------------------------------------------------------
// Delete Cabin Dialog
// -------------------------------------------------------------------
interface ICabinDeleteProps {
  id: number
  image: string
}

function DashboardCabinDeleteDialog(props: ICabinDeleteProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { isDeleting, deleteCabinMutate } = useDeleteCabin()

  function handleDeleteCabin() {
    deleteCabinMutate(
      { id: props.id, image: props.image },
      {
        onSuccess: () => setIsDialogOpen(false)
      }
    )
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <Tooltip>
          <TooltipTrigger asChild>
            <TrashIcon className="h-5 text-red-600 cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent children="Delete Cabin ?" className="text-red-600" />
        </Tooltip>
      </DialogTrigger>

      <DialogContent className="text-center py-8 !h-fit !max-w-md overflow-hidden">
        <DialogHeader>
          <DialogTitle>Confirm to delete the Cabin.</DialogTitle>

          <DialogDescription>Are you sure you want to delete the cabin?</DialogDescription>
          <div className="flex items-center gap-4 justify-center mt-2">
            <Button variant="danger" size="sm" disabled={isDeleting} onClick={handleDeleteCabin}>
              Yes
            </Button>
            <Button variant="primary" size="sm" onClick={() => setIsDialogOpen(false)}>
              No
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

// -------------------------------------------------------------------
// Duplicate Cabin Dialog
// -------------------------------------------------------------------
function DashboardCabinDuplicateDialog(props: IProps) {
  const { isCreating, createCabinMutate } = useCreateCabin()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleDuplicate({ id, ...cabin }: CabinSchemaType) {
    const newCabinDuplicate = {
      ...cabin,
      name: `Copy of ${cabin.name}`
    }
    createCabinMutate(newCabinDuplicate, {
      onSuccess: () => setIsDialogOpen(false)
    })
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <Tooltip>
          <TooltipTrigger asChild>
            <CopyIcon className="h-5 cursor-pointer" />
          </TooltipTrigger>

          <TooltipContent>Duplicate cabin ?</TooltipContent>
        </Tooltip>
      </DialogTrigger>

      <DialogContent className="text-center py-8 !h-fit !max-w-md overflow-hidden">
        <DialogHeader>
          <DialogTitle>Confirm to duplicate the Cabin.</DialogTitle>

          <DialogDescription>Are you sure you want to duplicate the cabin?</DialogDescription>
          <div className="flex items-center gap-4 justify-center mt-2">
            <Button variant="danger" size="sm" disabled={isCreating} onClick={() => handleDuplicate(props.cabin)}>
              Yes
            </Button>
            <Button variant="primary" size="sm" onClick={() => setIsDialogOpen(false)}>
              No
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

// -------------------------------------------------------------------
// Edit Cabin Dialog
// -------------------------------------------------------------------
function DashboardCabinEditDialog(props: IProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
            Edit cabin :<span className="text-xl ml-1 font-sono text-primary-700 font-medium">{props.cabin.name}</span>
          </DialogTitle>
          <DialogDescription>Edit cabin informations here. Click update when you're done.</DialogDescription>
        </DialogHeader>

        <DashboardCabinEdit cabin={props.cabin} onCloseDialog={() => setIsDialogOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
