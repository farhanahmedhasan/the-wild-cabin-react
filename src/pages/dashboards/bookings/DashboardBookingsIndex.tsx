import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/Dialog'
import DashboardBookingIndexTable from '@/pages/dashboards/bookings/partials/DashboardBookingIndexTable'
import { Button } from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'

export default function DashboardBookings() {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Heading>All Bookings</Heading>
        <div>Filter/Sort</div>
      </div>

      <Dialog>
        <DialogTrigger className="mb-8" asChild>
          <Button size="sm">Create new booking</Button>
        </DialogTrigger>

        <DialogContent className="font-poppins">
          <DialogHeader>
            <DialogTitle>Create a new booking</DialogTitle>
            <DialogDescription>Add booking informations here. Click save when you're done.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <DashboardBookingIndexTable />
    </>
  )
}
