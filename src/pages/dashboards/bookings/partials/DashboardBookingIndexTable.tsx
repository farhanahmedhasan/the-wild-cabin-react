import { ColumnDef } from '@tanstack/react-table'

import useGetBookings from '@/pages/dashboards/bookings/hooks/useGetBookings'
import DataTableRoot from '@/components/dataTable/DataTableRoot'
import Spinner from '@/components/ui/Spinner'
import { IBooking } from '@/types/booking'

export default function DashboardBookingIndexTable() {
  const { bookings, isLoading, isError } = useGetBookings()

  const columns = getBookingsColumns()

  if (isLoading) return <Spinner containerClassName="relative -left-10 top-20" />
  if (isError) return <p className="text-xl text-red-700">Failed to load the bookings Try again later...</p>

  return <DataTableRoot columns={columns} data={bookings} />
}

function getBookingsColumns(): ColumnDef<IBooking>[] {
  return [
    {
      header: 'Cabin'
    },
    {
      header: 'Guest'
    },
    {
      header: 'Dates'
    },
    {
      header: 'Status'
    },
    {
      header: 'Amount'
    },
    {
      header: 'Actions'
    }
  ]
}
