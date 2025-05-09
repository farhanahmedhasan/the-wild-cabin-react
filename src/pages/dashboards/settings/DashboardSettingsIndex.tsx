import { useQuery } from '@tanstack/react-query'

import { Label } from '@/components/form/partials/Label'
import { getSettings } from '@/services/apiSettings'
import FormInput from '@/components/form/FormInput'
import { Button } from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
import Spinner from '@/components/ui/Spinner'

export default function DashboardSettings() {
  const { data: settings, isPending, isError } = useQuery({ queryKey: ['settings'], queryFn: getSettings })

  if (isPending) return <Spinner />
  if (isError) return <p>We couldn't load the settings.Please try again later.</p>

  return (
    <>
      <Heading variant="h1" className="mb-12">
        Site Settings
      </Heading>

      <form className="font-poppins space-y-6">
        <div className="flex items-center gap-4">
          <Label className="w-28 md:text-base md:min-w-60">Breakfast Price</Label>
          <FormInput containerClassName="flex-1" defaultValue={settings.breakfast_price} />
        </div>

        <div className="flex items-center gap-4">
          <Label className="w-28 md:text-base md:min-w-60">Minimum Booking Days</Label>
          <FormInput containerClassName="flex-1" defaultValue={settings.min_booking_days} />
        </div>

        <div className="flex items-center gap-4">
          <Label className="w-28 md:text-base md:min-w-60">Max Booking Days</Label>
          <FormInput containerClassName="flex-1" defaultValue={settings.max_booking_days} />
        </div>

        <div className="flex items-center gap-4">
          <Label className="w-28 md:text-base md:min-w-60">Max Guests Per Booking</Label>
          <FormInput containerClassName="flex-1" defaultValue={settings.max_guests_per_booking} />
        </div>

        <Button size="sm" type="submit" className="float-left md:float-right">
          Save settings
        </Button>
      </form>
    </>
  )
}
