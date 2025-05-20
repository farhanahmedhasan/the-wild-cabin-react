import { ColumnDef } from '@tanstack/react-table'

import DataTableRoot from '@/components/dataTable/DataTableRoot'
import { IBooking } from '@/types/booking'

export default function DashboardBookingIndexTable() {
  const columns = getBookingsColumns()

  return <DataTableRoot columns={columns} data={[]} />
}

function getBookingsColumns(): ColumnDef<IBooking>[] {
  return [
    {
      accessorKey: 'status',
      header: 'Status'
    },
    {
      accessorKey: 'is_paid',
      header: 'Is Paid'
    }
  ]
}
