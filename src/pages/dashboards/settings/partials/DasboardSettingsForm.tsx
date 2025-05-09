import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

import useUpdateAppSetting from '@/pages/dashboards/settings/hooks/useUpdateAppSetting'
import { appSettingsSchema, AppSettingsSchemaType } from '@/schemas/appSettingsSchema'
import useGetAppSetting from '@/pages/dashboards/settings/hooks/useGetAppSetting'
import { Label } from '@/components/form/partials/Label'
import { customToastError } from '@/components/toast'
import FormInput from '@/components/form/FormInput'
import { Button } from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'

export default function DasboardSettingsForm() {
  const { settings, isLoading, isError, isSuccess } = useGetAppSetting()
  const { isUpdating, updateMutateAppSettings } = useUpdateAppSetting()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
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
    if (!isDirty) {
      customToastError('Change setting before trying updating them.')
      return
    }
    updateMutateAppSettings(data)
  }

  return (
    <form className="font-poppins space-y-6" onSubmit={handleSubmit(onUpdate)}>
      <div className="flex items-center gap-4">
        <Label htmlFor="breakfast_price" className="w-28 md:text-base md:min-w-60">
          Breakfast Price
        </Label>
        <FormInput
          containerClassName="flex-1"
          {...register('breakfast_price')}
          errorMessage={errors.breakfast_price?.message}
        />
      </div>

      <div className="flex items-center gap-4">
        <Label htmlFor="min_booking_days" className="w-28 md:text-base md:min-w-60">
          Minimum Booking Days
        </Label>
        <FormInput
          type="number"
          containerClassName="flex-1"
          {...register('min_booking_days')}
          errorMessage={errors.min_booking_days?.message}
        />
      </div>

      <div className="flex items-center gap-4">
        <Label htmlFor="max_booking_days" className="w-28 md:text-base md:min-w-60">
          Max Booking Days
        </Label>
        <FormInput
          type="number"
          containerClassName="flex-1"
          {...register('max_booking_days')}
          errorMessage={errors.max_booking_days?.message}
        />
      </div>

      <div className="flex items-center gap-4">
        <Label htmlFor="max_guests_per_booking" className="w-28 md:text-base md:min-w-60">
          Max Guests Per Booking
        </Label>
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
