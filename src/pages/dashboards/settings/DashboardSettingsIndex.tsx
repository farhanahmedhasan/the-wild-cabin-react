import Heading from '@/components/ui/Heading'

import DashboardSettingsIndexTable from '@/pages/dashboards/settings/partials/DashboardSettingsIndexTable'

export default function DashboardSettings() {
  return (
    <>
      <Heading variant="h1" className="mb-4">
        Site Settings
      </Heading>

      <DashboardSettingsIndexTable />
    </>
  )
}
