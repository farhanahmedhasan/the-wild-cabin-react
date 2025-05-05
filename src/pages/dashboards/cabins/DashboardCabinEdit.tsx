import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

import { customToastError, customToastSuccess } from '@/components/toast'
import { cabinSchema, CabinSchemaType } from '@/schemas/cabinSchema'
import FormTextarea from '@/components/form/FormTextArea'
import { Label } from '@/components/form/partials/Label'
import UploadImage from '@/components/form/UploadImage'
import { zodResolver } from '@hookform/resolvers/zod'
import FormInput from '@/components/form/FormInput'
import { Button } from '@/components/ui/Button'

interface IProps {
  cabin: CabinSchemaType
}

export default function DashboardCabinEdit(props: IProps) {
  const [uploadKey, setUploadKey] = useState(0)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm<CabinSchemaType>({
    resolver: zodResolver(cabinSchema),
    defaultValues: props.cabin
  })

  const queryClient = useQueryClient()
  const { isPending: isCreating } = useMutation({
    // mutationFn: editCabin,
    onSuccess: () => {
      customToastSuccess('Cabin has been updated successfully.')
      reset()
      setUploadKey((prev) => prev + 1)
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      })
    },

    onError: (err) => customToastError(err.message)
  })

  function onSubmit(data: CabinSchemaType) {
    console.log(data)
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
            name="image"
            id="image"
            errorMessage={typeof errors.image?.message === 'string' ? errors.image.message : undefined}
            setValue={setValue}
            imageUrl={watch('image')}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          size="sm"
          variant="secondary"
          type="reset"
          onClick={() => {
            setValue('image', undefined)
          }}
        >
          Reset
        </Button>
        <Button size="sm" disabled={isCreating}>
          Update Cabin
        </Button>
      </div>
    </form>
  )
}
