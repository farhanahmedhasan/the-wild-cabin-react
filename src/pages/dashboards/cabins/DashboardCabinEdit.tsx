import { useForm } from 'react-hook-form'
import { useState } from 'react'

import useCabinUpdate from '@/pages/dashboards/cabins/hooks/useUpdateCabin'
import { cabinSchema, CabinSchemaType } from '@/schemas/cabinSchema'
import FormTextarea from '@/components/form/FormTextArea'
import { Label } from '@/components/form/partials/Label'
import UploadImage from '@/components/form/UploadImage'
import { zodResolver } from '@hookform/resolvers/zod'
import FormInput from '@/components/form/FormInput'
import { Button } from '@/components/ui/Button'

interface IProps {
  cabin: CabinSchemaType
  onCloseDialog: () => void
}

// TODO: make sure user can't update(send api call) if no data or image changes. do shallow comparison

export default function DashboardCabinEdit(props: IProps) {
  const [imageUrl, setImageUrl] = useState<string>(props.cabin.image)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CabinSchemaType>({
    resolver: zodResolver(cabinSchema),
    defaultValues: props.cabin
  })

  const { isUpdating, updateCabinMutate } = useCabinUpdate()

  function onSubmit(data: CabinSchemaType) {
    const { image, ...formattedData } = data

    let newImage = image
    if (typeof image !== 'string') {
      newImage = data.image?.[0] ?? null
    }

    updateCabinMutate({ ...formattedData, image: newImage }, { onSuccess: () => props.onCloseDialog() })
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
            name="image"
            id="image"
            errorMessage={typeof errors.image?.message === 'string' ? errors.image.message : undefined}
            setValue={setValue}
            imageUrl={imageUrl}
            onRemoveImage={() => setImageUrl('')}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button size="sm" variant="secondary" type="reset">
          Reset
        </Button>
        <Button size="sm" disabled={isUpdating}>
          Update Cabin
        </Button>
      </div>
    </form>
  )
}
