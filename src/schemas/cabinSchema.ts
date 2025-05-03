import { z } from 'zod'

export const cabinSchema = z
  .object({
    name: z.string().min(1, 'Cabin name is required.'),
    max_capacity: z.coerce.number().min(1, 'Maximun guest number is required.'),

    regular_price: z.coerce
      .number({
        invalid_type_error: 'Regular price must be a number.'
      })
      .min(10, `Price can't be less than 10 euro.`),

    discount: z.coerce
      .number({
        invalid_type_error: 'Discount must be a number.'
      })
      .min(0, `Discount can't be negative.`),

    // Optional fields
    description: z.string().nullable(),
    image_url: z.union([z.string(), z.instanceof(File), z.null(), z.object({})]).optional()
  })
  .refine((data) => data.discount < data.regular_price, {
    message: `Discount can't be more or equal to regular price`,
    path: ['discount']
  })

export type CabinSchemaType = z.infer<typeof cabinSchema>
