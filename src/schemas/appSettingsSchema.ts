import { z } from 'zod'

export const appSettingsSchema = z
  .object({
    breakfast_price: z.coerce.number().min(1, 'Minimum breakfase price can not be less than 1 euro'),
    min_booking_days: z.coerce.number().min(1, 'Minimum booking days can not be less than 1 night'),
    max_booking_days: z.coerce.number().max(60, 'Maximum booking days can not be grater than 60 night'),
    max_guests_per_booking: z.coerce
      .number()
      .min(1, 'There must be at least 1 guest')
      .max(12, 'Maximum booking guests can not exceed 12 people including children')
  })
  .refine((data) => data.max_booking_days > data.min_booking_days, {
    message: 'Maximum booking days must be greater than minimum booking days',
    path: ['max_booking_days']
  })

export type AppSettingsSchemaType = z.infer<typeof appSettingsSchema>
