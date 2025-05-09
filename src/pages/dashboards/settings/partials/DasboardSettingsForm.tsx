import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

import useUpdateAppSettings from '@/pages/dashboards/settings/hooks/useUpdateAppSettings'
import { appSettingsSchema, AppSettingsSchemaType } from '@/schemas/appSettingsSchema'
import useGetAppSettings from '@/pages/dashboards/settings/hooks/useGetAppSettings'
import { Label } from '@/components/form/partials/Label'
import FormInput from '@/components/form/FormInput'
import { Button } from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'

export default function DasboardSettingsForm() {
  const { settings, isLoading, isError, isSuccess } = useGetAppSettings()
  const { isUpdating, updateMutateAppSettings } = useUpdateAppSettings()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AppSettingsSchemaType>({
    resolver: zodResolver(appSettingsSchema),
    defaultValues: settings
  })

  useEffect(() => {
    if (isSuccess) reset(settings)
  }, [isSuccess, settings, reset])

  if (isLoading) return <Spinner containerClassName="relative -left-10 top-20" />
  if (isError) return <p>We couldn't load the settings.Please try again later.</p>

  function onUpdate(data: AppSettingsSchemaType) {
    updateMutateAppSettings(data)
  }

  return (
    <form className="font-poppins space-y-6" onSubmit={handleSubmit(onUpdate)}>
      <div className="flex items-center gap-4">
        <Label className="w-28 md:text-base md:min-w-60">Breakfast Price</Label>
        <FormInput
          containerClassName="flex-1"
          {...register('breakfast_price')}
          errorMessage={errors.breakfast_price?.message}
        />
      </div>

      <div className="flex items-center gap-4">
        <Label className="w-28 md:text-base md:min-w-60">Minimum Booking Days</Label>
        <FormInput
          type="number"
          containerClassName="flex-1"
          {...register('min_booking_days')}
          errorMessage={errors.min_booking_days?.message}
        />
      </div>

      <div className="flex items-center gap-4">
        <Label className="w-28 md:text-base md:min-w-60">Max Booking Days</Label>
        <FormInput
          type="number"
          containerClassName="flex-1"
          {...register('max_booking_days')}
          errorMessage={errors.max_booking_days?.message}
        />
      </div>

      <div className="flex items-center gap-4">
        <Label className="w-28 md:text-base md:min-w-60">Max Guests Per Booking</Label>
        <FormInput
          type="number"
          containerClassName="flex-1"
          {...register('max_guests_per_booking')}
          errorMessage={errors.max_guests_per_booking?.message}
        />
      </div>

      <Button size="sm" className="float-left md:float-right" disabled={isUpdating}>
        Save settings
      </Button>
    </form>
  )
}
