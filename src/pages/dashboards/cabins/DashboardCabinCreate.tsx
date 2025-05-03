import { useMutation, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

import { customToastError, customToastSuccess } from '@/components/toast'
import { cabinSchema, CabinSchemaType } from '@/schemas/cabinSchema'
import FormTextarea from '@/components/form/FormTextArea'
import { Label } from '@/components/form/partials/Label'
import UploadImage from '@/components/form/UploadImage'
import FormInput from '@/components/form/FormInput'
import { createCabin } from '@/services/apiCabins'
import { Button } from '@/components/ui/Button'

export default function DashboardCabinCreate() {
  const [uploadKey, setUploadKey] = useState(0)
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<CabinSchemaType>({
    resolver: zodResolver(cabinSchema)
  })

  const queryClient = useQueryClient()
  const { isPending: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      customToastSuccess('Cabin has been created successfully.')
      reset()
      setUploadKey((prev) => prev + 1)
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      })
    },

    onError: (err) => customToastError(err.message)
  })

  function onSubmit(data: CabinSchemaType) {
    const image = data.image?.[0]
    mutate({ ...data, image })
  }

  return (
    <form className="font-poppins space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        <FormInput label="Cabin Name" {...register('name')} errorMessage={errors.name?.message} required />
        <FormInput
          label="Maximum Capacity"
          type="number"
          {...register('max_capacity')}
          errorMessage={errors.max_capacity?.message}
          required
        />
        <FormInput
          label="Regular Price"
          type="text"
          {...register('regular_price')}
          required
          errorMessage={errors.regular_price?.message}
        />
        <FormInput
          label="Discount"
          type="text"
          defaultValue={0}
          {...register('discount')}
          errorMessage={errors.discount?.message}
        />
        <FormTextarea containerClassName="col-span-2" label="Description For Website" {...register('description')} />

        <div className="col-span-2">
          <Label className="pb-1.5">Cabin Image</Label>
          <UploadImage
            key={uploadKey}
            name="image_url"
            id="image_url"
            errorMessage={typeof errors.image?.message === 'string' ? errors.image.message : undefined}
            setValue={setValue}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button size="sm" variant="secondary" type="reset">
          Reset
        </Button>
        <Button size="sm" disabled={isCreating}>
          Add New Cabin
        </Button>
      </div>
    </form>
  )
}
