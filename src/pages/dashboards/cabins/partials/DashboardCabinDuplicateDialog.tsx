import { CopyIcon } from 'lucide-react'
import { useState } from 'react'

import { CabinSchemaType } from '@/schemas/cabinSchema'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/Dialog'
import useCreateCabin from '@/pages/dashboards/cabins/hooks/useCreateCabin'
import { Button } from '@/components/ui/Button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip'

interface IProps {
  cabin: CabinSchemaType
}

export default function DashboardCabinDuplicateDialog(props: IProps) {
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
