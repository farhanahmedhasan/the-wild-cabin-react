import DasboardSettingsForm from '@/pages/dashboards/settings/partials/DasboardSettingsForm'
import Heading from '@/components/ui/Heading'

export default function DashboardSettings() {
  return (
    <>
      <Heading variant="h1" className="mb-12">
        Site Settings
      </Heading>

      <DasboardSettingsForm />
    </>
  )
}
