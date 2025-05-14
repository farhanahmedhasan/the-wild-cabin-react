import { TrashIcon } from 'lucide-react'
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
import useDeleteCabin from '@/pages/dashboards/cabins/hooks/useDeleteCabin'
import { Button } from '@/components/ui/Button'

interface IProps {
  id: number
  image: string
}

export default function DashboardCabinDeleteDialog(props: IProps) {
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
