import DashboardCabinsTable from '@/pages/dashboards/cabins/partials/DashboardCabinsTable'
import Heading from '@/components/ui/Heading'

export default function DashboardCabins() {
  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <Heading variant="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </div>

      <DashboardCabinsTable />
    </>
  )
}
