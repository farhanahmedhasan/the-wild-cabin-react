import DashboardCabinsTable from '@/pages/dashboards/cabins/partials/DashboardCabinIndexTable'
import DashboardCabinCreate from '@/pages/dashboards/cabins/DashboardCabinCreate'
import Heading from '@/components/ui/Heading'

export default function DashboardCabins() {
  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <Heading variant="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </div>

      <DashboardCabinsTable />

      <div className="p-6 bg-gray-0 mt-10 rounded-md">
        <DashboardCabinCreate />
      </div>
    </>
  )
}
