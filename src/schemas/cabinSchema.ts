import { z } from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

export const cabinSchema = z
  .object({
    id: z.number().optional(),
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
    image: z
      .union([
        z.string(),
        z
          .any()
          .refine((file) => {
            if (!file || file.length === 0) return true
            return file?.[0]?.size <= MAX_FILE_SIZE
          }, `Max file size is ${MAX_FILE_SIZE / 1024 / 1024}MB`)
          .refine((file) => {
            if (!file || file.length === 0) return true
            return ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type)
          }, 'Only .jpg, .jpeg, and .png formats are supported.'),
        z.undefined()
      ])
      .optional()
  })
  .refine((data) => data.discount < data.regular_price, {
    message: `Discount can't be more or equal to regular price`,
    path: ['discount']
  })

export type CabinSchemaType = z.infer<typeof cabinSchema>
