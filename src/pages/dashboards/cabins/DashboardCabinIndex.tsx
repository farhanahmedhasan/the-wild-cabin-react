import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/Dialog'
import DashboardCabinsIndexTable from '@/pages/dashboards/cabins/partials/DashboardCabinIndexTable'
import DashboardCabinCreate from '@/pages/dashboards/cabins/DashboardCabinCreate'
import { Button } from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
import { useState } from 'react'

export default function DashboardCabins() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleClose() {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Heading variant="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger className="mb-8" asChild>
          <Button size="sm">Create a cabin</Button>
        </DialogTrigger>

        <DialogContent className="font-poppins">
          <DialogHeader>
            <DialogTitle>Create new cabin</DialogTitle>
            <DialogDescription>Add cabin informations here. Click save when you're done.</DialogDescription>
          </DialogHeader>

          <DashboardCabinCreate onCabinCreate={handleClose} />
        </DialogContent>
      </Dialog>

      <DashboardCabinsIndexTable />
    </>
  )
}
