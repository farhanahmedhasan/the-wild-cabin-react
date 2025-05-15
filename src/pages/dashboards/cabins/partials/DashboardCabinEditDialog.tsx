import { PencilIcon } from 'lucide-react'

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
import { CabinSchemaType } from '@/schemas/cabinSchema'
import { useState } from 'react'

interface IProps {
  cabin: CabinSchemaType
}

export default function DashboardCabinEditDialog(props: IProps) {
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
